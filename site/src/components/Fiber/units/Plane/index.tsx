import { FC } from 'react'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export type PlaneProps = {
  img: string
}


const Plane: FC<PlaneProps> = ({
  img
}) => {
  const loadedTexture = useLoader(TextureLoader, img)

  loadedTexture.wrapS = THREE.RepeatWrapping;
  loadedTexture.wrapT = THREE.RepeatWrapping;
  loadedTexture.repeat.set(1, 1);

  return (
    <mesh scale={[16.8, 8.4, 1]}>
      <planeGeometry/>
      <meshStandardMaterial map={loadedTexture} />
    </mesh>
  )
}


export default Plane
