import { Gem } from 'lucide-react';

interface DiamondShapeCardProps {
  shape: string;
}

export default function DiamondShapeCard({ shape }: DiamondShapeCardProps) {
  return (
    <div className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-rudakiya-goldLight rounded-full mb-4 group-hover:bg-rudakiya-gold transition-colors">
          <Gem className="w-8 h-8 text-rudakiya-gold" />
        </div>
        <h3 className="text-lg font-semibold text-rudakiya-dark text-center">{shape}</h3>
      </div>
    </div>
  );
}
