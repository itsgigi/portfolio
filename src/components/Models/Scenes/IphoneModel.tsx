/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Canvas} from '@react-three/fiber'
import {ContactShadows, Float, OrbitControls} from '@react-three/drei'
//@ts-expect-error
import {Iphone} from '../RawModels/Iphone.jsx'
import { useRef, useState, useEffect, Suspense } from 'react'
import PcLights from './PcLights.js'
import { useMediaQuery } from "react-responsive";

interface IphoneModelProps {
  activeProject: string
}

const IphoneModel = ({activeProject}: IphoneModelProps) => {
  const canvasRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true)
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the canvas is visible
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])
  
  return (
    <div ref={canvasRef} style={{ height: '100vh' }} className='cursor-pointer'>
      <Canvas camera={{ position: [1, 1, 2], fov: 35 }}>
        <ambientLight intensity={0.2} color="#1a1a40" />
        <directionalLight intensity={1} position={[5, 5, 15]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={Math.PI / 20}
          maxAzimuthAngle={Math.PI / 4}
        />

        <Suspense fallback={null}>
          <Float rotationIntensity={ 0.4 } >
            <Iphone animate={shouldAnimate} scale={0.017} position={[0, isMobile ? 0 : -1.3, 0]} activeProject={activeProject}/>          
          </Float>
            <PcLights />
        </Suspense>

        <ContactShadows 
          position-y={ - 1.4 }
          opacity={ 0.8 }
          scale={ 5 }
          blur={ 2.4 }
        />  
      </Canvas>
    </div>
  )
}

export default IphoneModel