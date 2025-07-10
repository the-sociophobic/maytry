import { ObjectMap } from '@react-three/fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'


export type AssetData = {
  model_path: string
}

export type AssetRenderData = {
  asset: AssetData
  onClick?: () => void
}

export type GLTF_Type = (GLTF & ObjectMap)
