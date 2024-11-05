import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useUpdateRouterStatePrevLocation() {
  const location = useLocation();

  // Update location.state.prevPathname to maintain route history
  useEffect(() => {
    if (!location.state) {
      location.state = { prevPathname: location.pathname };
    }
  }, [location, location.state]);
}
