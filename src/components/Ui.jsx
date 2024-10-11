import { lazy, Suspense, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { a, useSpring } from "@react-spring/web";
import {
  useAboutStore,
  useAboutStoreActions,
} from "../lib/stores/useAboutStore";
import {
  useContactStore,
  useContactStoreActions,
} from "../lib/stores/useContactStore";
import { useSoundStoreActions } from "../lib/stores/useSoundStore";
import { HamburgerButton } from "./HamburgerButton";

const AudioButton = lazy(() => import("./AudioButton"));
const NotificationSection = lazy(() => import("./NotificationSection"));

const navItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
];

export default function Ui() {
  return (
    <div className="relative w-full h-full z-50">
      <DesktopHeader />
      <MobileHeader />
      <aside className="flex justify-end items-end">
        <Suspense fallback={null}>
          <AudioButton />
        </Suspense>
        <Suspense fallback={null}>
          <NotificationSection />
        </Suspense>
      </aside>
    </div>
  );
}

function DesktopHeader() {
  const location = useLocation();
  const {
    playHoverSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
  } = useSoundStoreActions();

  const flipped = useContactStore((state) => state.flipped);

  const visible = useAboutStore((state) => state.visible);
  const { setFlipped } = useContactStoreActions();
  const { setVisible } = useAboutStoreActions();

  const handleAboutClick = () => {
    setFlipped(false);
    if (location.pathname === "/projects" || location.pathname === "/contact") {
      setTimeout(() => {
        setVisible((prev) => !prev);
        playMenuOpenCloseSound();
      }, 800);
      if (location.pathname === "/projects") {
        playUnderwaterTransitionSound();
      }
    } else {
      setVisible((prev) => !prev);
      playMenuOpenCloseSound();
    }
    flipped && playMenuFlipSound();
  };

  const handleLinkClick = (newLocation) => {
    switch (newLocation) {
      case "/about":
        handleAboutClick();
        break;
      case "/projects":
        setVisible(false);
        setFlipped(false);
        visible && playMenuOpenCloseSound();
        flipped && playMenuFlipSound();
        location.pathname !== "/projects" && playUnderwaterTransitionSound();
        break;
      case "/contact":
        setVisible(false);
        setFlipped(false);
        visible && playMenuOpenCloseSound();
        flipped && playMenuFlipSound();
        if (location.pathname === location.state.data) return;
        location.pathname !== "/projects"
          ? playTransitionSound()
          : playUnderwaterTransitionSound();
        break;
      default:
        null;
    }
  };

  return (
    <nav className="hidden text-white text-xl w-full pt-6 px-4 sm:px-8 sm:flex flex-row justify-between items-center">
      <Link
        to="/"
        state={{ data: location.pathname }}
        onClick={() => {
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          location.pathname === "/contact" && playTransitionSound();
          location.pathname === "/projects" && playUnderwaterTransitionSound();
        }}
        onPointerEnter={playHoverSound}
        className="text-4xl"
      >
        <span className="font-semibold">Eduard</span>Stroescu
      </Link>
      <div className="w-full flex justify-end items-center overflow-hidden font-bold">
        {navItems.slice(1).map((navItem) => (
          <NavLink
            key={navItem.title}
            to={navItem.path === "/about" ? "/" : navItem.path}
            state={{ data: location.pathname }}
            className={({ isActive }) =>
              (isActive && navItem.path !== "/about") ||
              (visible && navItem.path === "/about")
                ? "font-bold relative inline-block text-[#f597e8] italic text-2xl py-0.5 mx-2 group"
                : "relative inline-block text-white hover:text-[#f597e8] hover:italic hover:text-2xl py-0.5 mx-2 group"
            }
            onClick={() => handleLinkClick(navItem.path)}
            onPointerEnter={playHoverSound}
          >
            {navItem.title}
            <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </NavLink>
        ))}
        <button
          onClick={() =>
            window.open(
              import.meta.env.VITE_RESUME_URL,
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="relative inline-block text-white hover:text-[#f597e8] hover:italic hover:text-2xl py-0.5 mx-2 group"
        >
          Resume
          <span className="absolute left-0 w-full h-[2px] bottom-0 bg-[#f597e8] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </button>
      </div>
    </nav>
  );
}

function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    playHoverSound,
    playTransitionSound,
    playMenuOpenCloseSound,
    playMenuFlipSound,
    playUnderwaterTransitionSound,
  } = useSoundStoreActions();

  const flipped = useContactStore((state) => state.flipped);

  const visible = useAboutStore((state) => state.visible);
  const { setFlipped } = useContactStoreActions();
  const { setVisible } = useAboutStoreActions();

  const handleAboutClick = () => {
    setFlipped(false);
    if (location.pathname === "/projects" || location.pathname === "/contact") {
      setTimeout(() => {
        setVisible((prev) => !prev);
        playMenuOpenCloseSound();
      }, 800);
      if (location.pathname === "/projects") {
        playUnderwaterTransitionSound();
      }
    } else {
      setVisible((prev) => !prev);
      playMenuOpenCloseSound();
    }
    flipped && playMenuFlipSound();
  };

  const handleLinkClick = (newLocation) => {
    setMenuOpen(false);
    playMenuOpenCloseSound();
    setTimeout(() => {
      navigate(newLocation === "/about" ? "/" : newLocation, {
        state: { data: location.pathname },
      });
      switch (newLocation) {
        case "/":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          location.pathname === "/contact" && playTransitionSound();
          location.pathname === "/projects" && playUnderwaterTransitionSound();
          break;
        case "/about":
          handleAboutClick();
          break;
        case "/projects":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          location.pathname !== "/projects" && playUnderwaterTransitionSound();
          break;
        case "/contact":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          if (location.pathname === location.state.data) return;
          location.pathname !== "/projects"
            ? playTransitionSound()
            : playUnderwaterTransitionSound();
          break;
        default:
          null;
      }
    }, 500);
  };

  const { clipPath } = useSpring({
    clipPath: menuOpen ? "circle(128.8% at 91% 9%)" : "circle(0.0% at 100% 0%)",
    config: { mass: 5, tension: 400, friction: 70, precision: 0.0001 },
  });

  return (
    <nav
      style={{ fontFamily: "serif" }}
      className="sm:hidden relative text-white text-xl w-full py-4 flex flex-row justify-center items-center"
    >
      <Link
        to="/"
        state={{ data: location.pathname }}
        onClick={() => {
          setMenuOpen(false);
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          location.pathname === "/contact" && playTransitionSound();
          location.pathname === "/projects" && playUnderwaterTransitionSound();
        }}
        onPointerEnter={playHoverSound}
        className="text-2xl z-50"
      >
        <span className="font-semibold">Eduard</span>Stroescu
      </Link>
      <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <a.aside
        style={{ clipPath }}
        className="absolute inset-0 z-[49] bg-[#f1edeb] w-full h-[100dvh]"
      >
        <div className="relative w-full h-full flex flex-col justify-center">
          <ul className="flex flex-col gap-6 w-full justify-center items-center text-[#212121] text-6xl tracking-widest">
            {navItems.map((navItem) => (
              <li key={navItem.title}>
                <button
                  onClick={() => handleLinkClick(navItem.path)}
                  onPointerEnter={playHoverSound}
                  className={`${
                    (!visible && location.pathname === navItem.path) ||
                    (visible && navItem.path === "/about")
                      ? "italic underline"
                      : ""
                  } underline-offset-4 decoration-4`}
                >
                  {navItem.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="absolute w-full gap-4 flex justify-around bottom-6 left-0 px-4 text-black text-xl">
            <a href={`mailto:${import.meta.env.VITE_OWNER_EMAIL}`}>
              {import.meta.env.VITE_OWNER_EMAIL}
            </a>
            <button
              onClick={() =>
                window.open(
                  import.meta.env.VITE_RESUME_URL,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Resume
            </button>
          </div>
        </div>
      </a.aside>
    </nav>
  );
}
