/* eslint-disable react/no-unknown-property */
import { memo, useRef } from "react";
import PropTypes from "prop-types";
import { PlaneGeometry } from "three";
import { useFrame } from "@react-three/fiber";
import { useScrollContext } from "../lib/providers/ScrollProvider";

const GEO_CACHE = new Map();
const getPlaneGeo = (args) => {
  const key = args.join("x");
  if (!GEO_CACHE.has(key)) {
    // increase segments for smooth waves
    GEO_CACHE.set(key, new PlaneGeometry(...args));
  }
  return GEO_CACHE.get(key);
};

export const Plane = memo(function Plane({
  position,
  material,
  args,
  scaleX,
  scaleY,
  animationDelay,
  fog = true,
}) {
  const { scroll } = useScrollContext();

  const matRef = useRef();
  const currentBend = useRef(0);
  useFrame(({ clock }) => {
    const shader = matRef.current?.userData.shader;
    if (!shader) return;
    if (animationDelay) {
      shader.uniforms.uTime.value = clock.getElapsedTime() + animationDelay;
    } else {
      shader.uniforms.uTime.value = clock.getElapsedTime();
    }
    const targetBend = scroll.influence * scroll.direction; // raw target
    // smooth lerp (0.1 = 10% per frame, adjust for responsiveness)
    currentBend.current += (targetBend - currentBend.current) * 0.1;

    shader.uniforms.uScrollInfluence.value = Math.abs(currentBend.current);
    shader.uniforms.uScrollDir.value = Math.sign(currentBend.current);
  });

  return (
    <group position={position} scale={[scaleX, scaleY, 1]}>
      <mesh geometry={getPlaneGeo(args)}>
        <meshBasicMaterial
          {...material}
          ref={matRef}
          fog={fog}
          toneMapped={false}
          onBeforeCompile={(shader) => {
            matRef.current.userData.shader = shader;

            shader.uniforms.uTime = { value: 0 };
            shader.uniforms.uAmplitude = { value: 0.5 };
            shader.uniforms.uFrequency = { value: 0.25 };
            shader.uniforms.uSpeed = { value: 1.6 };
            shader.uniforms.uScrollInfluence = { value: 0 };
            shader.uniforms.uScrollDir = { value: 0 };

            shader.vertexShader = `
              uniform float uTime;
              uniform float uAmplitude;
              uniform float uFrequency;
              uniform float uSpeed;
              uniform float uScrollInfluence;
              uniform float uScrollDir;
              varying float vWave;
              ${shader.vertexShader}
            `;

            // Waves plane
            shader.vertexShader = shader.vertexShader.replace(
              "#include <begin_vertex>",
              `
                #include <begin_vertex>
                float phase = (position.x * 0.8 + position.y * 0.6) * uFrequency;
                float wave = sin(phase + uTime * uSpeed) * uAmplitude;
                transformed.z += wave;
                vWave = wave;

                
                float strength = pow(uScrollInfluence, 0.6); // raises small scrolls, dampens large spikes
                float scrollBend = strength * 0.3 * uScrollDir;

                float easedBendZ = mix(0.0, scrollBend * position.y, 0.3);
                float easedBendX = mix(0.0, scrollBend * 0.5, 0.6);
                
                transformed.z += easedBendZ;
                transformed.x += easedBendX;
              `
            );

            shader.fragmentShader = `
            varying float vWave;
            uniform float uAmplitude;
            ${shader.fragmentShader}
          `;

            // Adds highlight
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <map_fragment>",
              `
                #include <map_fragment>
                // normalize wave to 0..1
                float nw = (vWave + uAmplitude) / (4.0 * uAmplitude);
                // narrower highlight with smooth fade at edges
                float shine = smoothstep(0.45, 0.55, nw) - smoothstep(0.5, 0.55, nw);
                shine *= 0.12; // intensity
                vec3 highlight = vec3(1.0, 0.92, 0.82);
                diffuseColor.rgb += shine * highlight;
              `
            );
          }}
        />
      </mesh>
    </group>
  );
});

Plane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.object.isRequired,
  args: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  fog: PropTypes.bool,
  animationDelay: PropTypes.number,
};
