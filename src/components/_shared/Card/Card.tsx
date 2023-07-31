import { PropsWithChildren } from 'react';

type CardProps = {
    className?: string;
};

export default function Card({
    children,
    className = "",
}: PropsWithChildren<CardProps>) {


    return (
        <div className={`w-100 h-100 bg-white p-8 ${className}`} >
            {children}
        </div>
    )
}
