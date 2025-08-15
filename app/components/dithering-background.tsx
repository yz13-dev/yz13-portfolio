"use client"
import { AsciiRenderer } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { cn } from "@yz13/ui/utils"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface DitheringBackgroundProps {
  size?: "sm" | "default" | "lg"
  className?: string,
  withGradientOverylay?: boolean
}

// Вертексный шейдер для плоскостей
const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vElevation = position.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Фрагментный шейдер с шумом для топографии
const fragmentShader = `
  uniform float time;
  uniform float lightness;
  varying vec2 vUv;
  varying float vElevation;

  // Функция для генерации псевдослучайных чисел
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Функция для генерации шума
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Функция для генерации фрактального шума
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st * frequency);
      st *= 2.0;
      amplitude *= 0.5;
      frequency *= 1.5;
    }
    return value;
  }

  void main() {
    vec2 st = vUv;

    // Создаем органичный шум для топографии
    float noiseValue = fbm(st * 100.0 + time * 0.05);

    // Добавляем волновые эффекты
    float wave1 = sin(st.x * 30.0 + time * 0.2) * 0.2;
    float wave2 = sin(st.y * 30.0 + time * 0.2) * 0.2;
    float wave3 = sin((st.x + st.y) * 10.0 + time * 0.2) * 0.6;

    // Комбинируем шум и волны
    float combined = noiseValue + wave1 + wave2 + wave3;

    // Применяем lightness для создания слоев
    float finalValue = combined * lightness;

    // Создаем топографический эффект
    gl_FragColor = vec4(vec3(finalValue), 1.0);
  }
`

// Компонент для топографической плоскости
function TopographicPlane({
  lightness,
  rotation,
  position,
  scale,
  visible
}: {
  lightness: number
  rotation: [number, number, number]
  position: [number, number, number]
  scale: number
  visible: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Создаем шейдерный материал
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.lightness = { value: lightness }
      materialRef.current.uniforms.time = { value: 0 }
    }
  }, [lightness])

  // Анимация шейдера
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      visible={visible}
    >
      <planeGeometry args={[8, 8, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          time: { value: 0 },
          lightness: { value: lightness }
        }}
      />
    </mesh>
  )
}

// Компонент для топографической сцены
function TopographicScene({ layersVisible }: { layersVisible: boolean }) {
  const { camera } = useThree()

  // Анимация камеры
  useFrame(() => {

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;

    camera.lookAt(0, 0, 0)
  })

  return (
    <TopographicPlane
      lightness={1.0}
      rotation={[0, 0, 0]}
      position={[-0.1, 0.05, 0.3]}
      scale={1}
      visible={layersVisible}
    />
  )
}


export default function DitheringBackground({
  className = "",
  size = "default",
  withGradientOverylay = true
}: DitheringBackgroundProps) {
  const [layersVisible, setLayersVisible] = useState(false)

  // Показываем слои с задержкой
  useEffect(() => {
    setLayersVisible(true)
  }, [])

  const resolution = size === "default" ? 0.08 : size === "lg" ? 0.04 : 0.1

  return (
    <div className={cn("w-full h-dvh absolute top-0 z-[-1] left-0", className)}>
      <div
        className={cn("w-full h-full relative",
        )}
      >
        <div className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1000",
          layersVisible ? "opacity-30" : "opacity-0"
        )}>
          <Canvas
            camera={{ position: [0, 0, 3], fov: 75 }}
            style={{ background: 'transparent', fontFamily: "var(--font-mono)" }}
            className="jetbrains-mono"
          >
            {/*<ambientLight intensity={0.6} />*/}
            {/*<pointLight position={[10, 10, 10]} intensity={0.8} />*/}
            {/*<pointLight position={[-10, -10, -10]} intensity={0.4} />*/}

            <TopographicScene layersVisible={layersVisible} />

            <AsciiRenderer
              fgColor="var(--foreground)"
              bgColor="transparent"
              characters=" .,;:!?%&@"
              resolution={resolution}
              color={false}
              invert={false}
            />
          </Canvas>
        </div>
        {
          withGradientOverylay &&
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background" />
        }
      </div>
    </div>
  )
}
