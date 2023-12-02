# Portfolio

## Introduction

Personal portfolio made to seamlessly switch between scenes, providing an immersive user experience through a surrealist home atmosphere.

## Overview

The transitions are implemented by using two portals, the first scene contains the home page and the contact section(at a negative position on the z axis), while the projects page is separated inside its own portal and consists in a timeline progressing by scrolling on the z axis. To switch between the two scenes a transition shader(underwater transition) is used.
I've made use of howlerJS to add 3D spatial sound and make the experience more immersive.
The toasts for the contact form are also implemented without the use of any library to reduce the bundle size and animated using react-spring.

## Technologies Used

- Vite-React
- [Tailwind](https://tailwindcss.com/)
- [threeJS](https://github.com/mrdoob/three.js)
- [react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [react-three/drei](https://github.com/pmndrs/drei)
- [react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)
- [react-spring/web](https://github.com/pmndrs/react-spring)
- [react-router-dom](https://github.com/remix-run/react-router)
- [howler](https://github.com/goldfire/howler.js)
- [emailjs/browser](https://github.com/emailjs-com/emailjs-sdk)
- [formik](https://github.com/jaredpalmer/formik)
- [yup](https://github.com/jquense/yup)
- [uuid](https://github.com/uuidjs/uuid)

```
Remember to update `.env` with your EmailJS token!

Example:

_Provided by EmailJS_

PUBLIC_EMAILJS_SERVICE_ID=""
PUBLIC_EMAILJS_TEMPLATE_ID=""
PUBLIC_EMAILJS_PUBLIC_KEY=""
```

### Installation && Local Development

```bash
git clone https://github.com/EduardStroescu/R3F-ES-Portfolio.git
npm install
npm run dev
```

### To prepare for production/minify

```bash
npm run build
```

## Notes:

I have encountered a few issues due to switching between the postprocessing effects from the first to the second scene, which makes the WebGL context to crash. It seems that the effect composer, at least from my implementation is finicky when used with portals and transition shaders. To achieve more stability and avoid crashes, the timing(increments) of the transition needs to be perfectly fine-tunned, as different timings resulted somewhere from constant crashes to none(also depending on the device used).
The lens flare effect from the projects page is computationally expensive and results in, mainly, older mobile devices(< 2015) failing to render the second scene, this can be avoided by disabling the abovementioned effect. It depends on the webGL precision of the device, the lens flare seems to expect highp precisions.
