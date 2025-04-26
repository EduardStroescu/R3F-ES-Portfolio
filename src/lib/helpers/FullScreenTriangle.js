// fullscreenTriangleGeometry.js
import { BufferGeometry, Float32BufferAttribute } from "three";

const geometry = new BufferGeometry();
geometry.setAttribute(
  "position",
  new Float32BufferAttribute(
    [-1.0, -1.0, 0.0, 3.0, -1.0, 0.0, -1.0, 3.0, 0.0],
    3
  )
);
geometry.setAttribute("uv", new Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));

export default geometry;
