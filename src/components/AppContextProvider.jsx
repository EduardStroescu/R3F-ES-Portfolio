import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const appContext = createContext();

export const useAppContext = () => useContext(appContext);

export function AppContextProvider({ children }) {
  const location = useLocation();
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);
  const [isMessageReceived, setMessageReceived] = useState(false);

  // Initialize location.state.data for first load
  useEffect(() => {
    if (!location.state) {
      location.state = { data: location.pathname };
    }
  }, [location, location.state]);

  const contextValues = React.useMemo(
    () => ({
      location,
      flipped,
      setFlipped,
      visible,
      setVisible,
      isMessageSent,
      isMessageReceived,
      setMessageSent,
      setMessageReceived,
    }),
    [
      location,
      flipped,
      setFlipped,
      visible,
      setVisible,
      isMessageSent,
      isMessageReceived,
      setMessageSent,
      setMessageReceived,
    ]
  );

  return (
    <appContext.Provider value={contextValues}>{children}</appContext.Provider>
  );
}
