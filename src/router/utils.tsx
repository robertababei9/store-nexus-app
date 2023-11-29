import { Suspense } from 'react';
import { Route } from "react-router"
import { ClipLoader } from 'react-spinners';
import ProtectedRoute from './ProtectedRoute';
import { RolePermissionsType } from 'src/features/authentication/types';
import { getPathsFromRolePermissions } from 'src/utils/Permissions';

export type RouteType = {
    path: string
    element: React.LazyExoticComponent<any>
    outletElements?: RouteType[]
}


// recursive function to render N levels of childrens
export const renderRoute = (
    route: RouteType,
    index: number,
    rolePermissions: RolePermissionsType | null,
    fromOutlet?: boolean,
): any =>
    route.outletElements ? (
        <Route
            key={index}
            path={route.path}
            element={
                fromOutlet ? (
                    <Suspense
                        fallback={
                            <div className="flex w-full h-full items-center justify-center">
                                <ClipLoader color="#3657F8" loading size={45} />
                            </div>
                        }
                    >
                        <route.element />
                    </Suspense>
                ) : (
                    <ProtectedRoute>
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
                    </ProtectedRoute>
                )
            }
        >
            {route.outletElements.map((outletElement, index: number) =>
                renderRoute(outletElement, index, rolePermissions, true)
            )}
        </Route>
    ) : (
            // rolePermissions?[route.path] &&
            getPathsFromRolePermissions(rolePermissions).includes(route.path) ? 
            (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        fromOutlet ? (
                            <Suspense
                                fallback={
                                    <div className="flex w-full h-full items-center justify-center">
                                        <ClipLoader color="#3657F8" loading size={45} />
                                    </div>
                                }
                            >
                                <route.element />
                            </Suspense>
                        ) : (
                            <ProtectedRoute>
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
                            </ProtectedRoute>
                        )
                    }
                />
            ) : (
                null
            )
)