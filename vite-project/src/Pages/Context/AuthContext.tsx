import { createContext, ReactNode, useState, useContext } from "react";

const AuthContext = createContext<AuthContextType>({}as AuthContextType);

interface AuthContextType {
    isAuthenticated: boolean,
    login: ()=>void,
    logout: ()=>void
}

 interface AuthProviderProps {
    children : ReactNode
 }

export const AuthProvider: React.FC<AuthProviderProps> = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const login = ()=>setIsAuthenticated(true);
    const logout = ()=>setIsAuthenticated(false);
   const value : AuthContextType = {isAuthenticated,login,logout}
     return(
        <AuthContext.Provider value={value}>
        {children}   
        </AuthContext.Provider>
     )

}

export const useAuth = () => useContext(AuthContext);