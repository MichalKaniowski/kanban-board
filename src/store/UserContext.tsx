import React, { useState } from "react";

type Context = {
  user: User | null;
  isLoggedIn: boolean;
  onSetUser: (user: User) => void;
};

type User = {
  email: string;
  hasLoggedInPreviously: boolean;
};

export const UserContext = React.createContext<Context>({
  user: { email: "", hasLoggedInPreviously: false }, //this will be probably useless so remove it
  isLoggedIn: false,
  onSetUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export default function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function setUserHandler(email: string | null, action: string) {
    if (action === "login") {
      setIsLoggedIn(true);
      setUser({
        email: email,
        hasLoggedInPreviously: user?.hasLoggedInPreviously,
      });
    } else if (action === "signup") {
      setIsLoggedIn(true);
      setUser({ email: email, hasLoggedInPreviously: false });
    } else if (action === "logout") {
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  const value = {
    user: user,
    isLoggedIn: isLoggedIn,
    onSetUser: setUserHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
