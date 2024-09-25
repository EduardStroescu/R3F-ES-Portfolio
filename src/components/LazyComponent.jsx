import { forwardRef, Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ManualLazyComponent = forwardRef(
  ({ delay, loadComponent, shouldLoad, ...props }, ref) => {
    const [Component, setComponent] = useState(null);

    useEffect(() => {
      let timer;

      if (shouldLoad && !Component) {
        timer = setTimeout(() => {
          // Call the passed `loadComponent` function which does the dynamic import
          loadComponent().then((module) => setComponent(() => module.default));
        }, delay);
      }

      return () => timer && clearTimeout(timer); // Cleanup timer on unmount
    }, [Component, delay, loadComponent, shouldLoad]);

    if (!Component) return null;

    return (
      <Suspense fallback={null}>
        <Component ref={ref} {...props} />
      </Suspense>
    );
  }
);

// Add a display name for better debugging and tooling
ManualLazyComponent.displayName = "ManualLazyComponent";

ManualLazyComponent.propTypes = {
  delay: PropTypes.number.isRequired,
  loadComponent: PropTypes.func.isRequired,
  shouldLoad: PropTypes.bool.isRequired,
};
