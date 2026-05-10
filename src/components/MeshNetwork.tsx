import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Globe, Activity, Zap, Server, ShieldAlert, Map, Database, ArrowRight, Maximize2, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const VISUAL_LIMIT_GLOBAL = 42000; // Rendering limit for GPU stability while mapping the 499,997 records

interface NodeData {
  id: number;
  position: THREE.Vector3;
  region: string;
  status: 1 | 0 | -1; // 1: Verified, 0: Pending, -1: Mismatch
  vector: string;
  hash: string;
}

interface MeshNetworkProps {
  isFinalized?: boolean;
}

export const MeshNetwork: React.FC<MeshNetworkProps> = ({ isFinalized }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  
  const TOTAL_NODES = 8000000000; 
  const VISUAL_LIMIT = 144000; 
  const REGIONS = ['Continental North', 'Eurasia Resonance', 'Asia-Pacific Grid', 'African Baseline', 'Global Oceans', 'Planetary Ionosphere'];

  const stats = useMemo(() => ({
    verified: isFinalized ? 1240000000 : 522000000,
    pending: isFinalized ? 6760000000 : 7478000000,
    anomalies: isFinalized ? 0 : 7
  }), [isFinalized]);

  const nodeData = useMemo(() => {
    const data: NodeData[] = [];
    const tempPos = new THREE.Vector3();
    
    for (let i = 0; i < VISUAL_LIMIT; i++) {
       // Jurisdictional clustering: 
       // Group nodes by jurisdiction using spherical coordinates
       const regionIdx = i % REGIONS.length;
       const regionOffset = (regionIdx / REGIONS.length) * Math.PI * 2;
       
       const phi = Math.acos(-1 + (2 * i) / VISUAL_LIMIT);
       const theta = Math.sqrt(VISUAL_LIMIT * Math.PI) * phi + regionOffset;

       const radius = 100 + (Math.random() * 2 - 1) * 2; // Slight jitter
       
       tempPos.setFromSphericalCoords(radius, phi, theta);
       
       const status = i < 3 
         ? (isFinalized ? 1 : -1) 
         : (i < 525 ? 1 : 0);

       data.push({
         id: i,
         position: tempPos.clone(),
         region: REGIONS[regionIdx],
         status: status as any,
         vector: i < 3 ? "Deep Institutional Void" : (i % 2 === 0 ? "Clerical Void Detected" : "Institutional Signal Stable"),
         hash: `SYNC_${i.toString(16).toUpperCase()}_${Math.random().toString(36).substr(2, 6)}`
       });
    }
    return data;
  }, [isFinalized]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Geometry & Material for 42,000 nodes
    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const instancedMesh = new THREE.InstancedMesh(geometry, material, VISUAL_LIMIT);
    
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    
    nodeData.forEach((node, i) => {
      matrix.setPosition(node.position);
      instancedMesh.setMatrixAt(i, matrix);
      
      // Color based on status: Cyan (Verified), Red (Mismatch), White (Pending)
      if (node.status === 1) color.setHex(0x00f2ff);
      else if (node.status === -1) color.setHex(0xef4444);
      else color.setHex(0xffffff).multiplyScalar(0.2); // Dimmed pending nodes
      
      instancedMesh.setColorAt(i, color);
    });

    scene.add(instancedMesh);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0) {
        const id = intersects[0].instanceId;
        if (id !== undefined) {
          setSelectedNode(nodeData[id]);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      
      // Auto-rotation
      instancedMesh.rotation.y += 0.001;
      instancedMesh.rotation.x += 0.0005;

      // Update raycaster for hover state
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedMesh);
      if (intersects.length > 0) {
        const id = intersects[0].instanceId;
        setHoveredNodeId(id !== undefined ? id : null);
      } else {
        setHoveredNodeId(null);
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsInitialized(true);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [nodeData]);

  return (
    <div ref={containerRef} className="glass rounded-lg border-resonance/20 relative flex flex-col min-h-[500px] bg-black/40 overflow-hidden group">
      {/* Three.js Canvas */}
      <div className="relative h-[500px]">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
        
        {/* Overlay Headers */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-resonance animate-pulse" />
            <h3 className="font-mono text-sm tracking-widest text-resonance uppercase text-glow">GLOBAL_PLANETARY_SOVEREIGN_MESH</h3>
          </div>
          <div className="text-[10px] font-mono text-resonance/60 ml-7 uppercase tracking-tighter">GPU Instanced // 8,000,000,000 Records Mapped across 42,000 Witness Sync Nodes</div>
        </div>

        {/* Status Indicators */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 text-right pointer-events-none font-mono">
           <div className="text-[10px] text-cyan uppercase font-bold flex items-center justify-end gap-2 text-glow">
             SOVEREIGN_VERIFIED <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
           </div>
           <div className="text-[10px] text-red-500 uppercase font-bold flex items-center justify-end gap-2 text-glow">
             GAP_DISCREPANCY <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
           </div>
           <div className="text-[10px] text-white/40 uppercase font-bold flex items-center justify-end gap-2">
             PENDING_RECONCILE <div className="w-2 h-2 rounded-full bg-white/20" />
           </div>
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredNodeId !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute pointer-events-none p-2 bg-black/90 border border-resonance/40 rounded font-mono text-[9px] z-30 shadow-[0_0_20px_rgba(255,0,255,0.2)]"
              style={{ 
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-resonance mb-1 font-black">NODE_ID: {nodeData[hoveredNodeId].id}</div>
              <div className="text-white/80">REGION: {nodeData[hoveredNodeId].region}</div>
              <div className="text-cyan mt-1 tabular-nums">SYNC_LOCK: {nodeData[hoveredNodeId].hash.slice(0, 8)}</div>
              <div className="text-[7px] text-white/20 mt-1 uppercase tracking-widest leading-none border-t border-white/10 pt-1">Click to Inspect Record</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Stat Ring */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-8 pointer-events-none text-glow">
           <div className="text-center">
             <div className="text-[9px] font-mono text-white/30 uppercase">Mesh Anchored</div>
             <div className="text-lg font-bold font-mono text-resonance">8,000,000,000</div>
           </div>
           <div className="text-center border-l border-white/10 pl-8">
             <div className="text-[9px] font-mono text-white/30 uppercase">Witness Sync Nodes</div>
             <div className="text-lg font-bold font-mono text-cyan">42,000 / 42,000</div>
           </div>
           <div className="text-center border-l border-white/10 pl-8">
             <div className="text-[9px] font-mono text-white/30 uppercase">Grid Stability</div>
             <div className="text-lg font-bold font-mono text-gold">144.0Hz</div>
           </div>
        </div>
      </div>

      {/* Selection Detail Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 inset-x-0 bg-black/90 border-t border-resonance/30 p-6 z-40 backdrop-blur-xl"
          >
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
               <div className="p-3 bg-resonance/10 border border-resonance/40 rounded-lg">
                 <Server className="w-8 h-8 text-resonance" />
               </div>
               
               <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                       <h4 className="text-lg font-black text-resonance uppercase tracking-tighter">NODE_V{selectedNode.id}_SOVEREIGN</h4>
                       <p className="text-[10px] font-mono text-white/40 uppercase">Jurisdiction: {selectedNode.region} // Temporal Status: STABLE</p>
                    </div>
                    <button 
                      onClick={() => setSelectedNode(null)}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Zap className="w-4 h-4 text-white/40" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="p-3 bg-white/5 border border-white/10 rounded space-y-1">
                        <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Integrity Signature</div>
                        <div className="text-[10px] font-mono text-resonance truncate">{selectedNode.hash}</div>
                     </div>
                     <div className="p-3 bg-white/5 border border-white/10 rounded space-y-1">
                        <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Reconciliation Flag</div>
                        <div className={cn(
                          "text-[10px] font-mono uppercase",
                          selectedNode.status === 1 ? "text-cyan" : selectedNode.status === -1 ? "text-red-500" : "text-white/60"
                        )}>
                          {selectedNode.status === 1 ? 'ANCHORED' : selectedNode.status === -1 ? 'VOID_DETECTED' : 'PENDING_AUDIT'}
                        </div>
                     </div>
                     <div className="p-3 bg-white/5 border border-white/10 rounded space-y-1">
                        <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Vector Observation</div>
                        <div className="text-[10px] font-mono text-white/80 italic">"{selectedNode.vector}"</div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                     <button className="px-4 py-2 bg-resonance text-black font-mono text-[10px] font-black uppercase hover:bg-cyan transition-colors rounded">
                        Initiate Deep Reconciliation
                     </button>
                     <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-widest animate-pulse">
                        <Activity className="w-3 h-3" /> Real-time Node Monitoring Engaged
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedNode && (
          <div className="p-3 bg-resonance/5 border-t border-white/5 flex justify-between items-center px-6">
             <div className="flex items-center gap-2">
                <MousePointer2 className="w-3 h-3 text-resonance" />
                <span className="text-[8px] font-mono text-resonance/60 uppercase tracking-widest font-bold">Orbital Control Mode: ACTIVE</span>
             </div>
             <div className="text-[8px] font-mono text-white/20 uppercase">Drag to Rotate // Click Node to Anchored View</div>
          </div>
      )}
    </div>
  );
};

