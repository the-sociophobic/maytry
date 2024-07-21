import React from 'react'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

import Plane from './units/Plane'
// import { useMainPage } from '../../hooks/useContentful'

import HeroImg from '../../assets/images/hero-image.jpg'


export type FiberSceneProps = {
}


export const FiberScene: React.FC<FiberSceneProps> = ({
}) => {
  // const { data: { } } = useMainPage()

  return (
    <div
      style={{ width: '100%', height: '100vh' }}
      className='mb-5'
    >
      <Canvas>
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
        <Plane img={HeroImg} />
        <ambientLight intensity={1} />
      </Canvas>
    </div>
  )
}
