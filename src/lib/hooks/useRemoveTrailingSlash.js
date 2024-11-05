import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useRemoveTrailingSlash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.match("/.*/$")) {
      navigate(location.pathname.replace(/\/+$/, ""), {
        replace: true,
      });
    }
  }, [location.hash, location.pathname, location.search, navigate]);
};
