// src/App.jsx
import React, { useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
// Constrain camera inside the room
function ConstrainCamera({ roomSize }) {
  const { camera } = useThree()
  const half = roomSize / 2
  useFrame(() => {
    camera.position.x = Math.min(half - 0.1, Math.max(-half + 0.1, camera.position.x))
    camera.position.z = Math.min(half - 0.1, Math.max(-half + 0.1, camera.position.z))
    camera.position.y = Math.min(roomSize - 1, Math.max(1, camera.position.y))
    camera.lookAt(0, 0, 0)
  })
  return null
}
// Basic furniture primitives - Updated to ensure proper floor placement
function Chair({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="sienna" />
      </mesh>
      <mesh position={[0, 0.75, -0.45]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="sienna" />
      </mesh>
      {[
        [0.45, -0.25, 0.45],
        [-0.45, -0.25, 0.45],
        [0.45, -0.25, -0.45],
        [-0.45, -0.25, -0.45],
      ].map((off, i) => (
        <mesh key={i} position={[off[0], off[1] + 0.25, off[2]]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color="sienna" />
        </mesh>
      ))}
    </group>
  )
}
function Table({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="peru" />
      </mesh>
      {[
        [0.9, -0.5, 0.9],
        [-0.9, -0.5, 0.9],
        [0.9, -0.5, -0.9],
        [-0.9, -0.5, -0.9],
      ].map((off, i) => (
        <mesh key={i} position={[off[0], off[1] + 0.5, off[2]]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color="peru" />
        </mesh>
      ))}
    </group>
  )
}
function Dresser({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {[0.5, 0, -0.5].map((yOff, i) => (
        <mesh key={i} position={[0, yOff + 1, 0.55]}>
          <boxGeometry args={[1.8, 0.5, 0.1]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
      ))}
    </group>
  )
}
function Sofa({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      {/* Seat sits 0.25 above the floor (half of 0.5) */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color="teal" />
      </mesh>
      {/* Backrest sits on top of seat: 0.25 (seat) + 0.5/2 */}
      <mesh position={[0, 0.25 + 0.5 / 2, -0.45]}>
        <boxGeometry args={[2, 1, 0.2]} />
        <meshStandardMaterial color="teal" />
      </mesh>
      {/* Armrests—half their height above floor */}
      {[-0.9, 0.9].map((xOff, i) => (
        <mesh key={i} position={[xOff, 0.25 + 0.5 / 2, 0]}>
          <boxGeometry args={[0.2, 0.5, 1]} />
          <meshStandardMaterial color="teal" />
        </mesh>
      ))}
    </group>
  )
}

// New bed component
function Bed({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      {/* Bed frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.2, 0.4, 3]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.2, 2.8]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>
      {/* Pillow */}
      <mesh position={[0, 0.65, -1.1]}>
        <boxGeometry args={[1.6, 0.1, 0.5]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Blanket */}
      <mesh position={[0, 0.62, 0.4]}>
        <boxGeometry args={[1.9, 0.05, 1.8]} />
        <meshStandardMaterial color="#3f51b5" />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 1, -1.45]}>
        <boxGeometry args={[2.2, 1, 0.1]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  )
}
// Rug lifted slightly above floor to prevent z-fighting
function Rug({ position, onPointerDown }) {
  return (
    <mesh
      position={[position[0], 0.01, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={onPointerDown}
      receiveShadow
    >
      <planeGeometry args={[3, 2]} />
      <meshStandardMaterial color="#D2B48C" side={2} />
    </mesh>
  )
}
function Bookshelf({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      {/* Left side panel */}
      <mesh position={[-0.75, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Right side panel */}
      <mesh position={[0.75, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Top shelf */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      {/* Middle shelf */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      {/* Bottom shelf */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
    </group>
  )
}
// 2. Floor Lamp: tall pole + cone shade on top
function FloorLamp({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      {/* Pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      {/* Lamp shade */}
      <mesh position={[0, 2.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.4, 0.6, 16]} />
        <meshStandardMaterial color="#ffc107" />
      </mesh>
    </group>
  )
}

function DeskWithMonitor({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown} castShadow>
      {/* Desktop */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* Legs */}
      {[
        [0.9, 0, 0.4],
        [-0.9, 0, 0.4],
        [0.9, 0, -0.4],
        [-0.9, 0, -0.4],
      ].map((off, i) => (
        <mesh key={i} position={[off[0], 0.375, off[2]]}>
          <cylinderGeometry args={[0.05, 0.05, 0.75, 12]} />
          <meshStandardMaterial color="#5d4037" />
        </mesh>
      ))}

      {/* Monitor stand */}
      <mesh position={[0, 0.85, -0.3]}>
        <boxGeometry args={[0.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Monitor neck */}
      <mesh position={[0, 1.15, -0.3]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Monitor screen bezel */}
      <mesh position={[0, 1.45, -0.3]}>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen content (moved forward & enlarged) */}
      <mesh position={[0, 1.45, -0.24]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
    </group>
  )
}


// Wall-mounted items are now freely placeable like other furniture
function Painting({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown}>
      {/* Frame backing */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#5a3d2b" />
      </mesh>
      {/* Frame border */}
      <mesh position={[0, 1, 0.06]}>
        <boxGeometry args={[1.8, 0.8, 0.02]} />
        <meshStandardMaterial color="#d4c7b2" />
      </mesh>
      {/* Painting content */}
      <mesh position={[0, 1, 0.08]}>
        <boxGeometry args={[1.7, 0.7, 0.01]} />
        <meshStandardMaterial color="#264653" />
      </mesh>
      {/* Abstract elements */}
      <mesh position={[-0.5, 1.1, 0.09]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.8, 0.1, 0.01]} />
        <meshStandardMaterial color="#e9c46a" />
      </mesh>
      <mesh position={[0.4, 0.9, 0.09]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.1, 0.01]} />
        <meshStandardMaterial color="#e76f51" />
      </mesh>
    </group>
  )
}
function Poster({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown}>
      {/* Poster backing */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#f8f9fa" />
      </mesh>
      {/* Poster content */}
      <mesh position={[0, 2, 0.03]}>
        <boxGeometry args={[1.3, 0.6, 0.01]} />
        <meshStandardMaterial color="#212529" />
      </mesh>
      <mesh position={[0, 1, 0.03]}>
        <boxGeometry args={[1.3, 0.8, 0.01]} />
        <meshStandardMaterial color="#adb5bd" />
      </mesh>
      {/* Title text */}
      <mesh position={[0, 1.5, 0.04]}>
        <boxGeometry args={[1, 0.2, 0.01]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>
    </group>
  )
}
function Pillar({ position, rotation, onPointerDown }) {
  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown}>
      {/* Main pillar */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#6c757d" />
      </mesh>
      {/* Capital */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color="#dee2e6" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color="#dee2e6" />
      </mesh>
    </group>
  )
}

function Clock({ position, rotation, onPointerDown }) {
  const s = 0.6

  return (
    <group position={position} rotation={rotation} onPointerDown={onPointerDown}>
      {/* Flat frame like a poster */}
      <mesh position={[0, 1 * s + (1 - s), 0]}>
        <boxGeometry args={[1.5 * s, 1.5 * s, 0.05 * s]} />
        <meshStandardMaterial color="#ced4da" />
      </mesh>

      {/* Clock face circle */}
      <mesh position={[0, 1 * s + (1 - s), 0.06 * s]}>
        <circleGeometry args={[0.65 * s, 32]} />
        <meshStandardMaterial color="#fff" />
      </mesh>

      {/* 12 ticks */}
      {[...Array(12)].map((_, i) => {
        const ang = (i / 12) * Math.PI * 2
        const r = 0.55 * s
        return (
          <mesh
            key={i}
            position={[
              Math.sin(ang) * r,
              1 * s + (1 - s) + Math.cos(ang) * r,
              0.07 * s
            ]}
            rotation={[0, 0, -ang]}
          >
            <boxGeometry
              args={[
                (i % 3 === 0 ? 0.1 : 0.05) * s,
                0.02 * s,
                0.01 * s
              ]}
            />
            <meshStandardMaterial color="#000" />
          </mesh>
        )
      })}

      {/* Hour hand */}
      <mesh position={[0, 1 * s + (1 - s), 0.08 * s]} rotation={[0, 0, -Math.PI / 3]}>
        <boxGeometry args={[0.05 * s, 0.3 * s, 0.01 * s]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Minute hand */}
      <mesh position={[0, 1 * s + (1 - s), 0.08 * s]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.03 * s, 0.45 * s, 0.01 * s]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Second hand */}
      <mesh position={[0, 1 * s + (1 - s), 0.08 * s]} rotation={[0, 0, Math.PI / 1.5]}>
        <boxGeometry args={[0.01 * s, 0.5 * s, 0.005 * s]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>

      {/* Center pin */}
      <mesh position={[0, 1 * s + (1 - s), 0.09 * s]}>
        <circleGeometry args={[0.04 * s, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}



export default function App() {
  const [roomSize, setRoomSize] = useState(10)
  const [wallColor, setWallColor] = useState('#8b0000')
  const [selectedModel, setSelectedModel] = useState(null)
  const [furniture, setFurniture] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const half = roomSize / 2
  const cameraStart = [0, roomSize / 2, roomSize * 1.2]

  // Improved placement function to treat all objects the same
  function placeAt(e) {
    e.stopPropagation()
    if (!selectedModel) return

    const { point } = e
    const { x, y, z } = point

    // For all items, just place them at the clicked position
    // Wall-mounted items will need to be rotated by the user to align with walls
    setFurniture(f => [
      ...f,
      { 
        type: selectedModel,
        position: [x, selectedModel === 'rug' ? 0.01 : 0, z], // Special case for rug to avoid z-fighting
        rotation: [0, 0, 0]
      },
    ])
    setSelectedModel(null)
  }

  function rotateSelected(dir) {
    if (selectedIndex == null) return
    setFurniture(f =>
      f.map((item, i) => {
        if (i !== selectedIndex) return item
        const delta = Math.PI / 4 * (dir === 'left' ? 1 : -1)

        // Create a new rotation array with the rotated Y value
        const newRotation = [
          item.rotation[0],
          item.rotation[1] + delta,
          item.rotation[2]
        ]

        // Check if this rotation aligns with a wall (for wall-mounted items)
        const isWallMount = ['painting', 'poster', 'clock', 'pillar'].includes(item.type)
        const snapThreshold = 0.1 // Radians (about 5.7 degrees)

        if (isWallMount) {
          // Check if rotation is close to a 90-degree increment (aligned with walls)
          // 0, PI/2, PI, 3PI/2 are the four wall orientations
          const normalizedRotation = newRotation[1] % (Math.PI * 2)

          // Check if close to any of the four wall orientations
          for (let wallOrient = 0; wallOrient < 4; wallOrient++) {
            const wallAngle = (Math.PI / 2) * wallOrient
            const angleDiff = Math.abs((normalizedRotation + Math.PI * 2) % (Math.PI * 2) - wallAngle)

            // If close to a wall orientation, snap to it exactly
            if (angleDiff < snapThreshold || Math.abs(angleDiff - Math.PI * 2) < snapThreshold) {
              newRotation[1] = wallAngle

              // Also adjust position if we're snapping to a wall
              // Move the item up against the wall it's facing
              const { position } = item
              const half = 5 // Half of the room size - simplified for this example

              // Determine which wall we're snapping to and set appropriate position
              if (Math.abs(newRotation[1]) < snapThreshold) { // South wall
                position[2] = -half + 0.06
              } else if (Math.abs(newRotation[1] - Math.PI) < snapThreshold) { // North wall
                position[2] = half - 0.06
              } else if (Math.abs(newRotation[1] - Math.PI / 2) < snapThreshold) { // West wall
                position[0] = -half + 0.06
              } else if (Math.abs(newRotation[1] - Math.PI * 1.5) < snapThreshold) { // East wall
                position[0] = half - 0.06
              }

              return { ...item, rotation: newRotation, position }
            }
          }
        }

        // If not a wall mount or not close to wall orientation, just return with new rotation
        return { ...item, rotation: newRotation }
      })
    )
  }

  function removeSelected() {
    if (selectedIndex == null) return
    setFurniture(f => f.filter((_, i) => i !== selectedIndex))
    setSelectedIndex(null)
  }

  // Create the furniture items array including the missing items
const furnitureItems = [
  'chair', 'table', 'dresser', 'sofa', 'bed', 'rug', 
  'deskWithMonitor', 'bookshelf', 'floorlamp'  // 'monitor' removed, 'desk' changed to 'deskWithMonitor'
]
  // Sidebar wall items with SVG icons
  const wallItems = [
    { 
      type: 'painting', 
      label: 'Painting', 
      icon: (
        <svg viewBox="0 0 24 24" width="100%" height="40">
          <rect x="2" y="4" width="20" height="16" fill="#5a3d2b" />
          <rect x="3" y="5" width="18" height="14" fill="#d4c7b2" />
          <rect x="4" y="6" width="16" height="12" fill="#264653" />
          <rect x="6" y="10" width="10" height="2" fill="#e9c46a" transform="rotate(15, 11, 11)" />
          <rect x="8" y="14" width="8" height="2" fill="#e76f51" transform="rotate(-15, 12, 15)" />
        </svg>
      )
    },
    { 
      type: 'poster', 
      label: 'Poster', 
      icon: (
        <svg viewBox="0 0 24 24" width="100%" height="40">
          <rect x="4" y="2" width="16" height="20" fill="#f8f9fa" />
          <rect x="5" y="3" width="14" height="8" fill="#212529" />
          <rect x="5" y="12" width="14" height="9" fill="#adb5bd" />
          <rect x="6" y="10" width="12" height="3" fill="#e63946" />
        </svg>
      )
    },
    { 
      type: 'pillar', 
      label: 'Pillar', 
      icon: (
        <svg viewBox="0 0 24 24" width="100%" height="40">
          <rect x="9" y="2" width="6" height="20" fill="#6c757d" />
          <rect x="7" y="2" width="10" height="3" fill="#dee2e6" />
          <rect x="7" y="19" width="10" height="3" fill="#dee2e6" />
        </svg>
      )
    },
    { 
      type: 'clock', 
      label: 'Clock', 
      icon: (
        <svg viewBox="0 0 24 24" width="100%" height="40">
          <circle cx="12" cy="12" r="10" stroke="#ced4da" strokeWidth="2" fill="#fff" />
          <line x1="12" y1="12" x2="16" y2="8" stroke="#000" strokeWidth="1.5" />
          <line x1="12" y1="12" x2="12" y2="6" stroke="#000" strokeWidth="1" />
          <circle cx="12" cy="12" r="1.5" fill="#e63946" />
        </svg>
      )
    }
  ]

  // Common button style
  const buttonStyle = {
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    margin: '0 4px',
    borderRadius: '4px',
    cursor: 'pointer'
  }

  return (
    <>
      {/* Title and Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', background: '#222',
        padding: 10, display: 'flex',
        alignItems: 'center', gap: 8, zIndex: 10
      }}>
        <h2 style={{ margin: 0, color: '#fff', marginRight: 16 }}>Room Builder</h2>

        <select
          value={roomSize}
          onChange={e => setRoomSize(Number(e.target.value))}
          style={{ ...buttonStyle, padding: '6px' }}
        >
          {[8, 10, 15].map(n => (
            <option key={n} value={n}>{n}×{n}</option>
          ))}
        </select>

        {/* Update furniture buttons to include all available furniture options */}
       {furnitureItems.map(model => (
  <button
    key={model}
    onClick={() => setSelectedModel(model)}
    style={{
      ...buttonStyle,
      background: selectedModel === model ? '#444' : '#000'
    }}
  >
    {model === 'deskWithMonitor' ? 'Desk + Monitor' : model.charAt(0).toUpperCase() + model.slice(1)}
  </button>
))}

        {selectedIndex != null && (
          <>
            <button
              onClick={() => rotateSelected('left')}
              style={{ ...buttonStyle, marginLeft: 'auto' }}
            >
              Rotate
            </button>
            <button
              onClick={removeSelected}
              style={{ ...buttonStyle, background: '#cc0000' }}
            >
              Remove
            </button>
          </>
        )}
      </div>

      {/* Right sidebar */}
      <div style={{
        position: 'absolute',
        top: 50,
        right: 0,
        width: 200,
        height: 'calc(100% - 50px)',
        background: '#fff',
        padding: 10,
        overflowY: 'auto',
        zIndex: 10
      }}>
        <h4 style={{ color: '#000' }}>Wall Color</h4>
        <input
          type="color"
          value={wallColor}
          onChange={e => setWallColor(e.target.value)}
        />

        <h4 style={{ marginTop: 16, color: '#000' }}>Wall Items</h4>
        {wallItems.map((item, i) => (
          <div 
            key={i}
            style={{ 
              marginBottom: 12, 
              cursor: 'pointer',
              background: selectedModel === item.type ? '#eee' : 'transparent',
              padding: 8,
              border: '1px solid #ccc',
              borderRadius: 4
            }}
            onClick={() => setSelectedModel(item.type)}
          >
            <div>{item.icon}</div>
            <div style={{ textAlign: 'center', color: '#000', fontWeight: selectedModel === item.type ? 'bold' : 'normal' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: cameraStart, fov: 50 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <ConstrainCamera roomSize={roomSize} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[roomSize, roomSize * 2, roomSize]}
          intensity={1}
          castShadow
        />
        <OrbitControls
          makeDefault
          enableRotate
          enableZoom
          enablePan
          minDistance={roomSize * 0.1}
          maxDistance={roomSize * 5}
        />

        {/* Floor */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          onPointerDown={placeAt}
        >
          <planeGeometry args={[roomSize, roomSize]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>

        {/* Ceiling */}
        <mesh position={[0, roomSize, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Walls */}
        {/* Walls with alignment tooltip */}
{[
  { pos: [0, half, -half], rot: [0, 0, 0] },         // South
  { pos: [0, half, half],  rot: [0, Math.PI, 0] },   // North
  { pos: [-half, half, 0], rot: [0, Math.PI / 2, 0] }, // West
  { pos: [half, half, 0],  rot: [0, -Math.PI / 2, 0] }, // East
].map((w, i) => {
  const [, , yaw] = w.rot
  const deg = THREE.MathUtils.radToDeg(yaw) % 360
  const aligned = [0, 90, 180, 270].some(a => Math.abs((deg + 360) % 360 - a) < 5)
  return (
    <group key={i} position={w.pos} rotation={w.rot} onPointerDown={placeAt}>
      <mesh>
        <planeGeometry args={[roomSize, roomSize]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* only show if not aligned within ±5° of a wall */}
      {!aligned && (
        <Html position={[0, half + 0.5, 0]} center>
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            pointerEvents: 'none'
          }}>
            Rotate until aligned with the wall
          </div>
        </Html>
      )}
    </group>
  )
})}


{/* Furniture and wall items */}
{furniture.map((item, i) => {
  const common = {
    position: item.position,
    rotation: item.rotation,
    onPointerDown: e => {
      e.stopPropagation()
      setSelectedIndex(i)
    }
  }
  
  switch (item.type) {
  case 'chair':           return <Chair key={i} {...common} />
  case 'table':           return <Table key={i} {...common} />
  case 'dresser':         return <Dresser key={i} {...common} />
  case 'sofa':            return <Sofa key={i} {...common} />
  case 'bed':             return <Bed key={i} {...common} />
  case 'rug':             return <Rug key={i} position={item.position} onPointerDown={common.onPointerDown} />
  case 'deskWithMonitor': return <DeskWithMonitor key={i} {...common} />  // New combined component
  case 'bookshelf':       return <Bookshelf key={i} {...common} />
  case 'floorlamp':       return <FloorLamp key={i} {...common} />
  case 'painting':        return <Painting key={i} {...common} />
  case 'poster':          return <Poster key={i} {...common} />
  case 'pillar':          return <Pillar key={i} {...common} />
  case 'clock':           return <Clock key={i} {...common} />
  default:                return null
}
})}
</Canvas>
</>
)
}