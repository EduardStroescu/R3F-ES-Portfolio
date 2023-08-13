// import { Canvas } from "@react-three/fiber";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { AppContextProvider } from "./AppContextProvider";
// import Experience from "./Experience";
// import Camera from "./Camera.jsx";
// import Ui from "./ui";

// export default function Home({ start }) {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/R3F-ES-Portofolio" exact Component={null} />
//           <Route path="/R3F-ES-Portofolio/about" Component={null} />
//           <Route path="/R3F-ES-Portofolio/contact" Component={null} />
//           <Route path="/R3F-ES-Portofolio/projects" Component={null} />
//         </Routes>
//         <AppContextProvider>
//           <div id="canvas">
//             <Canvas
//               legacy
//               linear
//               flat
//               dpr={[1, 1.5]}
//               gl={{ alpha: false, antialias: false }}
//               // camera={{ near: 0.01, far: 1000, position: [15, 10, 60] }}
//             >
//               <Camera position={[5, 0, 26]} />
//               <Experience start={start} />
//             </Canvas>
//           </div>
//           <Ui className="w-full" />
//         </AppContextProvider>
//       </BrowserRouter>
//     </>
//   );
// }
