import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";

import { AppContextProvider } from "./components/AppContextProvider";
import LoadingScreen from "./components/loadingScreen.jsx";
import Experience from "./components/Experience";
import Camera from "./components/Camera.jsx";
import Ui from "./components/Ui";
import { SoundContextProvider } from "./components/SoundContextProvider.jsx";

function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={null} />
          <Route path="/about" Component={null} />
          <Route path="/contact" Component={null} />
          <Route path="/projects" Component={null} />
        </Routes>
        <AppContextProvider>
          <SoundContextProvider>
            <Suspense fallback={null}>
              <div id="canvas">
                <Canvas
                  linear
                  flat
                  dpr={[1, 1.5]}
                  gl={{ alpha: true, antialias: false }}
                >
                  <Camera position={[5, 0, 26]} />
                  <Experience start={start} />
                </Canvas>
              </div>
            </Suspense>
            <Ui />
            <LoadingScreen started={start} onStarted={() => setStart(true)} />
          </SoundContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
