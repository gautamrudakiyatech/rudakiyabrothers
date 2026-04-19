"use client";

import React, { useState, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { toast } from 'sonner';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

interface Props {
  pathTemplate: string;
  onUploadSuccess?: (url: string) => void;
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}

export default function AdminImageUploader({ 
  pathTemplate, 
  onUploadSuccess, 
  onFilesSelected,
  multiple = false, 
  accept = 'image/*', 
  label 
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<{ [id: string]: number }>({}); // id to progress %

  const handleUpload = async (file: File) => {
    // Validate type against the accept string
    const allowedTypes = accept.split(',').map(t => t.trim());
    const isAllowed = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', '/'));
      }
      return file.type === type;
    });
    if (!isAllowed) {
      toast.error(`File type "${file.type}" is not allowed here.`);
      return;
    }
    if (file.size > 60 * 1024 * 1024) { // 60MB limit
      toast.error('File size exceeds 60MB.');
      return;
    }

    const uploadId = Date.now() + Math.random().toString(36).substring(7);
    const fileExtension = file.name.split('.').pop();
    const finalPath = `${pathTemplate}-${uploadId}.${fileExtension}`;

    setUploads((prev) => ({ ...prev, [uploadId]: 0 }));

    const storageRef = ref(storage, finalPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploads((prev) => ({ ...prev, [uploadId]: progress }));
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
        setUploads((prev) => {
          const next = { ...prev };
          delete next[uploadId];
          return next;
        });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadSuccess(downloadURL);
        setUploads((prev) => {
          const next = { ...prev };
          delete next[uploadId];
          return next;
        });
      }
    );
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const selected = multiple ? files : [files[0]];
    
    if (onFilesSelected) {
      onFilesSelected(selected.filter(Boolean));
    } else {
      selected.forEach(f => {
        if (f) handleUpload(f);
      });
    }
  }, [multiple, onFilesSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const selected = multiple ? files : [files[0]];

    if (onFilesSelected) {
      onFilesSelected(selected.filter(Boolean));
      // Clear input so same file can be selected again if needed
      e.target.value = '';
    } else {
      selected.forEach(f => {
        if (f) handleUpload(f);
      });
    }
  };

  const activeUploads = Object.entries(uploads);

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-upload-${pathTemplate}`)?.click()}
      >
        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold text-black">Click to upload</span> or drag and drop<br />
          Images & videos, max 60MB
        </p>
        <input
          id={`file-upload-${pathTemplate}`}
          type="file"
          accept={accept}
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>

      {activeUploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {activeUploads.map(([id, progress]) => (
            <div key={id} className="flex items-center gap-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-black h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500 w-10 text-right">{progress}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
