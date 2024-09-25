import { useState, useEffect } from "react";

export function useWindowVisibility() {
  const [isWindowActive, setIsWindowActive] = useState(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsWindowActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isWindowActive;
}
