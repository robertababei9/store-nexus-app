import { PropsWithChildren } from 'react';
import { HashLoader } from 'react-spinners';

type LoadingWrapperProps = {
    className?: string;
    loading?: boolean;
}

export default function LoadingWrapper({
    children = "",
    className = "",
    loading = false,
}: PropsWithChildren<LoadingWrapperProps>) {


  return (
    <div className={`relative ${className}`}>
        <div className={`absolute z-10 ${loading ? 'flex' : 'hidden'} justify-center items-center w-full h-full bg-gray-100 bg-opacity-50 top-0 left-0 `}>
            <HashLoader color="#3657F8" loading size={45} />
        </div>
        {children}
    </div>
  )
}
