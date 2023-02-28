import { ReactNode } from "react";

interface LayoutContainerProps {
    children: ReactNode
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
    return (
        <>
            <div className="container mx-auto px-20">
                <div className='border border-white text-center'>
                    {children}
                </div>
            </div>
        </>
    );
}

export default LayoutContainer;
