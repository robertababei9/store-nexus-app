import { PropsWithChildren } from 'react';

type CardProps = {
    className?: string;
};

export default function Card({
    children,
    className = "",
}: PropsWithChildren<CardProps>) {


    return (
        <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`} >
            {children}
        </div>
    )
}
