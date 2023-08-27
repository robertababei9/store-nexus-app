import { PropsWithChildren, forwardRef } from 'react'

type LayoutProps = {
    className?: string;
}

const Layout = forwardRef<HTMLDivElement, PropsWithChildren<LayoutProps>>(({
    className,
    children
  }: PropsWithChildren<LayoutProps>,
  ref) => {

  return (
    <div ref={ref} className={`w-full h-full flex justify-start items-start flex-col sm:px-8 px-4 sm:py-6 py-6 overflow-y-auto ${className}`}>
      {children}
    </div>
  )
})

export default Layout;
