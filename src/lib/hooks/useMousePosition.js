import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mousePosition.current = { x, y };
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0]; // Use the first touch point
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = (touch.clientY / window.innerHeight) * 2 - 1;
      mousePosition.current = { x, y };
    };

    const canvas = document.getElementById("canvas");

    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove);
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
