import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Box,
  OrbitControls, 
  PerspectiveCamera,
  Text,
  Line,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Fingerprint, Cpu, Smartphone, Globe, Lock, Users, Flame, Database, Zap, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface NodeProps {
  position: [number, number, number];
  color: string;
  label: string;
  type: string;
  onSelect: (id: string) => void;
  status: string;
}

interface TopologyProps {
  onNodeSelect: (id: string | null) => void;
  currentStates: Record<string, { status: string, level: number }>;
}

const SecurityNode: React.FC<NodeProps> = ({ position, color, label, type, onSelect, status }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle floating and rotation
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.y = time * 0.3;
      
      // Heartbeat pulse when idle, static scale when hovered
      const idlePulse = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.setScalar(hovered ? 1.4 : idlePulse);
    }
    if (ringRef.current) {
      // Continuous rotation and visibility
      ringRef.current.rotation.z = time * 0.8;
      const ringPulse = 1.1 + Math.sin(time * 3) * 0.1;
      ringRef.current.scale.setScalar(hovered ? 1.6 : ringPulse);
      // Ring is now always visible but more subtle when not hovered
      ringRef.current.visible = true;
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(label)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? '#fff' : color} 
          emissive={color} 
          emissiveIntensity={hovered ? 4 : 1.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Orbiting Ring - always visible and rotating */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.6, 64]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.6 : 0.2} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Interaction Glow */}
      {hovered && (
        <pointLight intensity={2} distance={3} color={color} />
      )}
      
      {/* Tooltip / Label */}
      <Html position={[0, 0.7, 0]} center style={{ pointerEvents: 'none' }}>
        <div className={cn(
          "flex flex-col items-center gap-2 transition-all duration-500",
          hovered ? "scale-100 opacity-100" : "scale-90 opacity-60"
        )}>
          {/* Main Label */}
          <div className="px-3 py-1 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                {label}
              </span>
            </div>
          </div>

          {/* Detailed Info (Visible on Hover) */}
          <div className={cn(
            "w-48 p-3 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 transform origin-top",
            hovered ? "translate-y-0 opacity-100 scale-100" : "-translate-y-2 opacity-0 scale-95"
          )}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">Node Status</span>
              <motion.span 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.2)]",
                  status === 'Secure' || status === 'Verified' || status === 'Active' || status === 'Online' || status === 'Encrypted' || status === 'Authorized' ? 'bg-emerald-500/10 text-emerald-400' : 
                  status === 'Shielded' || status === 'Blocking' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                )}
              >
                {status}
              </motion.span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[7.5px] font-mono">
                <span className="text-white/30">LATENCY</span>
                <span className="text-blue-400">{Math.floor(Math.random() * 20 + 2)}ms</span>
              </div>
              <div className="flex justify-between items-center text-[7.5px] font-mono">
                <span className="text-white/30">TRAFFIC</span>
                <span className="text-blue-400">{(Math.random() * 5 + 1).toFixed(2)} MB/S</span>
              </div>
              <div className="flex justify-between items-center text-[7.5px] font-mono">
                <span className="text-white/30">ENCRYPTION</span>
                <span className="text-emerald-400">AES-256</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-white/5">
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: hovered ? "85%" : "0%" }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                />
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const DataPacket: React.FC<{ start: [number, number, number], end: [number, number, number], color: string, delay: number }> = ({ start, end, color, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<(THREE.Mesh | null)[]>([]);
  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    const t = (time * 0.4) % 1;

    if (meshRef.current) {
      meshRef.current.position.lerpVectors(startVec, endVec, t);
      const s = Math.sin(t * Math.PI) * 0.4;
      meshRef.current.scale.setScalar(s);
      meshRef.current.visible = s > 0.1;
    }

    // Trail logic
    trailRefs.current.forEach((ref, i) => {
      if (ref) {
        const offset = (i + 1) * 0.05;
        const trailT = Math.max(0, t - offset);
        ref.position.lerpVectors(startVec, endVec, trailT);
        const s = Math.sin(trailT * Math.PI) * (0.3 - i * 0.05);
        ref.scale.setScalar(s);
        ref.visible = s > 0.05;
      }
    });
  });

  return (
    <group>
      {/* Main Packet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* Trail Pieces */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (trailRefs.current[i] = el)}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.4 - i * 0.1} />
        </mesh>
      ))}
    </group>
  );
};

