import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import { useDrop } from "react-dnd";
import {DraggableCard, Card} from './card';
import AddNewCard from './addNewCard';
import CardModal from "./modal";

const Column = ({ column: { title, cards = [] }, columnIdx, moveCard, addCard, setCard }) => {
    const [modalData, setModalData] = useState({});
    const history = useHistory();
    const handleChangeData = (data) => {
        history.push(`/${data.card ? data.card.id : ''}`)
        setModalData(data)
    }
    const tasks = cards.map((card, index) => {
        return (
            <div
                key={card.id}
                onClick={() => handleChangeData({show: true, card})}
            >
                <DraggableCard
                    card={card}
                    columnIdx={columnIdx}
                    index={index}
                />
            </div>
        );
    });

    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'card',
        drop: item => {
            const from = item;
            moveCard(from, [columnIdx, 0]);
        },
        canDrop: item => item.columnIdx !== columnIdx,
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    return (
        <div ref={dropRef} className="column">
            <p className="column--title">{title}</p>
            <div className="column--cards">
                {tasks}
                {isOver && canDrop ? <Card empty /> : ""}
            </div>
            <AddNewCard onSubmit={addCard} />
            <CardModal
                data={modalData}
                close={() => handleChangeData({})}
                setCard={setCard.bind(null, columnIdx)}
            />
        </div>
    );
};

export default Column;

