const vertexShader = `
varying vec2 vUv;
varying vec4 vUv2;

void main() {
    vUv = uv;
    vUv2 = vec4(position, 1.0);
    gl_Position = vec4(position, 1.0);
}
`

export default vertexShader
