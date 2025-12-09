import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = (touch.clientY / window.innerHeight) * 2 - 1;
    };

    const canvas = document.getElementById("canvas");

    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return mousePosition;
}
