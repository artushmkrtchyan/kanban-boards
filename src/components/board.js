import React from 'react';
import Column from './column';

export const Board = ({tasks, moveCard, addCard, setCard}) => {
    return (
        <div className="board">
            {tasks.map((column, i) => (
                <Column
                    key={column.id}
                    addCard={addCard.bind(null, column.id)}
                    column={column}
                    columnIdx={i}
                    moveCard={moveCard}
                    setCard={setCard}
                />
            ))}
        </div>
    );
}
