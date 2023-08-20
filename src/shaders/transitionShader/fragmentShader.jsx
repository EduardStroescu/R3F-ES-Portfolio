const fragmentShader = `
  varying vec2 vUv;
  varying vec4 vUv2;

  uniform sampler2D textureA;
  uniform sampler2D textureB;
  uniform float uProgress;
  uniform float uTime;
  uniform sampler2D uNoise;

  vec2 mirrored(vec2 v) {
  vec2 m = mod(v, 2.0);
  return mix(m, 2.0 - m, step(1.0, m));
}

  void main() {
    vec2 uv = vUv;
    vec4 final_vUv = vUv2 - 4.0;
    
    vec2 noiseUv = vUv + uTime * 0.04;
    noiseUv.x *= 0.1;
    vec4 noise = texture2D(uNoise, mirrored(noiseUv));

    float prog = uProgress - 0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0.0, 1.0, (prog * 2.0 - vUv.y + 0.5))), 20.0);

    vec4 fromColor = texture2D(textureA, (vUv - 0.5) * (1.0 - intpl) + 0.5);
    vec4 toColor = texture2D(textureB, (vUv - 0.5) * intpl + 0.5);

  gl_FragColor = mix(fromColor, toColor, intpl);
}
`;

export default fragmentShader;
