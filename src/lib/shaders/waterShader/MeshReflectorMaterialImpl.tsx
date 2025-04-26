import { Matrix4, MeshStandardMaterial, Texture } from "three";

type UninitializedUniform<Value> = { value: Value | null };

export class MeshReflectorMaterial extends MeshStandardMaterial {
  private _tDepth: UninitializedUniform<Texture> = { value: null };
  private _distortionMap: UninitializedUniform<Texture> = { value: null };
  private _tDiffuse: UninitializedUniform<Texture> = { value: null };
  private _tDiffuseBlur: UninitializedUniform<Texture> = { value: null };
  private _textureMatrix: UninitializedUniform<Matrix4> = { value: null };
  private _hasBlur: { value: boolean } = { value: false };
  private _mirror: { value: number } = { value: 0.0 };
  private _mixBlur: { value: number } = { value: 0.0 };
  private _blurStrength: { value: number } = { value: 0.5 };
  private _minDepthThreshold: { value: number } = { value: 0.9 };
  private _maxDepthThreshold: { value: number } = { value: 1 };
  private _depthScale: { value: number } = { value: 0 };
  private _depthToBlurRatioBias: { value: number } = { value: 0.25 };
  private _distortion: { value: number } = { value: 1 };
  private _mixContrast: { value: number } = { value: 1.0 };
  private _time: { value: number } = { value: 0.0 };
  private _amount: { value: number } = { value: 0.0 };
  private _mapp: UninitializedUniform<Texture> = { value: null };

  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
  }
  onBeforeCompile(shader) {
    if (!shader.defines?.USE_UV) {
      shader.defines.USE_UV = "";
    }
    shader.uniforms.mapp = this._mapp;
    shader.uniforms.amount = this._amount;
    shader.uniforms.time = this._time;
    shader.uniforms.hasBlur = this._hasBlur;
    shader.uniforms.tDiffuse = this._tDiffuse;
    shader.uniforms.tDepth = this._tDepth;
    shader.uniforms.distortionMap = this._distortionMap;
    shader.uniforms.tDiffuseBlur = this._tDiffuseBlur;
    shader.uniforms.textureMatrix = this._textureMatrix;
    shader.uniforms.mirror = this._mirror;
    shader.uniforms.mixBlur = this._mixBlur;
    shader.uniforms.mixStrength = this._blurStrength;
    shader.uniforms.minDepthThreshold = this._minDepthThreshold;
    shader.uniforms.maxDepthThreshold = this._maxDepthThreshold;
    shader.uniforms.depthScale = this._depthScale;
    shader.uniforms.depthToBlurRatioBias = this._depthToBlurRatioBias;
    shader.uniforms.distortion = this._distortion;
    shader.uniforms.mixContrast = this._mixContrast;
    shader.vertexShader = `
        uniform float time;
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
        varying vec4 myy_vUv;
        uniform sampler2D mapp;
        uniform float amount;
        varying float vDisplace;

        float random (in vec2 _st) {
            return fract(sin(dot(_st.xy,
                                 vec2(12.9898,78.233)))*
                43758.5453123);
        }
        
        // Based on Morgan McGuire @morgan3d
        // https://www.shadertoy.com/view/4dS3Wd
        float noise (in vec2 _st) {
            vec2 i = floor(_st);
            vec2 f = fract(_st);
        
            // Four corners in 2D of a tile
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
        
            vec2 u = f * f * (3.0 - 2.0 * f);
        
            return mix(a, b, u.x) +
                    (c - a)* u.y * (1.0 - u.x) +
                    (d - b) * u.x * u.y;
        }
        
        #define NUM_OCTAVES 5
        
        float fbm ( in vec2 _st) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            // Rotate to reduce axial bias
            mat2 rot = mat2(cos(0.5), sin(0.5),
                            -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(_st);
                _st = rot * _st * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }
      ${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <project_vertex>",
      `#include <project_vertex>
          my_vUv = textureMatrix * vec4( position, 1.0 );
          myy_vUv = vec4( position, 1.0 );
    
    vec3 pos = position;
    pos.z += 0.1 * sin(0.5- pos.x * 1.0 + time * 2.);

    float displace = texture2D(mapp, uv).r;
      vDisplace = displace;


    float xDisplacement = 0.05 * fbm(vec2(pos.x * 1.0 + time * 1.0, time));
    float yDisplacement = 0.1 * fbm(vec2(pos.y * 0.1 + time * 0.2, time));
    
    pos.z += xDisplacement;
    pos.z += yDisplacement;
    pos.z += displace * amount;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);`
    );
    shader.fragmentShader = `
        uniform float time;
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        varying vec4 myy_vUv;
        varying float vDisplace;
        ${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      vec4 final_vUv = myy_vUv/16.0;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      vec4 newMergee = vec4(0.0, 0.0, 0.0, 1.0);

      for (int i=1; i<int(4.0); i++)
{
final_vUv.x += 0.7/float(i)*sin(float(i)*3.0*final_vUv.y+time*1.1);
final_vUv.y += 0.7/float(i)*cos(float(i)*3.0*final_vUv.x+time*1.1);
final_vUv.x -= vDisplace;
final_vUv.y -= vDisplace;
}

float r = sin(final_vUv.z-final_vUv.x-2.0)+cos(final_vUv.x-final_vUv.y)*0.-0.5;
float g = sin(final_vUv.x+final_vUv.y+1.0)*0.5+0.2;
float b = (sin(final_vUv.x+final_vUv.y)+cos(final_vUv.x+final_vUv.y))/2.8+1.1;
r -= sin(vDisplace);
g -= sin(vDisplace);
b -= sin(vDisplace);


      newMergee.r = (merge.r - 2.5) * mixContrast + 1.;
      newMergee.g = (merge.g - 1.5) * mixContrast + 1.;
      newMergee.b = (merge.b - 1.8) * mixContrast - 0.7;

      

      newMergee.r += r + 0.5;
      newMergee.g += g + 0.5;
      newMergee.b += b + 2.0;


      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;


    newMerge.rgb += newMergee.rgb;


      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `
    );
  }
  get tDiffuse(): Texture | null {
    return this._tDiffuse.value;
  }
  set tDiffuse(v: Texture | null) {
    this._tDiffuse.value = v;
  }
  get tDepth(): Texture | null {
    return this._tDepth.value;
  }
  set tDepth(v: Texture | null) {
    this._tDepth.value = v;
  }
  get distortionMap(): Texture | null {
    return this._distortionMap.value;
  }
  set distortionMap(v: Texture | null) {
    this._distortionMap.value = v;
  }
  get tDiffuseBlur(): Texture | null {
    return this._tDiffuseBlur.value;
  }
  set tDiffuseBlur(v: Texture | null) {
    this._tDiffuseBlur.value = v;
  }
  get textureMatrix(): Matrix4 | null {
    return this._textureMatrix.value;
  }
  set textureMatrix(v: Matrix4 | null) {
    this._textureMatrix.value = v;
  }
  get hasBlur(): boolean {
    return this._hasBlur.value;
  }
  set hasBlur(v: boolean) {
    this._hasBlur.value = v;
  }
  get mirror(): number {
    return this._mirror.value;
  }
  set mirror(v: number) {
    this._mirror.value = v;
  }
  get mixBlur(): number {
    return this._mixBlur.value;
  }
  set mixBlur(v: number) {
    this._mixBlur.value = v;
  }
  get mixStrength(): number {
    return this._blurStrength.value;
  }
  set mixStrength(v: number) {
    this._blurStrength.value = v;
  }
  get minDepthThreshold(): number {
    return this._minDepthThreshold.value;
  }
  set minDepthThreshold(v: number) {
    this._minDepthThreshold.value = v;
  }
  get maxDepthThreshold(): number {
    return this._maxDepthThreshold.value;
  }
  set maxDepthThreshold(v: number) {
    this._maxDepthThreshold.value = v;
  }
  get depthScale(): number {
    return this._depthScale.value;
  }
  set depthScale(v: number) {
    this._depthScale.value = v;
  }
  get depthToBlurRatioBias(): number {
    return this._depthToBlurRatioBias.value;
  }
  set depthToBlurRatioBias(v: number) {
    this._depthToBlurRatioBias.value = v;
  }
  get distortion(): number {
    return this._distortion.value;
  }
  set distortion(v: number) {
    this._distortion.value = v;
  }
  get mixContrast(): number {
    return this._mixContrast.value;
  }
  set mixContrast(v: number) {
    this._mixContrast.value = v;
  }
  get time() {
    return this._time.value;
  }

  set time(v) {
    this._time.value = v;
  }
  get mapp(): Texture | null {
    return this._mapp.value;
  }
  set mapp(v: Texture | null) {
    this._mapp.value = v;
  }
  get amount() {
    return this._amount.value;
  }

  set amount(v) {
    this._amount.value = v;
  }
}

export type MeshReflectorMaterialProps = {
  mixBlur: number;
  mixStrength: number;
  mirror: number;
  textureMatrix: Matrix4;
  tDiffuse: Texture;
  distortionMap?: Texture;
  tDiffuseBlur: Texture;
  hasBlur: boolean;
  time: number;
  minDepthThreshold: number;
  maxDepthThreshold: number;
  depthScale: number;
  depthToBlurRatioBias: number;
  distortion: number;
  mixContrast: number;
  mapp?: Texture;
  amount: number;
} & JSX.IntrinsicElements["meshStandardMaterial"];
