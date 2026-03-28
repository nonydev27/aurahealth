import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'

const PRIMARY = '#469264'
const ACCENT = '#214A44'

function createHeartShape() {
  const s = new THREE.Shape()
  const x = 0
  const y = 0
  s.moveTo(x + 0.25, y + 0.25)
  s.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y)
  s.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35)
  s.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95)
  s.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35)
  s.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y + 0.25)
  s.bezierCurveTo(x + 0.35, y + 0.25, x + 0.25, y + 0.25, x + 0.25, y + 0.25)
  return s
}

function HeartMesh() {
  const mesh = useRef(null)
  const geometry = useMemo(() => {
    const shape = createHeartShape()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.055,
      bevelSize: 0.038,
      bevelSegments: 4,
      curveSegments: 28,
    })
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!mesh.current) return
    mesh.current.rotation.y = Math.sin(t * 0.35) * 0.28
    mesh.current.rotation.x = Math.sin(t * 0.28) * 0.12
    const b = 1 + Math.sin(t * 1.9) * 0.035
    mesh.current.scale.setScalar(2.15 * b)
  })

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={PRIMARY}
          emissive={ACCENT}
          emissiveIntensity={0.22}
          metalness={0.35}
          roughness={0.28}
          clearcoat={0.65}
          clearcoatRoughness={0.25}
          thickness={0.4}
          attenuationColor={PRIMARY}
          attenuationDistance={0.6}
        />
      </mesh>
    </Float>
  )
}

function BackHeart() {
  const ref = useRef(null)
  const geometry = useMemo(() => {
    const shape = createHeartShape()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 20,
    })
    geo.center()
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!ref.current) return
    ref.current.rotation.z = t * 0.08
    ref.current.rotation.y = -0.55 + Math.sin(t * 0.2) * 0.08
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[0.35, -0.15, -1.1]} scale={1.85}>
      <meshStandardMaterial
        color={ACCENT}
        metalness={0.55}
        roughness={0.45}
        transparent
        opacity={0.22}
      />
    </mesh>
  )
}

export function Hero3D({ className = '' }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0.1, 5.2], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 8, 5]}
          intensity={1.15}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-4, 2, 3]} intensity={0.85} color={PRIMARY} />
        <spotLight
          position={[0, 5, 2]}
          angle={0.4}
          penumbra={0.8}
          intensity={0.9}
          color="#e8fff4"
          castShadow={false}
        />
        <Environment preset="city" environmentIntensity={0.45} />
        <BackHeart />
        <HeartMesh />
      </Canvas>
    </div>
  )
}
