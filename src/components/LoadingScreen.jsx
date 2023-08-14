import { useProgress } from "@react-three/drei";
import { useSpring, a } from "@react-spring/web";
import { useAppContext } from "./AppContextProvider.jsx";

export default function LoadingScreen({ started, onStarted }) {
  const { progress, total, loaded } = useProgress();
  const { playAmbientSound, playHoverSound } = useAppContext();
  const totalProgress = loaded * 10;

  const loadingTextAnimation1 = useSpring({
    from: { opacity: 1 },
    to: { opacity: totalProgress >= 90 ? 0 : 1 },
    config: { mass: 5, tension: 500, friction: 80 }, // Duration in milliseconds
  });

  const loadingTextAnimation2 = useSpring({
    from: { opacity: 0, pointerEvents: "none" },
    to: {
      opacity: totalProgress >= 100 ? 1 : 0,
      pointerEvents: totalProgress >= 100 ? "auto" : "none",
    },
    config: { mass: 1, tension: 500, friction: 60 },
    delay: 1500,
  });

  return (
    <div
      className={`titleColor loadingScreen ${
        started ? "loadingScreen--started" : ""
      }`}
    >
      <a.div
        className="loadingBg absolute w-screen h-screen bg-gradient-to-t from-[#11e8bb] to-[#8200c9]
        "
        // backdrop-blur-[7.4px] blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)]
      />
      <div className=" loadingScreen__board w-full h-full text-center flex flex-col justify-between items-center z-[1]">
        <div className="loadingScreen__title text-[5rem] pt-2 lg:pt-8">
          <h1>E/S</h1>
          <h1 className="mt-[-4%]">Portofolio</h1>
        </div>
        <div className="h-1/3 w-full flex justify-center items-center">
          <div className="spinner-box">
            <div className="configure-border-1">
              <div className="configure-border-2">
                <div className="configure-border-2">
                  <div className="configure-border-1">
                    <div className="spinner-box">
                      <div className="circle-border">
                        <div className="circle-core"></div>
                        <div className="spinner-box">
                          <div className="circle-border">
                            <div className="circle-core" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="configure-core" />
                  </div>
                </div>
              </div>
            </div>
            <div className="configure-border-2">
              <div className="configure-border-3">
                <div className="configure-core" />
              </div>
            </div>
            <div className="circle-border2">
              <div className="circle-core"></div>
            </div>
          </div>
          <div className="loadingText absolute">
            <button
              className="loadingScreen__button flex justify-center items-center text-3xl font-bold text-white "
              disabled={totalProgress < 100}
              onClick={onStarted}
            >
              <a.p
                style={loadingTextAnimation1}
                className="absolute pointer-events-none"
              >
                Loading
              </a.p>
              <a.p
                style={loadingTextAnimation2}
                className="absolute"
                onClick={() => {
                  playAmbientSound();
                  playHoverSound();
                }}
              >
                Enter
              </a.p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
