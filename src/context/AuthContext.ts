import { User } from "firebase/auth";
import { createContext } from 'react';

export interface AuthContextModel {
    user: User|null;
}
const defaultvalue: AuthContextModel = {
    user: null
}
const AuthContext = createContext(defaultvalue);
export default AuthContext;