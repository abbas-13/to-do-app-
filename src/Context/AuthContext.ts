import { createContext } from "react";

import type { UserContextType } from "@/assets/Types";

export const AuthContext = createContext<UserContextType>({
  user: {
    userId: "",
    name: "",
    email: "",
    displayName: "",
  },
  setUser: () => {},
});
