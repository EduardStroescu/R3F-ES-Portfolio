import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import LoadingScreen from "./components/LoadingScreen";
import Experience from "./components/Experience";
import Camera from "./components/Camera";
import Ui from "./components/Ui";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollProvider } from "./lib/providers/ScrollProvider";

function App() {
  const location = useLocation();

  // Update location.state.prevPathname to maintain route history
  useEffect(() => {
    if (!location.state) {
      location.state = { prevPathname: location.pathname };
    }
  }, [location, location.state]);

  return (
    <>
      <main id="canvas">
        <ScrollProvider>
          <Suspense fallback={<LoadingScreen suspenseLoading={true} />}>
            <Canvas
              id="canvas"
              linear
              flat
              dpr={[1, 1]}
              gl={{
                alpha: true,
                antialias: false,
                stencil: false,
                depth: false,
                powerPreference: "high-performance",
              }}
            >
              <Camera position={[5, 0, 26]} />
              <Experience />
            </Canvas>
          </Suspense>
        </ScrollProvider>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </main>
      <Ui />
      <LoadingScreen />
    </>
  );
}

export default App;
