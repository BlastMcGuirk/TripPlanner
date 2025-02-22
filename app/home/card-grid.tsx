import type { ReactNode } from "react";

export default function CardGrid(props: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {props.children}
        </div>
    );
}