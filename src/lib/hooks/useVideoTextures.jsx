import { useVideoTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useAppStore } from "../store";

export default function useVideoTextures() {
  const activeProject = useAppStore((state) => state.activeProject);

  const videoTexture = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/ac_none,fl_immutable_cache,vc_h265,f_auto:video,q_auto/v1712931617/Portfolio/Videos/f0lppekipaxjobit4jen",
    {
      start: activeProject.video === "one",
      playsInline: true,
      muted: true,
    }
  );

  const videoTexture2 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/ac_none,fl_immutable_cache,vc_h265,f_auto:video,q_auto/v1712931617/Portfolio/Videos/ExpoDash_stlgkv",
    {
      start: activeProject.video === "two",
      playsInline: true,
      muted: true,
    }
  );

  const videoTexture3 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/ac_none,fl_immutable_cache,vc_h265,f_auto:video,q_auto/v1712931617/Portfolio/Videos/dmp4nnl23fl11yyvsqex",
    {
      start: activeProject.video === "three",
      playsInline: true,
      muted: true,
    }
  );

  const videoTexture4 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/ac_none,fl_immutable_cache,vc_h265,f_auto:video,q_auto/v1712931617/Portfolio/Videos/hbmhctwlxvieqacvw0r3",
    {
      start: activeProject.video === "four",
      playsInline: true,
      muted: true,
    }
  );

  const videoTexture5 = useVideoTexture(
    "https://res.cloudinary.com/dgfe1xsgj/video/upload/ac_none,fl_immutable_cache,vc_h265,f_auto:video,q_auto/v1712931617/Portfolio/Videos/ndfytt6vbfiysnril4i4",
    {
      start: activeProject.video === "five",
      playsInline: true,
      muted: true,
    }
  );

  useEffect(() => {
    return () => {
      videoTexture.dispose();
      videoTexture2.dispose();
      videoTexture3.dispose();
      videoTexture4.dispose();
      videoTexture5.dispose();
    };
  }, []);

  return useMemo(
    () => ({
      videoTexture,
      videoTexture2,
      videoTexture3,
      videoTexture4,
      videoTexture5,
    }),
    [videoTexture, videoTexture2, videoTexture3, videoTexture4, videoTexture5]
  );
}
