import React, { ReactNode } from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

import Plane from './units/Plane'
// import { useMainPage } from '../../hooks/useContentful'

import HeroImg from '../../assets/images/hero-image.jpg'
import useContentful from '../../hooks/useContentful'


export type FiberSceneProps = {
  children?: ReactNode
}


export const FiberScene: React.FC<FiberSceneProps> = ({
  children
}) => {
  const { data: contentful, isLoading } = useContentful()
  const contentfulHeroImg = contentful?.sites?.[0]?.main_image?.file?.url

  return isLoading ? <></> : (
    <div className='Fiber'>
      <Canvas
        style={{ width: '100%', height: '100%' }}
      >
        <EffectComposer>
          <Glitch
            delay={new THREE.Vector2(.25, 1)} // min and max glitch delay
            duration={new THREE.Vector2(0.6, 1.0)} // min and max glitch duration
            strength={new THREE.Vector2(0.3, 1.0)} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        </EffectComposer>
        <Plane img={contentfulHeroImg || HeroImg} />
        <ambientLight intensity={1} />
      </Canvas>
      {children &&
        <div className='Fiber__children'>
          {children}
        </div>
      }
    </div>
  )
}
