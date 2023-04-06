import { User } from "firebase/auth";
import { ReactNode, useState, useEffect } from "react";
import { auth } from "../firebaseconfig";
import AuthContext from "./AuthContext";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  //       const removeItem = (id: string) => {
  //     setUser(user.filter((x) => x._id !== id));
  //   };

  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        // removeItem: removeItem
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
