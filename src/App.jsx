import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Canvas } from "@react-three/fiber";

import { AppContextProvider } from "./components/AppContextProvider";
import LoadingScreen from "./components/loadingScreen.jsx";
import Experience from "./components/Experience";
import Camera from "./components/Camera.jsx";
import Ui from "./components/ui";

function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/R3F-ES-Portofolio" exact Component={null} />
          <Route path="/R3F-ES-Portofolio/about" Component={null} />
          <Route path="/R3F-ES-Portofolio/contact" Component={null} />
          <Route path="/R3F-ES-Portofolio/projects" Component={null} />
        </Routes>
        <AppContextProvider>
          <Suspense fallback={null}>
            <div id="canvas">
              <Canvas
                legacy
                linear
                flat
                dpr={[1, 1.5]}
                gl={{ alpha: false, antialias: false }}
              >
                <Camera position={[5, 0, 26]} />
                <Experience start={start} />
              </Canvas>
            </div>
          </Suspense>
          <Ui className="w-full" />
          <LoadingScreen started={start} onStarted={() => setStart(true)} />
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
