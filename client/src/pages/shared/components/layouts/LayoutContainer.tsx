import { ReactNode } from "react";

interface LayoutContainerProps {
    children: ReactNode
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
    return (
        <>
            <div className="container mx-auto px-20">
                {children}
            </div>
        </>
    );
}

export default LayoutContainer;