const Connection: React.FC<{ nodePos: [number, number, number], color: string }> = ({ nodePos, color }) => {
  return (
    <group>
      {/* Core Connection Line */}
      <Line 
        points={[[0, 0, 0], nodePos]} 
        color={color} 
        lineWidth={2} 
        transparent 
        opacity={0.3} 
      />
      {/* Emissive Glow Line */}
      <Line 
        points={[[0, 0, 0], nodePos]} 
        color={color} 
        lineWidth={6} 
        transparent 
        opacity={0.06} 
      />
      {/* Outgoing Packets */}
      <DataPacket start={[0, 0, 0]} end={nodePos} color={color} delay={0} />
      <DataPacket start={[0, 0, 0]} end={nodePos} color={color} delay={1.2} />
      {/* Incoming Packets */}
      <DataPacket start={nodePos} end={[0, 0, 0]} color={color} delay={0.6} />
      <DataPacket start={nodePos} end={[0, 0, 0]} color={color} delay={1.8} />
    </group>
  );
};

export const SecurityTopology: React.FC<TopologyProps> = ({ onNodeSelect, currentStates }) => {
  const nodes = useMemo(() => [
    { id: 'identity', label: 'Authorized Identity', color: '#3B82F6', pos: [0, 0, 0] as [number, number, number], status: 'Verified' },
    { id: 'device-1', label: 'iPhone 15 Pro', color: '#10B981', pos: [-3, 2, 2] as [number, number, number], status: 'Secure' },
    { id: 'device-2', label: 'Mac Studio', color: '#10B981', pos: [3, -2, 1] as [number, number, number], status: 'Secure' },
    { id: 'risk-engine', label: 'Risk Engine', color: '#F59E0B', pos: [-2, -4, -2] as [number, number, number], status: 'Active' },
    { id: 'vault-alpha', label: 'Encrypted Vault', color: '#A855F7', pos: [4, 3, -2] as [number, number, number], status: 'Locked' },
    { id: 'external-api', label: 'Financial Bridge', color: '#EC4899', pos: [-4, 0, -4] as [number, number, number], status: 'Active' },
    { id: 'user-accounts', label: 'User Accounts', color: '#3B82F6', pos: [0, 4, 0] as [number, number, number], status: 'Active' },
    { id: 'firewall', label: 'Kernel Firewall', color: '#F43F5E', pos: [-5, -2, 0] as [number, number, number], status: 'Shielded' },
    { id: 'database', label: 'Financial Database', color: '#8B5CF6', pos: [5, -4, -3] as [number, number, number], status: 'Online' },
  ], []);

  const kernelRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (kernelRef.current) {
      kernelRef.current.rotation.y = time * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.5;
      coreRef.current.rotation.z = time * 0.3;
      coreRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#A855F7" />

      <group ref={kernelRef}>
        {/* Core Kernel */}
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial 
            color="#3B82F6" 
            distort={0.5} 
            speed={3} 
            emissive="#3B82F6" 
            emissiveIntensity={3}
            metalness={1}
            roughness={0}
          />
        </mesh>
        
        {/* Connection Lines & Nodes */}
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {/* Connection line & packets */}
            {i > 0 && <Connection nodePos={node.pos} color={node.color} />}
            <SecurityNode 
              position={node.pos} 
              color={node.color} 
              label={node.label} 
              type={node.id}
              status={currentStates[node.label]?.status || node.status}
              onSelect={onNodeSelect}
            />
          </React.Fragment>
        ))}
      </group>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={6} 
        maxDistance={18} 
        rotateSpeed={0.5}
      />
    </>
  );
};

