import { PropsWithChildren } from 'react'

type LayoutProps = {
    className?: string;
}

export default function Layout({
    className,
    children
}: PropsWithChildren<LayoutProps>) {
  return (
    <div className={`w-full h-full flex justify-start items-start flex-col sm:px-8 px-4 sm:py-6 py-6 overflow-y-auto ${className}`}>
        {children}
    </div>
  )
}
