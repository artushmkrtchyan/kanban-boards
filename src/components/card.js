import React, {useEffect} from 'react';
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export const Card = ({ card, empty }) => {
    return <div className={`card ${empty ? "empty" : ""}`}>{card && card.title}</div>;
};

export const DraggableCard = props => {
    const [, dragRef, preview] = useDrag({
        item: { type: 'card', ...props }
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div ref={dragRef}>
            <Card card={props.card} />
        </div>
    );
};