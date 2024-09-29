import { useEffect, useState } from "react";
import { VideoPlane } from "./VideoPlane";
import PropTypes from "prop-types";

export function DelayedPlane({ delay = 0, ...props }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return shouldRender ? <VideoPlane {...props} /> : null;
}

DelayedPlane.propTypes = {
  delay: PropTypes.number,
};
