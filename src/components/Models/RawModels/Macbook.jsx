import React from 'react'
import { useEffect } from "react";
import { Html, useGLTF, useAnimations } from '@react-three/drei'

export function Macbook(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/models/macbook.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions["Animation"]) {
      const action = actions["Animation"]
      const halfway = action.getClip().duration / 2
  
      action.reset().play()
  
      const timeout = setTimeout(() => {
        action.paused = true
        action.setEffectiveTimeScale(0)
        action.time = halfway
        action.play() // Required to render at new time
      }, halfway * 1000)
  
      return () => clearTimeout(timeout)
    }
  }, [actions])

  console.log(nodes.Object_6.geometry)
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 1.8, -0.1, 0.1]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Bevels_2" position={[0, 0.008, -0.104]} scale={0.275}>
                <group name="Empty_1" position={[0, 0.001, 0]} rotation={[-Math.PI, 0, 0]} scale={[-0.039, 0.039, 0.039]}>
                  <group name="Camera_Light_0" position={[0, 0.077, -0.044]} rotation={[-1.192, 0, 0]} scale={[-25.381, 25.381, 25.381]}>
                    <mesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Camera_Light} />
                  </group>
                </group>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Black_Glass} />
                <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials.Black_Plastic} />
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Glass} />
                <mesh geometry={nodes.Object_6.geometry}>
                <Html
                  transform
                  occlude
                  distanceFactor={0.95} // adjust based on camera distance
                  position={[-0.05, -0.002, 0.4]}
                  rotation={[Math.PI / 2, 0, 0]} // tweak slightly if needed
                  style={{
                    pointerEvents: "none", // optional: prevents interaction issues
                  }}
                >
                  <div
                    style={{
                      width: '1400px',
                      height: '800px',
                      overflow: 'hidden',
                      borderRadius: '0.5rem',
                      transform: 'scale(0.3)', // try tweaking scale if needed
                    }}
                  >
                    <iframe
                      src={props.activeProject}
                      width="100%"
                      height="100%"
                      style={{
                        border: 'none',
                        pointerEvents: 'auto', // re-enable interaction for iframe
                      }}
                    />
                  </div>
                </Html>
                </mesh>
                <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.Space_Grey} />
                <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials['Space_Grey.001']} />
              </group>
              <group name="Circle001_12" position={[0.203, 0.008, -0.104]} rotation={[0.011, -0.75, 1.274]} />
              <group name="Caps_Lock_Light_3" position={[0, -0.014, 0]} scale={0.275}>
                <mesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Caps_Lock_Light} />
              </group>
              <group name="Macbook_Pro_4" position={[0, 0.008, -0.104]} rotation={[1.949, 0, 0]} scale={0.275}>
                <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials['Material.001']} />
              </group>
              <group name="Main_Body_5" position={[0, -0.014, 0]} scale={0.275}>
                <mesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.Space_Grey} />
                <mesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials.Black_Plastic} />
                <mesh name="Object_20" geometry={nodes.Object_20.geometry} material={materials.Black_Plastic} />
                <mesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials['Keys.001']} />
              </group>
              <group name="Touch_Bar_6" position={[0, -0.014, 0]} scale={0.275}>
                <mesh name="Object_23" geometry={nodes.Object_23.geometry} material={materials.Black_Plastic} />
                <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials.Black_Glass} />
                <mesh name="Object_25" geometry={nodes.Object_25.geometry} material={materials.Keys} />
              </group>
              <group name="Touch_Bar_Shot_7" position={[0, -0.014, 0]} scale={0.275}>
                <mesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']} />
              </group>
              <group name="Keyboard_8" position={[0, -0.014, 0]} scale={0.275}>
                <mesh name="Object_29" geometry={nodes.Object_29.geometry} material={materials.Black_Plastic} />
                <mesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials.Keys} />
              </group>
              <group name="Cube_9" position={[0, -0.014, 0]}>
                <mesh name="Object_32" geometry={nodes.Object_32.geometry} material={materials.Black_Plastic} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/macbook.glb')
