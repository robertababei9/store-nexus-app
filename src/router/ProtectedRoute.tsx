import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { ROUTES } from "../utils/Constants"
import { useSelector } from "react-redux"
import { authStatus } from "src/features/authentication/authenticationSlice"


const ProtectedRoute = (props: PropsWithChildren): any => {
    const authenticationStatus = useSelector(authStatus);

    console.log("ProtectedRoute --- authenticationStatus: ", authenticationStatus);

    return authenticationStatus === "loading" ? (
        <div className="flex w-full h-full items-center justify-center">
            <ClipLoader color="#3657F8" loading size={45} />
        </div>
    ) : authenticationStatus === "loggedIn" ? (
        props.children
    ) : (
        <Navigate to={ROUTES.SignIn} />
    )

}

export default ProtectedRoute
