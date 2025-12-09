import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { a, useSpring, animated } from "@react-spring/web";
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
import { ManualLazyComponent } from "./LazyComponent";
import AudioButton from "./AudioButton";
import { useAppStore } from "../lib/stores/useAppStore";

const navItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
];

export default function Ui() {
  return (
    <div className="fixed w-full h-full z-50 pointer-events-none">
      <DesktopHeader />
      <MobileHeader />
      <aside className="flex justify-end items-end">
        <AudioButton />
        <NotificationSection />
      </aside>
    </div>
  );
}

const NotificationSection = () => {
  const flipped = useContactStore((state) => state.flipped);
  const started = useAppStore((state) => state.started);

  return (
    <ManualLazyComponent
      shouldLoad={true}
      delay={started && flipped ? 0 : 60000}
      loadComponent={() => import("./NotificationSection")}
    />
  );
};

function DesktopHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const itemRefs = useRef({});

  const [underlineStyle, underlineApi] = useSpring(() => ({
    left: 0,
    width: 0,
    opacity: 1,
    config: { tension: 400, friction: 25, precision: 0.0001 },
  }));

  const moveUnderlineTo = useCallback(
    (el) => {
      if (!el) return;

      const left = el.offsetLeft;
      const width = el.offsetWidth;

      underlineApi.start({
        left,
        width,
        opacity: 1,
      });
    },
    [underlineApi]
  );

  const hideUnderline = useCallback(() => {
    const navPaths = navItems.slice(1).map((item) => item.path);
    if (navPaths.includes(pathname) || visible) {
      const activeEl = !visible
        ? itemRefs.current[pathname]
        : itemRefs.current["/about"];
      if (activeEl) {
        const left = activeEl.offsetLeft;
        const width = activeEl.offsetWidth;
        underlineApi.start({
          left,
          width,
          opacity: 1,
        });
        return;
      }
    }
    underlineApi.start({ opacity: 0 });
  }, [pathname, underlineApi, visible]);

  useEffect(() => {
    // Move underline to active route on mount or pathname change
    const activeEl = !visible
      ? itemRefs.current[location.pathname]
      : itemRefs.current["/about"];
    if (activeEl) {
      moveUnderlineTo(activeEl);
    } else {
      hideUnderline();
    }
  }, [visible, moveUnderlineTo, hideUnderline]);

  const handleAboutClick = () => {
    navigate("/", { state: { prevPathname: pathname } });
    setFlipped(false);

    if (pathname === "/projects" || pathname === "/contact") {
      if (pathname === "/projects") playUnderwaterTransitionSound();

      setTimeout(() => {
        setVisible((prev) => !prev);
        playMenuOpenCloseSound();
      }, 800);
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
        pathname !== "/projects" && playUnderwaterTransitionSound();
        break;
      case "/contact":
        setVisible(false);
        setFlipped(false);
        visible && playMenuOpenCloseSound();
        flipped && playMenuFlipSound();
        pathname === "/projects" && playUnderwaterTransitionSound();
        pathname === "/" && playTransitionSound();
        break;
      default:
        null;
    }
  };

  return (
    <nav className="hidden text-white w-full pt-6 px-4 sm:px-8 sm:flex flex-row justify-between items-center pointer-events-none">
      <Link
        to="/"
        state={{ prevPathname: pathname }}
        onClick={() => {
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          pathname === "/contact" && playTransitionSound();
          pathname === "/projects" && playUnderwaterTransitionSound();
        }}
        onPointerEnter={playHoverSound}
        className="text-4xl pointer-events-auto"
      >
        <span className="font-semibold">Eduard</span>Stroescu
      </Link>

      <div className="relative flex justify-end items-center overflow-hidden font-bold text-2xl pointer-events-auto">
        {/* Animated underline */}
        <animated.span
          className="absolute bottom-0 h-[2px] bg-[#f597e8] pointer-events-none"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            opacity: underlineStyle.opacity,
          }}
        />

        {navItems.slice(1).map((navItem) =>
          navItem.path !== "/about" ? (
            <NavLink
              key={navItem.title}
              to={navItem.path}
              state={{ prevPathname: pathname }}
              ref={(el) => (itemRefs.current[navItem.path] = el)}
              className={({ isActive }) =>
                isActive
                  ? "font-bold inline-block text-[#f597e8] italic py-0.5 mx-2"
                  : "inline-block text-white hover:text-[#f597e8] hover:italic py-0.5 mx-2"
              }
              onClick={() => handleLinkClick(navItem.path)}
              onPointerEnter={(e) => {
                playHoverSound();
                moveUnderlineTo(e.currentTarget);
              }}
              onPointerLeave={hideUnderline}
            >
              {navItem.title}
            </NavLink>
          ) : (
            <button
              key={navItem.title}
              ref={(el) => (itemRefs.current["/about"] = el)}
              className={
                visible
                  ? "font-bold inline-block text-[#f597e8] italic py-0.5 mx-2"
                  : "inline-block text-white hover:text-[#f597e8] hover:italic py-0.5 mx-2"
              }
              onClick={() => handleLinkClick(navItem.path)}
              onPointerEnter={(e) => {
                playHoverSound();
                moveUnderlineTo(e.currentTarget);
              }}
              onPointerLeave={hideUnderline}
            >
              {navItem.title}
            </button>
          )
        )}

        <button
          ref={(el) => (itemRefs.current["resume"] = el)}
          onClick={() =>
            window.open(
              import.meta.env.VITE_RESUME_URL,
              "_blank",
              "noopener,noreferrer"
            )
          }
          onPointerEnter={(e) => {
            playHoverSound();
            moveUnderlineTo(e.currentTarget);
          }}
          onPointerLeave={hideUnderline}
          className="inline-block text-white hover:text-[#f597e8] hover:italic py-0.5 mx-2"
        >
          Resume
        </button>
      </div>
    </nav>
  );
}

