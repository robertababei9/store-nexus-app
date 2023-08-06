import { Suspense } from 'react';
import { Route } from "react-router"
import { ClipLoader } from 'react-spinners';
import ProtectedRoute from './ProtectedRoute';

export type RouteType = {
    path: string
    element: React.LazyExoticComponent<any>
    outletElements?: RouteType[]
}


// recursive function to render N levels of childrens
export const renderRoute = (
    route: RouteType,
    index: number,
    fromOutlet?: boolean
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
                renderRoute(outletElement, index, true)
            )}
        </Route>
    ) : (
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
    )