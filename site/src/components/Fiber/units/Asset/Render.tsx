import { FC, useMemo, useEffect, useState } from 'react'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'

import { AssetRenderData } from './Types'


export const AssetRender: FC<AssetRenderData> = ({
  asset: _asset,
  onClick
}) => {
  const asset = useMemo(() => useLoader(GLTFLoader, _asset.model_path), [_asset])
  const assetAnimations = useAnimations(asset.animations, asset.scene)
  const [playedOnce, setPlayedOnce] = useState(false)

  useEffect(() => {
    assetAnimations.names.forEach(actionName => {
      const action = assetAnimations.actions[actionName]

      if (action) {
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
      }
    })
  }, [assetAnimations.actions, assetAnimations.names])

  const [playBackward, setPlayBackward] = useState(false)

  const playAnimations = () => {
    assetAnimations.names.forEach(actionName => {
      const action = assetAnimations.actions[actionName]
      if (action && !action.isRunning()) {
        action.reset()
        if (playBackward) {
          action.timeScale = -1
          action.time = action.getClip().duration
        } else {
          action.timeScale = 1
          action.time = 0
        }
        action.play()
        setPlayBackward(!playBackward)
      }
    })
  }
  
  return (
    <primitive
      object={asset.scene}
      onClick={() => {
        onClick?.()
        if (!playedOnce) {
          playAnimations()
          setPlayedOnce(true)
        }
      }}
    />
  )
}
