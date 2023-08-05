import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { RouteType } from "./utils"
import { ROUTES } from "../utils/Constants";

import SignIn from '../pages/login/Login';
import NotFound404 from "../pages/not-found/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";


const publicRoutes: RouteType[] = [
    {
        path: ROUTES.SignIn,
        element: lazy(() => import("../pages/login/Login")),
    },
    {
        path: ROUTES.Dashboard,
        element: lazy(() => import("../pages/dashboard/Dashboard")),
    }
];



export default function Router() {
    
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Navigate to={ROUTES.SignIn} />} />

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


            <Route path={ROUTES.Dashboard} element={<Dashboard/>} />
            
            <Route path="*" element={<NotFound404 />} />
        </Routes>
    </BrowserRouter>
  )
}
