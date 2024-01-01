import LogoSvg from "/logo/EsLogo.svg";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "./AppContextProvider.jsx";
import { useSoundContext } from "./SoundContextProvider.jsx";
import { a, useTransition } from "@react-spring/web";
import { AudioButton } from "./AudioButton.jsx";
import { FailIcon, SuccessIcon } from "./Icons.jsx";

export default function Ui() {
  const {
    location,
    flipped,
    setFlipped,
    visible,
    setVisible,
    isMessageSent,
    isMessageReceived,
  } = useAppContext();
  const {
    playHoverSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
    switchAudio,
    isAudioEnabled,
    setAudioEnabled,
  } = useSoundContext();

  const notificationTransition = useTransition(isMessageSent, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 50 },
    leave: { opacity: 0, height: 0 },
    config: { mass: 10, tension: 500, friction: 100 },
  });

  return (
    <div className="w-full h-full">
      <header className="text-white text-xl z-2 w-full pt-6 p-4 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            state={{ data: location.pathname }}
            onClick={() => {
              setVisible(false);
              setFlipped(false);
              visible ? playMenuOpenCloseSound() : null;
              flipped ? playMenuFlipSound() : null;
              location.pathname === "/contact" ? playTransitionSound() : null;
              location.pathname === "/projects"
                ? playUnderwaterTransitionSound()
                : null;
            }}
            onPointerEnter={playHoverSound}
          >
            <img src={LogoSvg} alt="ES Logo" width={80} height={100} />
          </Link>
        </div>
        <div className="w-full flex justify-end items-center">
          <nav className="overflow-hidden">
            <div className="font-bold">
              <NavLink
                to="/"
                state={{ data: location.pathname }}
                className={
                  visible
                    ? "font-bold relative inline-block text-[#f597e8] italic text-2xl py-0.5 mx-2 group"
                    : "relative inline-block text-white hover:text-[#f597e8] hover:italic hover:text-2xl py-0.5 mx-2 group"
                }
                onClick={() => {
                  setVisible((state) => !state);
                  setFlipped(false);
                  location.pathname === "/projects"
                    ? setTimeout(() => {
                        playMenuOpenCloseSound();
                      }, 1000)
                    : playMenuOpenCloseSound();
                  flipped ? playMenuFlipSound() : null;
                  location.pathname === "/projects"
                    ? playUnderwaterTransitionSound()
                    : null;
                }}
                onPointerEnter={playHoverSound}
              >
                About
                <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </NavLink>
              <NavLink
                to="/projects"
                state={{ data: location.pathname }}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold relative inline-block text-[#f597e8] italic text-2xl py-0.5 mx-2 group"
                    : "relative inline-block text-white hover:text-[#f597e8] hover:italic hover:text-2xl py-0.5 mx-2 group"
                }
                onClick={() => {
                  setVisible(false);
                  setFlipped(false);
                  visible ? playMenuOpenCloseSound() : null;
                  flipped ? playMenuFlipSound() : null;
                  location.pathname === "/" || location.pathname === "/contact"
                    ? playUnderwaterTransitionSound()
                    : null;
                }}
                onPointerEnter={playHoverSound}
              >
                Projects
                <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </NavLink>
              <NavLink
                to="/contact"
                state={{ data: location.pathname }}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold relative inline-block text-[#f597e8] italic text-2xl py-0.5 mx-2 group"
                    : "relative inline-block text-white hover:text-[#f597e8] hover:italic hover:text-2xl py-0.5 mx-2 group"
                }
                onClick={() => {
                  setVisible(false);
                  setFlipped(false);
                  visible ? playMenuOpenCloseSound() : null;
                  flipped ? playMenuFlipSound() : null;
                  location.pathname === "/" ? playTransitionSound() : null;
                  location.pathname === "/projects"
                    ? playUnderwaterTransitionSound()
                    : null;
                }}
                onPointerEnter={playHoverSound}
              >
                Contact
                <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
      <footer className="flex justify-end items-end">
        {location.pathname !== "/projects" && (
          <AudioButton
            isAudioEnabled={isAudioEnabled}
            setAudioEnabled={setAudioEnabled}
            switchAudio={switchAudio}
            playHoverSound={playHoverSound}
          />
        )}
        <section className="fixed bottom-0 right-0 p-4">
          {notificationTransition(
            (styles, item) =>
              item && (
                <a.div style={styles}>
                  <div
                    className="p-2 bg-[#220140] items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
                    role="alert"
                  >
                    <span className="flex rounded-full bg-[#410578] uppercase px-2 py-1 text-xs font-bold mr-3">
                      {isMessageReceived ? <SuccessIcon /> : <FailIcon />}
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {isMessageReceived
                        ? "Message Sent"
                        : "Failed: Please try again later"}
                    </span>
                  </div>
                </a.div>
              )
          )}
        </section>
      </footer>
    </div>
  );
}
