import React, { useState } from "react";

type Context = {
  isScreenSmall: boolean;
  onScreenSizeChange: (isScreenSmall: boolean) => void;
};

export const ScreenContext = React.createContext<Context>({
  isScreenSmall: false,
  onScreenSizeChange: () => {},
});

export function ScreenContextProvider(props: { children: React.ReactNode }) {
  const [isScreenSmall, setIsScreenSmall] = useState(true);

  function screenSizeChangeHandler(isScreenSmall: boolean) {
    setIsScreenSmall(isScreenSmall);
  }

  const value = {
    isScreenSmall: isScreenSmall,
    onScreenSizeChange: screenSizeChangeHandler,
  };

  return (
    <ScreenContext.Provider value={value}>
      {props.children}
    </ScreenContext.Provider>
  );
}
