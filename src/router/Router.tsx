import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { RouteType, renderRoute } from "./utils"
import { ROUTES } from "../utils/Constants";

import NotFound404 from "../pages/not-found/NotFound";

import Menu from '../components/_shared/Menu/Menu'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";


const publicRoutes: RouteType[] = [
    {
        path: ROUTES.SignIn,
        element: lazy(() => import("../pages/login/Login")),
    }
];

const privateRoutes: RouteType[] = [
  {
    path: ROUTES.Dashboard,
    element: lazy(() => import("../pages/dashboard/Dashboard"))
  }
]



export default function Router() {

  const accessToken = useSelector(
    (state: RootState) => state.authentication.accessToken
)

  console.log("-------------- Router.tsx rendering ... --------------")
  console.log("accessToken = ", accessToken);
    
  return (
    <BrowserRouter>
      <div className="flex w-full h-full">
        {
          accessToken && (
            <Menu />
          )
        }
        <Routes>
            <Route path={"/"} element={<Navigate to={ROUTES.Dashboard} />} />

            {
              publicRoutes.map((route, index) => (
                <Route 
                  key={index}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className="flex w-full h-full items-center justify-center">
                            <ClipLoader
                                color="#3657F8"
                                loading
                                size={45}
                            />
                        </div>
                      }
                    >
                      <route.element />
                    </Suspense>
                  }
                />
              ))
            }

            {privateRoutes.map((route, index) => renderRoute(route, index))}

            <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
