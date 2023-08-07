// import { authStatus } from "features/authentication/authenticationSlice"
import { PropsWithChildren } from "react"
// import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { ROUTES } from "../utils/Constants"

// const ProtectedRoute = (props: PropsWithChildren): any => {
//     const authenticationStatus = useSelector(authStatus)

//     return authenticationStatus === "loading" ? (
//         <div className="flex w-full h-full items-center justify-center">
//             <ClipLoader color="#3657F8" loading size={45} />
//         </div>
//     ) : authenticationStatus === "loggedIn" ? (
//         props.children
//     ) : (
//         <Navigate to={ROUTES.SignIn} />
//     )
// }

const ProtectedRoute = (props: PropsWithChildren): any => {
    const isLoggedIn = localStorage.getItem("accessToken");

     return isLoggedIn ? (
        props.children
    ) : (
        <Navigate to={ROUTES.SignIn} />
    )
}

export default ProtectedRoute
