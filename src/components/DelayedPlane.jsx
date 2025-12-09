import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ImagePlane } from "./ImagePlane";
import { VideoPlane } from "./VideoPlane";

export const DelayedPlane = ({
  isPlaneInView = false,
  visibilityDelay = 0,
  type,
  ...props
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isPlaneInView) return;
    if (visibilityDelay === 0) {
      setShouldRender(true);
      return;
    }

    const timeoutId = setTimeout(() => setShouldRender(true), visibilityDelay);
    return () => void clearTimeout(timeoutId);
  }, [isPlaneInView, visibilityDelay]);

  if (!shouldRender) return null;

  return type === "video" ? (
    <VideoPlane {...props} />
  ) : (
    <ImagePlane {...props} />
  );
};

DelayedPlane.propTypes = {
  isPlaneInView: PropTypes.bool,
  visibilityDelay: PropTypes.number,
  type: PropTypes.oneOf(["image", "video"]),
};
