import { ReactNode } from "react"
import { useAuth } from "./Context/AuthContext"
import { Navigate } from "react-router";

interface protectedRouteProps {
children: ReactNode
}
export const ProtectedRoute: React.FC<protectedRouteProps>=({children})=> {
    const {isAuthenticated} = useAuth();
   return(
    <>
    {isAuthenticated ? {children} : 
    <Navigate to="/login"/>
    }
    </>
   )
}