export const Security3DContainer: React.FC<{
  nodeStates: Record<string, { status: string, level: number }>;
  onAction: (node: string, action: string) => void;
}> = ({ nodeStates, onAction }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeDetails: Record<string, any> = {
    'Authorized Identity': { icon: Fingerprint, details: 'Access Token: HMAC-SHA256 Valid.' },
    'iPhone 15 Pro': { icon: Smartphone, details: 'Biometric verified. Local key persistent.' },
    'Mac Studio': { icon: Cpu, details: 'Hardware enclave verified. No tampering detected.' },
    'Risk Engine': { icon: Shield, details: 'Continuously projecting 14,000 access permutations.' },
    'Encrypted Vault': { icon: Lock, details: 'AES-256 GCM isolation active.' },
    'Financial Bridge': { icon: Globe, details: 'TLS 1.3 Handshake active. Geo-Fence matches.' },
    'User Accounts': { icon: Users, details: 'Active session monitoring with behavior analytics.' },
    'Kernel Firewall': { icon: Flame, details: 'L7 inspection active. Dropping non-HMAC traffic.' },
    'Financial Database': { icon: Database, details: 'Transparent Data Encryption (TDE) active.' }
  };

  const selectedData = selectedNode ? { ...nodeDetails[selectedNode], ...nodeStates[selectedNode] } : null;

  return (
    <div className="w-full h-full relative group">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <SecurityTopology 
          onNodeSelect={setSelectedNode} 
          currentStates={nodeStates} 
        />
      </Canvas>

      {/* Info Overlay */}
      <AnimatePresence>
        {selectedNode && selectedData && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-8 right-8 w-64 bg-black/80 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 z-20 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <selectedData.icon className="w-6 h-6 text-blue-400" />
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-white/10 rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
            
            <h4 className="font-bold text-lg mb-1">{selectedNode}</h4>
            <div className="flex items-center gap-2 mb-4">
               <div className={cn(
                 "w-1.5 h-1.5 rounded-full animate-pulse",
                 selectedData.status === 'BLOCKED' ? 'bg-rose-500' : 'bg-emerald-500'
               )} />
               <span className={cn(
                 "text-[10px] font-mono uppercase tracking-widest",
                 selectedData.status === 'BLOCKED' ? 'text-rose-400' : 'text-emerald-400'
               )}>{selectedData.status}</span>
            </div>
            
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              {selectedData.details}
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-white/40 font-mono uppercase">
                  <span>Trust Level</span>
                  <span className="text-blue-400">{selectedData.level}/10</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedData.level * 10}%` }}
                    className={cn(
                      "h-full transition-all duration-500",
                      selectedData.level > 7 ? "bg-blue-500" : selectedData.level > 3 ? "bg-amber-500" : "bg-rose-500"
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                {selectedData.status === 'BLOCKED' ? (
                  <button 
                    onClick={() => onAction(selectedNode, 'UNBLOCK')}
                    className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Unblock & Re-Verify
                  </button>
                ) : (
                  <>
                    {/* Specialized Actions */}
                    {selectedNode.includes('Vault') ? (
                      <button 
                        onClick={() => onAction(selectedNode, 'ROTATE')}
                        className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-purple-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3 h-3" />
                        Re-Seal Vault
                      </button>
                    ) : selectedNode.includes('Identity') || selectedNode.includes('User') ? (
                      <button 
                        onClick={() => onAction(selectedNode, 'ROTATE')}
                        className="w-full py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Fingerprint className="w-3 h-3" />
                        Invalidate Sessions
                      </button>
                    ) : (
                      <button 
                        onClick={() => onAction(selectedNode, 'ROTATE')}
                        className="w-full py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Rotate Integrity Key
                      </button>
                    )}

                    <button 
                      onClick={() => onAction(selectedNode, 'BLOCK')}
                      className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-rose-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Shield className="w-3 h-3" />
                      Emergency Block
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedNode && (
        <div className="absolute top-8 left-8 p-4 glass rounded-2xl border-white/10 pointer-events-none">
           <h4 className="text-xs font-bold text-white/80 flex items-center gap-2">
             <Zap className="w-4 h-4 text-blue-400" />
             Interactive Kernel Topology
           </h4>
           <p className="text-[10px] text-white/40 mt-1 uppercase font-mono">Rotate to inspect architecture nodes</p>
        </div>
      )}
    </div>
  );
};

const X = ({ className, onClick }: any) => (
  <svg 
    onClick={onClick}
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
