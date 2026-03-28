import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'

const DEEP = '#214A44'
const MINT = '#469264'

function PulsingCore() {
  const mesh = useRef(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!mesh.current) return
    mesh.current.rotation.x = t * 0.12
    mesh.current.rotation.y = t * 0.2
  })
  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh ref={mesh} scale={1.55}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color={MINT}
          emissive={DEEP}
          emissiveIntensity={0.35}
          roughness={0.22}
          metalness={0.55}
          distort={0.42}
          speed={2.4}
        />
      </mesh>
    </Float>
  )
}

function OrbitRings() {
  const g1 = useRef(null)
  const g2 = useRef(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (g1.current) {
      g1.current.rotation.x = Math.PI / 2.35 + Math.sin(t * 0.4) * 0.06
      g1.current.rotation.z = t * 0.09
    }
    if (g2.current) {
      g2.current.rotation.x = Math.PI / 2.1 + Math.cos(t * 0.35) * 0.05
      g2.current.rotation.z = -t * 0.065
    }
  })
  return (
    <group>
      <mesh ref={g1}>
        <torusGeometry args={[2.35, 0.035, 12, 120]} />
        <meshStandardMaterial
          color={DEEP}
          emissive={MINT}
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={g2} scale={1.12}>
        <torusGeometry args={[2.85, 0.02, 10, 100]} />
        <meshStandardMaterial
          color={MINT}
          emissive={DEEP}
          emissiveIntensity={0.25}
          metalness={0.75}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  return (
    <Stars
      radius={80}
      depth={52}
      count={3200}
      factor={3.2}
      saturation={0}
      fade
      speed={0.32}
    />
  )
}

export function Hero3D({ className = '' }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.15, 5.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050f0d']} />
        <fog attach="fog" args={['#050f0d', 6, 22]} />
        <ambientLight intensity={0.35} />
        <spotLight
          position={[6, 8, 6]}
          angle={0.35}
          penumbra={0.85}
          intensity={2.2}
          color="#b8ffd8"
          castShadow={false}
        />
        <pointLight position={[-5, -2, 4]} intensity={1.1} color={MINT} />
        <pointLight position={[4, -4, 2]} intensity={0.85} color={DEEP} />
        <Particles />
        <PulsingCore />
        <OrbitRings />
      </Canvas>
    </div>
  )
}