function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    if (pathname === "/projects" || pathname === "/contact") {
      setTimeout(() => {
        setVisible((prev) => !prev);
        playMenuOpenCloseSound();
      }, 800);
      if (pathname === "/projects") {
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
        state: { prevPathname: pathname },
      });
      switch (newLocation) {
        case "/":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          pathname === "/contact" && playTransitionSound();
          pathname === "/projects" && playUnderwaterTransitionSound();
          break;
        case "/about":
          handleAboutClick();
          break;
        case "/projects":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          pathname !== "/projects" && playUnderwaterTransitionSound();
          break;
        case "/contact":
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          pathname === "/projects" && playUnderwaterTransitionSound();
          pathname === "/" && playTransitionSound();
          break;
        default:
          null;
      }
    }, 500);
  };

  const { clipPath } = useSpring({
    clipPath: menuOpen
      ? "circle(150% at calc(100% - 33px) 30px)"
      : "circle(0% at calc(100% - 33px) 30px)",
    config: {
      mass: 5,
      tension: 400,
      friction: 70,
      precision: 0.0001,
      clamp: true,
    },
  });

  return (
    <nav className="font-[serif] sm:hidden relative text-white text-xl w-full p-4 flex flex-row justify-center items-center pointer-events-none">
      <Link
        to="/"
        state={{ prevPathname: pathname }}
        onClick={() => {
          setMenuOpen(false);
          setVisible(false);
          setFlipped(false);
          visible && playMenuOpenCloseSound();
          flipped && playMenuFlipSound();
          pathname === "/contact" && playTransitionSound();
          pathname === "/projects" && playUnderwaterTransitionSound();
        }}
        onPointerEnter={playHoverSound}
        className={`${
          menuOpen ? "text-black" : ""
        } text-[1.71rem] z-[60] pointer-events-auto overflow-hidden leading-[1] transition-colors duration-500 ease-in-out`}
      >
        <span className="font-semibold leading-[1]">Eduard</span>Stroescu
      </Link>
      <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <a.aside
        style={{ clipPath }}
        className="absolute inset-0 z-[49] bg-[#f1edeb] w-full h-[100dvh] pointer-events-auto"
      >
        <div className="relative w-full h-full flex flex-col justify-center">
          <ul className="flex flex-col gap-6 w-full justify-center items-center text-[#212121] text-6xl tracking-widest">
            {navItems.map((navItem) => (
              <li key={navItem.title}>
                <button
                  onClick={() => handleLinkClick(navItem.path)}
                  onPointerEnter={playHoverSound}
                  className={`${
                    (!visible && pathname === navItem.path) ||
                    (visible && navItem.path === "/about")
                      ? "italic underline"
                      : ""
                  } underline-offset-4 decoration-4 hover:italic hover:underline`}
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
