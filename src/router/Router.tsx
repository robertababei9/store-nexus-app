import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { RouteType, renderRoute } from "./utils"
import { ROUTES } from "../utils/Constants";

import NotFound404 from "../pages/not-found/NotFound";

import Menu from '../components/_shared/Menu/Menu'
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import CreateCompany from "src/pages/company/CreateCompany";


const publicRoutes: RouteType[] = [
  {
    path: ROUTES.SignIn,
    element: lazy(() => import("../pages/login/Login")),
  },
  {
    path: ROUTES.UserInvitation,
    element: lazy(() => import("../pages/user-invitation/UserInvitation")),
  }
];

const privateRoutes: RouteType[] = [
  {
    path: ROUTES.Dashboard,
    element: lazy(() => import("../pages/dashboard/Dashboard"))
  },

  // ## USERS ###
  {
    path: ROUTES.Users,
    element: lazy(() => import("../pages/users/Users"))
  },
  {
    path: ROUTES.EditUser,
    element: lazy(() => import("../pages/users/EditUser"))
  },
  {
    path: ROUTES.AddUser,
    element: lazy(() => import("../pages/users/AddUser"))
  },

  // ### STORES ###
  {
    path: ROUTES.Stores,
    element: lazy(() => import("../pages/stores/Stores")),
  },
  {
    path: ROUTES.StoresEdit,
    element: lazy(() => import("../pages/stores/EditStore"))
  },
  {
    path: ROUTES.StoresCreate,
    element: lazy(() => import("../pages/stores/AddStore"))
  },

  // ### INVOICES ###
  {
    path: ROUTES.Invoices,
    element: lazy(() => import("../pages/invoices/Invoices"))
  },
  {
    path: ROUTES.InvoicesCreate,
    element: lazy(() => import("../pages/invoices/InvoicesCreate"))
  },
  {
    path: ROUTES.InvoicesView,
    element: lazy(() => import("../pages/invoices/InvociesView"))
  },

  // ### SETTINGS ###
  {
    path: ROUTES.Settings,
    element: lazy(() => import("../pages/settings/Settings"))
  },


]


export default function Router() {

  const authenticationState = useSelector(
    (state: RootState) => state.authentication
  )
  const { currentUser, needsToCreateCompany, rolePermissions } = useSelector(
    (state: RootState) => state.authentication
  )

  const excludedRoutes = (): boolean => {

    const path = window.location.pathname;
    // we do not want to show menu if it's a public route
    if (publicRoutes.map(x => x.path).includes(path)) {
      return false;
    }

    return true;
  }

  const showMenu         = currentUser && !needsToCreateCompany && excludedRoutes(); 
  const canAccessApp     = currentUser; // logged in with role permissions


  return (
    <BrowserRouter>
      <div className="flex w-full h-full">
        {
          showMenu && (
            <Menu />
          )
        }
        <Routes>
            <Route 
                path={"/"} 
                element={<Navigate to={needsToCreateCompany ? ROUTES.CreateCompany : ROUTES.Dashboard} />} 
            />

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
            
            {
              canAccessApp && needsToCreateCompany ? (
                <Route path={ROUTES.CreateCompany} element={<CreateCompany />} />
              ) : (
                privateRoutes.map((route, index) => renderRoute(route, index, rolePermissions))
              )
            }


          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
