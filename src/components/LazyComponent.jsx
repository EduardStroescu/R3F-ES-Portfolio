import { forwardRef, lazy, memo, Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ManualLazyComponent = memo(
  forwardRef(function ManualLazyComponent(
    { delay, loadComponent, shouldLoad, shouldOuterSuspend = false, ...props },
    ref
  ) {
    const [Component, setComponent] = useState(null);
    const [useOuterSuspense, setUseOuterSuspense] = useState(false);

    useEffect(() => {
      let timer;

      if (shouldLoad && !Component) {
        const load = () => {
          setUseOuterSuspense(shouldOuterSuspend);
          const Lazy = lazy(loadComponent);
          setComponent(() => Lazy);
        };

        if (delay > 0) {
          timer = setTimeout(load, delay);
        } else {
          load();
        }
      }

      return () => void timer && clearTimeout(timer);
    }, [Component, delay, loadComponent, shouldLoad, shouldOuterSuspend]);

    if (!Component) return null;

    if (useOuterSuspense) return <Component ref={ref} {...props} />;

    return (
      <Suspense fallback={null}>
        <Component ref={ref} {...props} />
      </Suspense>
    );
  })
);

ManualLazyComponent.propTypes = {
  delay: PropTypes.number.isRequired,
  loadComponent: PropTypes.func.isRequired,
  shouldLoad: PropTypes.bool.isRequired,
  shouldOuterSuspend: PropTypes.bool,
};
