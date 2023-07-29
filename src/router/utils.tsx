

export type RouteType = {
    path: string
    element: React.LazyExoticComponent<any>
    outletElements?: RouteType[]
}