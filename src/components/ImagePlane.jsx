/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useTexture } from "@react-three/drei";
import { Plane } from "./ProjectsPlane";

// HOC to add iamge texture to plane
export const ImagePlane = (props) => {
  const imageMaterial = useTexture(props.material);

  const imageMaterialMemo = useMemo(
    () => ({ map: imageMaterial }),
    [imageMaterial]
  );

  return <Plane {...props} material={imageMaterialMemo} />;
};

ImagePlane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  material: PropTypes.string,
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  args: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  fog: PropTypes.bool,
};
