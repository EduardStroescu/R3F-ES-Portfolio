import LogoSvg from "/logo/EsLogo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { a, useTransition } from "@react-spring/web";
import { AudioButton } from "./AudioButton";
import { FailIcon, SuccessIcon } from "./Icons";
import {
  useAboutStore,
  useAboutStoreActions,
} from "../lib/stores/useAboutStore";
import {
  useContactStore,
  useContactStoreActions,
} from "../lib/stores/useContactStore";
import { useShallow } from "zustand/react/shallow";
import { useSoundStoreActions } from "../lib/stores/useSoundStore";

export default function Ui() {
  const location = useLocation();
  const {
    playHoverSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
  } = useSoundStoreActions();

  const { flipped, messageSent, messageReceived } = useContactStore(
    useShallow((state) => ({
      flipped: state.flipped,
      messageSent: state.messageSent,
      messageReceived: state.messageReceived,
    }))
  );

  const visible = useAboutStore((state) => state.visible);
  const { setFlipped } = useContactStoreActions();
  const { setVisible } = useAboutStoreActions();

  const notificationTransition = useTransition(messageSent, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 50 },
    leave: { opacity: 0, height: 0 },
    config: { mass: 10, tension: 500, friction: 100 },
  });

  const handleAboutClick = () => {
    setFlipped(false);
    if (location.pathname === "/projects" || location.pathname === "/contact") {
      setTimeout(() => {
        setVisible((prev) => !prev);
        playMenuOpenCloseSound();
      }, 1200);
      if (location.pathname === "/projects") {
        playUnderwaterTransitionSound();
      }
    } else {
      setVisible((prev) => !prev);
      playMenuOpenCloseSound();
    }
    flipped && playMenuFlipSound();
  };

  return (
    <div className="relative w-full h-full z-50">
      <header className="text-white text-xl w-full pt-6 px-4 sm:px-8 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            state={{ data: location.pathname }}
            onClick={() => {
              setVisible(false);
              setFlipped(false);
              visible && playMenuOpenCloseSound();
              flipped && playMenuFlipSound();
              location.pathname === "/contact" && playTransitionSound();
              location.pathname === "/projects" &&
                playUnderwaterTransitionSound();
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
                onClick={handleAboutClick}
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
                  visible && playMenuOpenCloseSound();
                  flipped && playMenuFlipSound();
                  location.pathname !== "/projects" &&
                    playUnderwaterTransitionSound();
                }}
                onPointerEnter={playHoverSound}
              >
                Projects
                <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
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
                  visible && playMenuOpenCloseSound();
                  flipped && playMenuFlipSound();
                  location.pathname === "/"
                    ? playTransitionSound()
                    : playUnderwaterTransitionSound();
                }}
                onPointerEnter={playHoverSound}
              >
                Contact
                <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
      <aside className="flex justify-end items-end">
        <AudioButton />
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
                      {messageReceived ? <SuccessIcon /> : <FailIcon />}
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">
                      {messageReceived
                        ? "Message Sent"
                        : "Failed: Please try again later"}
                    </span>
                  </div>
                </a.div>
              )
          )}
        </section>
      </aside>
    </div>
  );
}
