import LogoSvg from "/logo/EsLogo.svg";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "./AppContextProvider.jsx";
import { a, useTransition } from "@react-spring/web";

export default function Ui() {
  const {
    location,
    flipped,
    setFlipped,
    visible,
    setVisible,
    isMessageSent,
    isMessageReceived,
    playHoverSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
    switchAudio,
    isAudioEnabled,
    setAudioEnabled,
  } = useAppContext();

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
            <img src={LogoSvg} alt="ES Logo" width={80} />
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
        {location.pathname !== "/projects" ? (
          <section className="tooltipWrapper fixed bottom-6 left-4 ">
            <button
              onClick={() => {
                switchAudio();
                setAudioEnabled((state) => !state);
              }}
              onPointerEnter={playHoverSound}
              className={`icon ${
                isAudioEnabled ? "soundIconEnabled" : "soundIconDisabled"
              }`}
            >
              {isAudioEnabled ? (
                <span className="tooltip audioOn">Toggle all sounds Off</span>
              ) : (
                <span className="tooltip audioOff">Toggle all sounds On</span>
              )}
              <span>
                <svg
                  fill={isAudioEnabled ? "#3ff9dc" : "#fc003f"}
                  width="100%"
                  height="100%"
                  viewBox="0 0 56 56"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z M 25.6327 43.4922 C 24.8593 43.4922 24.3202 42.9531 24.3202 42.2031 L 24.3202 13.7031 C 24.3202 12.9766 24.8827 12.3906 25.6327 12.3906 C 26.3358 12.3906 26.8983 12.9766 26.8983 13.7031 L 26.8983 42.2031 C 26.8983 42.9297 26.3593 43.4922 25.6327 43.4922 Z M 35.1014 40.0937 C 34.3983 40.0937 33.8358 39.5078 33.8358 38.8047 L 33.8358 17.0781 C 33.8358 16.375 34.3983 15.7891 35.1014 15.7891 C 35.8514 15.7891 36.4140 16.3516 36.4140 17.0781 L 36.4140 38.8047 C 36.4140 39.5078 35.8514 40.0937 35.1014 40.0937 Z M 20.8749 37.1172 C 20.1483 37.1172 19.5624 36.5547 19.5624 35.8281 L 19.5624 20.0313 C 19.5624 19.3281 20.1483 18.7656 20.8749 18.7656 C 21.5780 18.7656 22.1405 19.3281 22.1405 20.0313 L 22.1405 35.8281 C 22.1405 36.5547 21.5780 37.1172 20.8749 37.1172 Z M 30.3671 35.2422 C 29.6405 35.2422 29.0780 34.6797 29.0780 33.9766 L 29.0780 21.9062 C 29.0780 21.2031 29.6405 20.6406 30.3671 20.6406 C 31.0936 20.6406 31.6562 21.1797 31.6562 21.9062 L 31.6562 33.9766 C 31.6562 34.7031 31.0936 35.2422 30.3671 35.2422 Z M 39.8827 32.4531 C 39.1562 32.4531 38.5936 31.9140 38.5936 31.1875 L 38.5936 24.6953 C 38.5936 23.9687 39.1562 23.4297 39.8827 23.4297 C 40.6093 23.4297 41.1718 23.9687 41.1718 24.6953 L 41.1718 31.1875 C 41.1718 31.9140 40.6093 32.4531 39.8827 32.4531 Z M 16.0936 31.2813 C 15.3905 31.2813 14.8046 30.7187 14.8046 30.0156 L 14.8046 25.8672 C 14.8046 25.1640 15.3905 24.6016 16.0936 24.6016 C 16.8202 24.6016 17.4062 25.1640 17.4062 25.8672 L 17.4062 30.0156 C 17.4062 30.7187 16.8202 31.2813 16.0936 31.2813 Z"></path>
                  </g>
                </svg>
              </span>
            </button>
          </section>
        ) : null}
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
                      {isMessageReceived ? (
                        <svg
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          width="25.903"
                          height="22.395"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fill="#f597e8"
                              fillRule="evenodd"
                              d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
                            ></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          width="25.903"
                          height="22.395"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fill="#F87171"
                              fillRule="evenodd"
                              d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm12.844-3.707a1 1 0 010 1.414l-2.361 2.362 2.361 2.36a1 1 0 01-1.414 1.415l-2.361-2.361-2.362 2.361a1 1 0 11-1.414-1.414l2.361-2.361-2.361-2.362a1 1 0 011.414-1.414l2.362 2.361 2.36-2.361a1 1 0 011.415 0z"
                            ></path>
                          </g>
                        </svg>
                      )}
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
