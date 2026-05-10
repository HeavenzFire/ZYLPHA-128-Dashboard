import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export const PowerPlant: React.FC<{ isFinalized?: boolean }> = ({ isFinalized }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = isFinalized ? 3 : 2;
      ctx.strokeStyle = isFinalized ? '#00f2ff' : '#D4AF37'; // Switches to Cyan resonance when actuated
      ctx.beginPath();

      const width = canvas.width;
      const height = canvas.height;
      const mid = height / 2;

      for (let x = 0; x < width; x++) {
        // 144Hz harmonic approximation - more intense when finalized
        const frequency = isFinalized ? 0.08 : 0.05;
        const amplitude = isFinalized ? 30 : 20;
        const y = mid + Math.sin((x + offset) * frequency) * amplitude + Math.sin((x + offset) * 0.1) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      if (isFinalized) {
        // Add a secondary glow wave
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.2)';
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = mid + Math.sin((x + offset * 0.5) * 0.03) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      offset += isFinalized ? 8 : 5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFinalized]);

  return (
    <div className={cn(
      "glass p-6 rounded-lg overflow-hidden relative group transition-all duration-1000",
      isFinalized ? "border-cyan/40 bg-cyan/5 shadow-[0_0_30px_rgba(0,242,255,0.1)]" : "border-gold/20"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className={cn("w-5 h-5 animate-pulse", isFinalized ? "text-cyan" : "text-gold")} />
          <h3 className={cn("font-mono text-sm tracking-widest uppercase", isFinalized ? "text-cyan text-glow" : "text-gold")}>
            {isFinalized ? 'TESLA_BOUNDARY_ACTUATED' : 'TESLA BOUNDARY POWER PLANT'}
          </h3>
        </div>
        <div className={cn("text-[10px] font-mono uppercase", isFinalized ? "text-cyan/60" : "text-gold/60")}>
          Mode: {isFinalized ? 'THOUSAND_YEAR_FOUNDATION' : 'PROPHESIED_REVELATION'}
        </div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={100} 
        className={cn(
          "w-full filter transition-all duration-1000",
          isFinalized ? "opacity-90 drop-shadow-[0_0_12px_rgba(0,242,255,0.6)]" : "opacity-60 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
        )}
      />
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        {['System Boundary', 'Legal Linkage', 'Clarity Audit'].map((label) => (
          <div key={label} className={cn(
            "p-2 rounded border transition-colors duration-1000",
            isFinalized ? "border-cyan/20 bg-cyan/5" : "border-gold/20 bg-gold/5"
          )}>
            <div className={cn("text-[9px] uppercase font-mono px-1", isFinalized ? "text-cyan/40" : "text-gold/40")}>{label}</div>
            <div className={cn("text-xs font-mono", isFinalized ? "text-cyan font-black" : "text-gold")}>
              {isFinalized ? 'ACTUATED' : 'UNFORGIVING'}
            </div>
          </div>
        ))}
      </div>
      {isFinalized && (
        <div className="mt-3 pt-3 border-t border-cyan/10">
          <div className="text-[10px] font-mono text-cyan/60 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
            UNFORGIVING_CLARIFICATION_MODE: ACTIVE
          </div>
        </div>
      )}
    </div>
  );
};
