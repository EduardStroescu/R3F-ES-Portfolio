import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Outlet } from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";
import Experience from "./components/Experience";
import Camera from "./components/Camera";
import Ui from "./components/Ui";
import { ScrollProvider } from "./lib/providers/ScrollProvider";
import { useRemoveTrailingSlash } from "./lib/hooks/useRemoveTrailingSlash";
import { useUpdateRouterStatePrevLocation } from "./lib/hooks/useUpdateRouterStatePrevLocation";

function App() {
  useRemoveTrailingSlash();
  useUpdateRouterStatePrevLocation();

  return (
    <>
      <Ui />
      <LoadingScreen />
      <main id="main">
        <ScrollProvider>
          <Suspense fallback={<LoadingScreen suspenseLoading={true} />}>
            <Canvas
              style={{ height: "100dvh", width: "100dvw" }}
              id="canvas"
              linear
              flat
              dpr={[1, 1]}
              gl={{
                alpha: false,
                antialias: false,
                stencil: false,
                depth: false,
                powerPreference: "high-performance",
              }}
            >
              <Camera />
              <Experience />
            </Canvas>
          </Suspense>
        </ScrollProvider>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
