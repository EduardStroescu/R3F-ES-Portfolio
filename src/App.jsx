import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { SoundContextProvider } from "./lib/providers/SoundContextProvider";
import LoadingScreen from "./components/LoadingScreen";
import Experience from "./components/Experience";
import Camera from "./components/Camera";
import Ui from "./components/Ui";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Update location.state.data to maintain route history
  useEffect(() => {
    if (!location.state) {
      location.state = { data: location.pathname };
    }
  }, [location, location.state]);

  return (
    <SoundContextProvider>
      <Suspense fallback={null}>
        <main id="canvas">
          <Canvas
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
        </main>
      </Suspense>
      <Ui />
      <LoadingScreen />
    </SoundContextProvider>
  );
}

export default App;
