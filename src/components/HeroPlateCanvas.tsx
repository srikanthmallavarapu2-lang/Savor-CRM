import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export type HeroPlateDishId = 'pasta' | 'seabass' | 'dessert'

interface HeroPlateCanvasProps {
  activeDish: HeroPlateDishId
  isMobile: boolean
  reducedMotion: boolean
  onWebGLError: () => void
}

function createStonewareTexture(): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const grad = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size / 2)
  grad.addColorStop(0, '#FCF6EA')
  grad.addColorStop(0.68, '#F5E9D6')
  grad.addColorStop(0.92, '#EAD8BE')
  grad.addColorStop(1, '#DEC7A7')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = 'rgba(166, 141, 110, 0.08)'
  for (let r = 36; r < size / 2; r += 18) {
    ctx.lineWidth = r % 36 === 0 ? 1.5 : 0.8
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  let seed = 4219
  const nextRand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  for (let i = 0; i < 650; i++) {
    const x = nextRand() * size
    const y = nextRand() * size
    const radius = 0.5 + nextRand() * 1.4
    const alpha = 0.08 + nextRand() * 0.22
    ctx.fillStyle = nextRand() > 0.35 ? `rgba(128, 104, 78, ${alpha})` : `rgba(182, 112, 82, ${alpha})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function createCurvedBasilGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.24, 0.14, 0.27, 0.46, 0, 0.76)
  shape.bezierCurveTo(-0.27, 0.46, -0.24, 0.14, 0, 0)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.016,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 12,
  })
  geo.center()

  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const arch = -0.14 * (y * y) + 0.28 * (x * x)
    pos.setZ(i, z + arch)
  }
  geo.computeVertexNormals()
  return geo
}

function createCakeSliceGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.86, -0.22)
  shape.quadraticCurveTo(0.92, 0.04, 0.82, 0.32)
  shape.lineTo(0, 0)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
  })
  geo.rotateX(-Math.PI / 2)
  geo.center()
  return geo
}

function createPlateGeometry(segments: number): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0.01),
    new THREE.Vector2(0.75, 0.015),
    new THREE.Vector2(0.98, 0.045),
    new THREE.Vector2(1.18, 0.11),
    new THREE.Vector2(1.48, 0.24),
    new THREE.Vector2(1.6, 0.275),
    new THREE.Vector2(1.63, 0.24),
    new THREE.Vector2(1.57, 0.17),
    new THREE.Vector2(1.16, 0.02),
    new THREE.Vector2(0.82, -0.055),
    new THREE.Vector2(0.74, -0.07),
    new THREE.Vector2(0, -0.065),
  ]
  return new THREE.LatheGeometry(points, segments)
}

function createPastaStrands(isMobile: boolean): THREE.TubeGeometry[] {
  const strandConfigs = [
    { radius: 0.43, height: 0.04, turns: 1.45, phase: 0, tubeR: 0.036, tilt: 0.05 },
    { radius: 0.36, height: 0.095, turns: 1.55, phase: 1.1, tubeR: 0.035, tilt: -0.06 },
    { radius: 0.28, height: 0.15, turns: 1.5, phase: 2.3, tubeR: 0.034, tilt: 0.08 },
    { radius: 0.2, height: 0.205, turns: 1.35, phase: 3.6, tubeR: 0.032, tilt: -0.04 },
    { radius: 0.32, height: 0.125, turns: 1.2, phase: 4.9, tubeR: 0.031, tilt: 0.07 },
  ]

  const activeConfigs = isMobile ? strandConfigs.slice(0, 4) : strandConfigs
  const pathSamples = isMobile ? 34 : 52

  return activeConfigs.map((cfg) => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= pathSamples; i++) {
      const u = i / pathSamples
      const angle = cfg.phase + u * Math.PI * 2 * cfg.turns
      const radialWobble = Math.sin(u * Math.PI * 4 + cfg.phase) * 0.035
      const r = cfg.radius * (1 - u * 0.16) + radialWobble
      const y =
        cfg.height +
        Math.sin(u * Math.PI) * 0.055 +
        Math.cos(u * Math.PI * 5 + cfg.phase) * 0.015 +
        Math.sin(angle) * cfg.tilt
      pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r))
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    return new THREE.TubeGeometry(curve, isMobile ? 44 : 68, cfg.tubeR, isMobile ? 7 : 10, false)
  })
}

interface FloatingItem {
  position: [number, number, number]
  rotation: [number, number, number]
  kind: 'basil' | 'tomato' | 'olive' | 'salt'
  phase: number
  scale: number
  parallax: number
}

const FLOATING_ITEMS: FloatingItem[] = [
  { position: [-1.24, 0.72, -0.18], rotation: [0.35, 0.4, 0.52], kind: 'basil', phase: 0.2, scale: 0.46, parallax: 0.16 },
  { position: [1.26, 0.66, 0.12], rotation: [-0.25, 0.7, -0.35], kind: 'tomato', phase: 1.3, scale: 0.85, parallax: 0.2 },
  { position: [1.15, 0.08, 0.95], rotation: [0.55, -0.35, 0.22], kind: 'basil', phase: 2.4, scale: 0.42, parallax: 0.14 },
  { position: [-1.18, -0.42, 0.62], rotation: [0.22, 0.5, -0.55], kind: 'olive', phase: 3.2, scale: 0.88, parallax: 0.15 },
  { position: [0.36, 0.94, -0.45], rotation: [0.48, 0.2, 0.72], kind: 'basil', phase: 4.1, scale: 0.36, parallax: 0.18 },
  { position: [-0.62, 0.88, 0.36], rotation: [-0.18, 0.4, 0.14], kind: 'tomato', phase: 4.9, scale: 0.68, parallax: 0.17 },
  { position: [0.78, -0.56, 0.42], rotation: [0.4, 0.9, 0.2], kind: 'salt', phase: 5.5, scale: 0.8, parallax: 0.12 },
]

const AROMA_MOTES = [
  { x: -0.25, z: 0.15, speed: 0.42, phase: 0.1, scale: 0.022 },
  { x: 0.18, z: -0.18, speed: 0.36, phase: 1.4, scale: 0.018 },
  { x: 0.04, z: 0.26, speed: 0.48, phase: 2.6, scale: 0.02 },
  { x: -0.14, z: -0.22, speed: 0.34, phase: 3.9, scale: 0.016 },
  { x: 0.3, z: 0.08, speed: 0.4, phase: 5.1, scale: 0.019 },
  { x: -0.32, z: -0.05, speed: 0.38, phase: 0.9, scale: 0.017 },
]

function CherryTomato({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.135, 22, 18]} />
        <meshPhysicalMaterial
          color="#D8432E"
          roughness={0.22}
          clearcoat={0.75}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <mesh position={[0.07, 0.08, 0.06]} scale={[0.7, 0.45, 0.7]}>
        <sphereGeometry args={[0.045, 10, 8]} />
        <meshStandardMaterial color="#5E1B12" roughness={0.75} />
      </mesh>
      <group position={[0, 0.13, 0]}>
        <mesh position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.01, 0.014, 0.05, 6]} />
          <meshStandardMaterial color="#244C35" roughness={0.6} />
        </mesh>
        {[0, 1.25, 2.5, 3.75, 5].map((ang) => (
          <mesh
            key={ang}
            position={[Math.cos(ang) * 0.028, 0.005, Math.sin(ang) * 0.028]}
            rotation={[0.25, -ang, 0.3]}
          >
            <boxGeometry args={[0.048, 0.008, 0.014]} />
            <meshStandardMaterial color="#2E6144" roughness={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function PastaDish({
  pastaStrands,
  basilGeo,
  isMobile,
}: {
  pastaStrands: THREE.TubeGeometry[]
  basilGeo: THREE.BufferGeometry
  isMobile: boolean
}) {
  return (
    <group>
      <mesh position={[0, 0.048, 0.02]} scale={[1.06, 1, 0.96]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.68, 0.024, 36]} />
        <meshPhysicalMaterial
          color="#A92718"
          roughness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[-0.12, 0.052, -0.08]} scale={[0.92, 1, 1.04]} receiveShadow>
        <cylinderGeometry args={[0.54, 0.52, 0.022, 32]} />
        <meshPhysicalMaterial
          color="#BD3220"
          roughness={0.18}
          clearcoat={0.92}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {[
        [-0.52, 0.064, 0.18, 0.075],
        [0.48, 0.064, 0.28, 0.06],
        [0.14, 0.064, -0.52, 0.065],
        [-0.24, 0.064, -0.46, 0.05],
        [0.56, 0.064, -0.14, 0.052],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1.15, 0.22, 0.95]}>
          <sphereGeometry args={[r, 14, 10]} />
          <meshPhysicalMaterial
            color="#2D6A42"
            roughness={0.12}
            clearcoat={0.95}
            clearcoatRoughness={0.08}
          />
        </mesh>
      ))}

      <group position={[-0.06, 0.055, 0.04]}>
        {pastaStrands.map((geo, i) => (
          <mesh key={i} geometry={geo} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={i % 2 === 0 ? '#EBB844' : '#F2C963'}
              roughness={0.36}
              clearcoat={0.28}
              clearcoatRoughness={0.26}
            />
          </mesh>
        ))}
      </group>

      <group position={[0.25, 0.19, -0.1]}>
        <mesh scale={[1.12, 0.76, 1.02]} castShadow>
          <sphereGeometry args={[0.25, isMobile ? 20 : 28, isMobile ? 16 : 22]} />
          <meshPhysicalMaterial
            color="#FFFDF7"
            roughness={0.24}
            clearcoat={0.55}
            clearcoatRoughness={0.2}
          />
        </mesh>
        <mesh position={[-0.14, -0.04, 0.12]} scale={[0.95, 0.65, 0.9]} castShadow>
          <sphereGeometry args={[0.14, 16, 14]} />
          <meshPhysicalMaterial
            color="#FAF5E8"
            roughness={0.28}
            clearcoat={0.5}
            clearcoatRoughness={0.22}
          />
        </mesh>
        <mesh position={[0.02, 0.18, -0.02]} scale={[0.75, 0.9, 0.75]} castShadow>
          <sphereGeometry args={[0.075, 14, 12]} />
          <meshPhysicalMaterial color="#FFFDF7" roughness={0.28} clearcoat={0.45} />
        </mesh>
      </group>

      <CherryTomato position={[-0.44, 0.17, -0.2]} rotation={[0.15, 0.4, 0.2]} scale={1.1} />
      <CherryTomato position={[0.32, 0.17, 0.34]} rotation={[-0.12, 1.1, -0.15]} scale={1.0} />
      <CherryTomato position={[-0.24, 0.18, 0.42]} rotation={[0.2, -0.5, 0.1]} scale={0.92} />

      <mesh
        geometry={basilGeo}
        position={[0.08, 0.36, -0.02]}
        rotation={[-1.02, 0.32, 0.38]}
        scale={0.56}
        castShadow
      >
        <meshStandardMaterial color="#244C35" roughness={0.44} />
      </mesh>
      <mesh
        geometry={basilGeo}
        position={[-0.22, 0.29, 0.1]}
        rotation={[-1.18, -0.45, -0.52]}
        scale={0.46}
        castShadow
      >
        <meshStandardMaterial color="#2E6144" roughness={0.46} />
      </mesh>
      <mesh
        geometry={basilGeo}
        position={[0.42, 0.26, 0.08]}
        rotation={[-1.08, 0.62, 0.82]}
        scale={0.4}
        castShadow
      >
        <meshStandardMaterial color="#244C35" roughness={0.44} />
      </mesh>

      {[
        [-0.64, 0.08, 0.14],
        [0.62, 0.09, -0.34],
        [0.06, 0.075, 0.64],
        [-0.48, 0.08, -0.52],
      ].map((pos, idx) => (
        <mesh key={`oil-${idx}`} position={pos as [number, number, number]} scale={[1.1, 0.42, 1.1]}>
          <sphereGeometry args={[0.042, 12, 10]} />
          <meshPhysicalMaterial
            color="#D9A126"
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
      ))}
    </group>
  )
}

function SeaBassDish({ basilGeo }: { basilGeo: THREE.BufferGeometry }) {
  return (
    <group>
      {/* Bright emerald basil-caper salsa verde bed */}
      <mesh position={[0, 0.048, 0.04]} scale={[1.15, 1, 0.85]} receiveShadow>
        <cylinderGeometry args={[0.66, 0.64, 0.024, 34]} />
        <meshPhysicalMaterial
          color="#244C35"
          roughness={0.22}
          clearcoat={0.85}
          clearcoatRoughness={0.14}
        />
      </mesh>

      {/* Braised sweet baby fennel wedges underneath */}
      {[
        { pos: [-0.22, 0.09, 0.14] as [number, number, number], rot: [0.1, 0.4, 0.2] as [number, number, number] },
        { pos: [0.18, 0.09, -0.14] as [number, number, number], rot: [-0.08, -0.5, 0.12] as [number, number, number] },
      ].map((f, idx) => (
        <mesh key={idx} position={f.pos} rotation={f.rot} scale={[1.4, 0.45, 0.72]} castShadow>
          <sphereGeometry args={[0.24, 18, 14]} />
          <meshPhysicalMaterial color="#EFE1BA" roughness={0.45} clearcoat={0.25} />
        </mesh>
      ))}

      {/* Crisp-skinned wood-fired sea bass fillet */}
      <group position={[0.02, 0.18, 0]} rotation={[0.06, -0.25, 0]}>
        {/* Tender flaky white fish body */}
        <mesh scale={[1.65, 0.42, 0.72]} castShadow receiveShadow>
          <sphereGeometry args={[0.38, 24, 18]} />
          <meshPhysicalMaterial color="#FFF6E8" roughness={0.34} clearcoat={0.3} />
        </mesh>
        {/* Golden blistered oak-hearth skin layer on top */}
        <mesh position={[0, 0.11, 0]} scale={[1.55, 0.16, 0.66]} castShadow>
          <sphereGeometry args={[0.37, 22, 14]} />
          <meshPhysicalMaterial
            color="#B88649"
            roughness={0.32}
            clearcoat={0.65}
            clearcoatRoughness={0.22}
          />
        </mesh>
        {/* Scored hearth grill marks */}
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.165, 0]} rotation={[0, 0.35, 0]}>
            <boxGeometry args={[0.032, 0.018, 0.42]} />
            <meshStandardMaterial color="#4A321B" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Preserved Meyer lemon wheel */}
      <group position={[0.52, 0.12, 0.28]} rotation={[0.45, -0.3, -0.28]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.035, 24]} />
          <meshPhysicalMaterial color="#EFC346" roughness={0.28} clearcoat={0.6} />
        </mesh>
        <mesh position={[0, 0.019, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.16, 20]} />
          <meshStandardMaterial color="#F8E28A" roughness={0.35} />
        </mesh>
      </group>

      {/* Roasted cherry tomatoes & basil sprigs */}
      <CherryTomato position={[-0.55, 0.15, -0.22]} rotation={[0.1, 0.3, 0.15]} scale={0.95} />
      <CherryTomato position={[-0.38, 0.15, -0.38]} rotation={[-0.1, 0.8, -0.1]} scale={0.82} />
      <mesh
        geometry={basilGeo}
        position={[0.14, 0.35, -0.04]}
        rotation={[-1.08, 0.25, 0.35]}
        scale={0.5}
        castShadow
      >
        <meshStandardMaterial color="#2E6144" roughness={0.44} />
      </mesh>
      <mesh
        geometry={basilGeo}
        position={[-0.24, 0.32, 0.14]}
        rotation={[-1.12, -0.5, -0.45]}
        scale={0.44}
        castShadow
      >
        <meshStandardMaterial color="#244C35" roughness={0.44} />
      </mesh>
    </group>
  )
}

function DessertDish({
  cakeGeo,
  basilGeo,
}: {
  cakeGeo: THREE.ExtrudeGeometry
  basilGeo: THREE.BufferGeometry
}) {
  return (
    <group>
      {/* Blood orange blossom syrup glaze pool */}
      <mesh position={[0, 0.046, 0.02]} scale={[1.05, 1, 0.95]} receiveShadow>
        <cylinderGeometry args={[0.66, 0.64, 0.02, 34]} />
        <meshPhysicalMaterial
          color="#C94C2B"
          roughness={0.14}
          clearcoat={0.95}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Ligurian olive oil & citrus cake wedge */}
      <group position={[-0.16, 0.19, 0.04]} rotation={[0.04, 0.42, 0]}>
        <mesh geometry={cakeGeo} castShadow receiveShadow>
          <meshStandardMaterial color="#E6A943" roughness={0.72} />
        </mesh>
        {/* Caramelized baked top crust */}
        <mesh position={[0.02, 0.145, 0]} scale={[0.96, 0.12, 0.96]}>
          <boxGeometry args={[0.74, 0.25, 0.42]} />
          <meshStandardMaterial color="#BA7525" roughness={0.58} />
        </mesh>
      </group>

      {/* Whipped vanilla bean mascarpone quenelle */}
      <mesh position={[0.34, 0.17, 0.14]} rotation={[0.1, -0.5, 0.08]} scale={[1.55, 0.72, 0.85]} castShadow>
        <sphereGeometry args={[0.18, 22, 16]} />
        <meshPhysicalMaterial
          color="#FFFDF7"
          roughness={0.22}
          clearcoat={0.55}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {/* Honey-roasted black mission fig halves */}
      {[
        { pos: [0.22, 0.16, -0.32] as [number, number, number], rot: [0.3, 0.4, 0.15] as [number, number, number] },
        { pos: [0.46, 0.15, -0.18] as [number, number, number], rot: [-0.2, 1.1, 0.2] as [number, number, number] },
      ].map((fig, idx) => (
        <group key={idx} position={fig.pos} rotation={fig.rot}>
          <mesh scale={[1, 0.82, 1]} castShadow>
            <sphereGeometry args={[0.15, 18, 14]} />
            <meshPhysicalMaterial color="#422233" roughness={0.35} clearcoat={0.5} />
          </mesh>
          <mesh position={[0, 0.075, 0.04]} rotation={[-0.4, 0, 0]} scale={[0.85, 0.35, 0.85]}>
            <sphereGeometry args={[0.11, 14, 12]} />
            <meshPhysicalMaterial color="#B83B48" roughness={0.22} clearcoat={0.85} />
          </mesh>
        </group>
      ))}

      {/* Fresh sweet basil garnish & toasted almond crumble */}
      <mesh
        geometry={basilGeo}
        position={[0.32, 0.3, 0.12]}
        rotation={[-1.02, 0.42, 0.4]}
        scale={0.4}
        castShadow
      >
        <meshStandardMaterial color="#244C35" roughness={0.44} />
      </mesh>
      {[
        [0.12, 0.08, 0.38],
        [0.52, 0.08, 0.28],
        [-0.42, 0.08, 0.36],
        [0.02, 0.08, -0.48],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[i, i * 0.7, 0.3]}>
          <dodecahedronGeometry args={[0.035, 0]} />
          <meshStandardMaterial color="#D8B073" roughness={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function ServingPlateScene({
  activeDish,
  isMobile,
  reducedMotion,
  spinCount,
}: {
  activeDish: HeroPlateDishId
  isMobile: boolean
  reducedMotion: boolean
  spinCount: number
}) {
  const plateGroupRef = useRef<THREE.Group>(null)
  const floatRefs = useRef<(THREE.Group | null)[]>([])
  const moteRefs = useRef<(THREE.Mesh | null)[]>([])
  const mountTimeRef = useRef<number | null>(null)
  const spinCurrentRef = useRef(0)

  const stonewareTex = useMemo(() => createStonewareTexture(), [])
  const plateGeo = useMemo(() => createPlateGeometry(isMobile ? 44 : 72), [isMobile])
  const basilGeo = useMemo(() => createCurvedBasilGeometry(), [])
  const cakeGeo = useMemo(() => createCakeSliceGeometry(), [])
  const pastaStrands = useMemo(() => createPastaStrands(isMobile), [isMobile])

  const floatingList = isMobile ? FLOATING_ITEMS.slice(0, 4) : FLOATING_ITEMS
  const motesList = reducedMotion ? [] : isMobile ? AROMA_MOTES.slice(0, 3) : AROMA_MOTES

  useEffect(() => {
    return () => {
      stonewareTex.dispose()
      plateGeo.dispose()
      basilGeo.dispose()
      cakeGeo.dispose()
      pastaStrands.forEach((g) => g.dispose())
    }
  }, [stonewareTex, plateGeo, basilGeo, cakeGeo, pastaStrands])

  useFrame((state, delta) => {
    const group = plateGroupRef.current
    if (!group) return

    if (reducedMotion) {
      group.position.set(0, 0, 0)
      group.rotation.set(0.56, -0.34, 0.03)
      group.scale.setScalar(isMobile ? 0.84 : 0.96)
      return
    }

    const t = state.clock.getElapsedTime()
    if (mountTimeRef.current === null) mountTimeRef.current = t
    const elapsedSinceMount = t - mountTimeRef.current
    const introProgress = Math.min(elapsedSinceMount / 0.85, 1)
    const introEase = 1 - Math.pow(1 - introProgress, 3)

    const scrollRatio =
      typeof window !== 'undefined' ? Math.min(window.scrollY / 680, 1) : 0

    const spinTarget = spinCount * Math.PI * 2
    spinCurrentRef.current = THREE.MathUtils.lerp(
      spinCurrentRef.current,
      spinTarget,
      Math.min(delta * 4.5, 1),
    )
    const spinLift = Math.abs(spinTarget - spinCurrentRef.current) > 0.08 ? 0.11 : 0

    const baseHover = Math.sin(t * 1.15) * 0.055 - scrollRatio * 0.12
    const introDrop = (1 - introEase) * -0.22
    const targetY = baseHover + introDrop + spinLift
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, Math.min(delta * 6, 1))

    const baseScale = isMobile ? 0.84 : 0.96
    group.scale.setScalar(baseScale * (0.92 + 0.08 * introEase))

    const pointerX = isMobile ? 0 : state.pointer.x * 0.25
    const pointerY = isMobile ? 0 : state.pointer.y * 0.14
    const idleSwayY = Math.sin(t * 0.55) * 0.08
    const targetRotX = 0.56 - pointerY - scrollRatio * 0.15
    const targetRotY = -0.34 + idleSwayY + pointerX + scrollRatio * 0.72 + spinCurrentRef.current
    const targetRotZ = 0.03 - pointerX * 0.16

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, Math.min(delta * 5, 1))
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, Math.min(delta * 5, 1))
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetRotZ, Math.min(delta * 5, 1))

    floatRefs.current.forEach((el, idx) => {
      if (!el) return
      const item = floatingList[idx]
      if (!item) return
      const px = isMobile ? 0 : state.pointer.x * item.parallax
      const py = isMobile ? 0 : state.pointer.y * item.parallax * 0.7
      el.position.x = THREE.MathUtils.lerp(
        el.position.x,
        item.position[0] + px,
        Math.min(delta * 4, 1),
      )
      el.position.y =
        item.position[1] + py + Math.sin(t * 1.25 + item.phase) * 0.075
      el.rotation.y = item.rotation[1] + Math.sin(t * 0.7 + item.phase) * 0.26
      el.rotation.z = item.rotation[2] + Math.cos(t * 0.6 + item.phase) * 0.12
    })

    moteRefs.current.forEach((mote, idx) => {
      if (!mote) return
      const m = motesList[idx]
      if (!m) return
      const cycle = ((t * m.speed + m.phase) % 1.4) / 1.4
      mote.position.set(
        m.x + Math.sin(t * 1.5 + m.phase) * 0.06,
        0.26 + cycle * 0.72,
        m.z + Math.cos(t * 1.3 + m.phase) * 0.05,
      )
      const fade = Math.sin(cycle * Math.PI)
      mote.scale.setScalar(m.scale * (0.6 + 0.6 * fade))
      const mat = mote.material as THREE.MeshBasicMaterial
      mat.opacity = fade * 0.36
    })
  })

  return (
    <>
      <group
        ref={plateGroupRef}
        position={[0, 0, 0]}
        rotation={[0.56, -0.34, 0.03]}
        scale={isMobile ? 0.84 : 0.96}
      >
        <mesh geometry={plateGeo} receiveShadow castShadow>
          <meshPhysicalMaterial
            map={stonewareTex}
            roughness={0.5}
            metalness={0.02}
            clearcoat={0.28}
            clearcoatRoughness={0.32}
          />
        </mesh>

        <mesh position={[0, 0.268, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.56, 1.605, isMobile ? 44 : 72]} />
          <meshStandardMaterial color="#C97352" roughness={0.62} side={THREE.DoubleSide} />
        </mesh>

        {activeDish === 'pasta' && (
          <PastaDish
            pastaStrands={pastaStrands}
            basilGeo={basilGeo}
            isMobile={isMobile}
          />
        )}
        {activeDish === 'seabass' && <SeaBassDish basilGeo={basilGeo} />}
        {activeDish === 'dessert' && (
          <DessertDish cakeGeo={cakeGeo} basilGeo={basilGeo} />
        )}
      </group>

      {motesList.map((_, idx) => (
        <mesh
          key={`mote-${idx}`}
          ref={(el) => {
            moteRefs.current[idx] = el
          }}
        >
          <sphereGeometry args={[1, 10, 8]} />
          <meshBasicMaterial color="#F4CA64" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      ))}

      {floatingList.map((item, idx) => (
        <group
          key={idx}
          ref={(el) => {
            floatRefs.current[idx] = el
          }}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        >
          {item.kind === 'basil' && (
            <mesh geometry={basilGeo} castShadow>
              <meshStandardMaterial color="#244C35" roughness={0.44} />
            </mesh>
          )}
          {item.kind === 'tomato' && <CherryTomato position={[0, 0, 0]} />}
          {item.kind === 'olive' && (
            <mesh scale={[1.22, 0.88, 0.88]} castShadow>
              <sphereGeometry args={[0.105, 16, 14]} />
              <meshPhysicalMaterial
                color="#5B733C"
                roughness={0.28}
                clearcoat={0.55}
                clearcoatRoughness={0.2}
              />
            </mesh>
          )}
          {item.kind === 'salt' && (
            <mesh>
              <octahedronGeometry args={[0.065, 0]} />
              <meshPhysicalMaterial
                color="#FFFDF8"
                roughness={0.18}
                clearcoat={0.85}
                clearcoatRoughness={0.12}
              />
            </mesh>
          )}
        </group>
      ))}

      <ContactShadows
        position={[0, -1.22, 0]}
        opacity={0.28}
        scale={6.2}
        blur={2.5}
        far={3.6}
        color="#22221E"
        frames={reducedMotion ? 1 : Infinity}
      />
    </>
  )
}

export function HeroPlateCanvas({
  activeDish,
  isMobile,
  reducedMotion,
  onWebGLError,
}: HeroPlateCanvasProps) {
  const [spinCount, setSpinCount] = useState(0)
  const prevDishRef = useRef<HeroPlateDishId>(activeDish)

  useEffect(() => {
    if (prevDishRef.current !== activeDish) {
      prevDishRef.current = activeDish
      if (!reducedMotion) {
        setSpinCount((c) => c + 1)
      }
    }
  }, [activeDish, reducedMotion])

  return (
    <div
      onClick={() => {
        if (!reducedMotion) setSpinCount((c) => c + 1)
      }}
      className={`h-full w-full ${reducedMotion ? '' : 'cursor-pointer'}`}
      title={reducedMotion ? undefined : 'Click plate to spin'}
    >
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 1.32, 5.25], fov: 34 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.06
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            onWebGLError()
          })
        }}
        aria-label="Interactive 3D stoneware serving plate displaying selectable SAVOR seasonal courses"
      >
        <ambientLight intensity={0.62} color="#FFF4E2" />
        <hemisphereLight args={['#FFFDF8', '#D8C2A2', 0.88]} />
        <directionalLight
          position={[3.6, 5.4, 3.8]}
          intensity={1.75}
          color="#FFF7E8"
          castShadow
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-3.4, 2.2, -2.6]} intensity={0.75} color="#FFD8BD" />
        <pointLight position={[0.4, 1.2, 2.6]} intensity={0.55} color="#FFF0D4" distance={7} />
        <pointLight position={[-1.4, -0.8, 2.2]} intensity={0.35} color="#D8432E" distance={5} />

        <ServingPlateScene
          activeDish={activeDish}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          spinCount={spinCount}
        />
      </Canvas>
    </div>
  )
}
