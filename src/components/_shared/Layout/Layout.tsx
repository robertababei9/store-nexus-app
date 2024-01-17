import { PropsWithChildren, forwardRef } from 'react'
import NavBar from '../NavBar/NavBar';
import { ROUTES } from 'src/utils/Constants';

type LayoutProps = {
    className?: string;
}

const Layout = forwardRef<HTMLDivElement, PropsWithChildren<LayoutProps>>(({
    className,
    children
  }: PropsWithChildren<LayoutProps>,
  ref) => {

    const renderNavBar = () => {
      const path = window.location.pathname;

      if (path.includes(ROUTES.SignIn) || path.includes(ROUTES.UserInvitation)) {
        return null;
      }

      return <NavBar />
    }


    return (
      <div className='w-full flex flex-col'>
        {renderNavBar()}
        
        <div ref={ref} className={`w-full h-full flex justify-start items-start flex-col sm:px-[30px] px-3 sm:py-3 py-3 overflow-y-auto ${className}`}>
          {children}
        </div>
      </div>
    )
})

export default Layout;
