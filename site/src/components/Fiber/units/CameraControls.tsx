import React, { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'



export const CameraControls: React.FC = () => {
  const controlsRef = useRef<OrbitControlsType>(null)

  useEffect(() => {
    const controls = controlsRef.current
    
    if (!controls)
      return

    controls.target.set(0, 0, 0)
    controls.object.position.set(0, 0, -.25)
    // controls.
    controls.update()
  }, [])

  return (
    <OrbitControls ref={controlsRef as any} />
  )
}
