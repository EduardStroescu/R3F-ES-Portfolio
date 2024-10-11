import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export function useResizableHtml() {
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Set scale based on height: larger height results in a smaller scale
    const heightFactor = 1 / (size.height / 1500);

    // Ensure the scale doesn't go below or above certain thresholds
    const newScale = Math.max(1.8, Math.min(5, heightFactor));
    setScale(newScale);
  }, [size.height]);

  return { scale, viewport };
}
