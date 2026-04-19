'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { SiteSettings } from '@/lib/types';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';

export default function AdminHero() {
  const [data, setData] = useState<SiteSettings>({
    id: 'hero',
    headline: '',
    subheadline: '',
    videoUrl: '',
    posterUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploadingContent, setUploadingContent] = useState<'video' | 'poster' | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const d = await getDoc(doc(db, 'siteSettings', 'hero'));
        if (d.exists()) {
          setData({ id: d.id, ...d.data() } as SiteSettings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFileUpload = (type: 'video' | 'poster', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContent(type);
    setProgress(0);

    const ext = file.name.split('.').pop() || (type === 'video' ? 'mp4' : 'webp');
    const storageRef = ref(storage, `hero/hero-${type}-${Date.now()}.${ext}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
        console.error(error);
        alert("Upload failed.");
        setUploadingContent(null);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const updateField = type === 'video' ? 'videoUrl' : 'posterUrl';
        
        await setDoc(doc(db, 'siteSettings', 'hero'), { [updateField]: downloadURL }, { merge: true });
        setData({ ...data, [updateField]: downloadURL });
        setUploadingContent(null);
      }
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Hero Settings</h2>

      <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-lg border border-blue-100 mb-8 space-y-2">
        <p className="font-semibold">Media Guidelines:</p>
        <ul className="list-disc list-inside">
          <li><b>Hero video:</b> Compress to H.264 MP4, under 15MB.</li>
          <li><b>Hero poster:</b> First frame visible before video loads. Max 1920×800px, under 200KB (WebP).</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* VIDEO */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">Hero Video</h3>
          <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden min-h-[200px]">
             {data.videoUrl && uploadingContent !== 'video' ? (
                <video src={data.videoUrl} className="w-full h-full object-cover" autoPlay muted loop />
             ) : (
                <div className="text-gray-400 text-sm text-center font-medium">No video uploaded</div>
             )}

             {uploadingContent === 'video' && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 z-20">
                  <span className="font-medium mb-2">Uploading {Math.round(progress)}%</span>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-black h-2 rounded-full" style={{width: `${progress}%`}}></div></div>
                </div>
             )}

             <div className={`absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity z-10 ${uploadingContent === 'video' ? 'hidden' : ''}`}>
                <label className="cursor-pointer bg-white font-medium text-black px-4 py-2 rounded-lg items-center flex text-sm">
                   <UploadCloud className="w-4 h-4 mr-2" /> Upload .mp4
                   <input type="file" accept="video/mp4" className="hidden" onChange={e => handleFileUpload('video', e)} />
                </label>
             </div>
          </div>
        </div>

        {/* POSTER */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">Hero Poster (Fallback)</h3>
          <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden min-h-[200px]">
             {data.posterUrl && uploadingContent !== 'poster' ? (
                <Image src={data.posterUrl} alt="Hero Poster" fill unoptimized className="object-cover" />
             ) : (
                <div className="text-gray-400 text-sm text-center font-medium">No poster uploaded</div>
             )}

             {uploadingContent === 'poster' && (
                <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 z-20">
                  <span className="font-medium mb-2">Uploading {Math.round(progress)}%</span>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-black h-2 rounded-full" style={{width: `${progress}%`}}></div></div>
                </div>
             )}

             <div className={`absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity z-10 ${uploadingContent === 'poster' ? 'hidden' : ''}`}>
                <label className="cursor-pointer bg-white font-medium text-black px-4 py-2 rounded-lg items-center flex text-sm">
                   <UploadCloud className="w-4 h-4 mr-2" /> Upload Image
                   <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload('poster', e)} />
                </label>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
