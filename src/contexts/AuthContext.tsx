import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  singIn: (email: string, password: string) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  function singIn(email: string, password: string) {
    setUser({
      id: "",
      name: "",
      email,
      avatar: "",
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
