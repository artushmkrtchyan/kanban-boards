import React, {useState, useEffect} from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid';
import {Board} from './board';
import DragLayer from "./dragLayer";

const Main = ({store, setStore}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(JSON.parse(JSON.stringify(store)))
    }, [store])

    const changeData = (data) => {
        setTasks(data)
        setStore(data)
    }

    const addCard = (columnId, title) => {
        const data = tasks.map(item => {
            if (item.id === columnId){
                item.cards.push({id:  uuidv4(), title, desc: ''})
            }
            return item
        })
        changeData(data)
    };

    const setCard = (columnIdx, card, isDelete = false) => {
        const data = [...tasks]
        if (!data[columnIdx] || !data[columnIdx].cards) return ;

        const index = data[columnIdx].cards.findIndex(item => item.id === card.id)

        if (index === -1 ) return;

        if (isDelete){
            delete data[columnIdx].cards.splice(index, 1)
        } else {
            data[columnIdx].cards[index] = card;
        }

        changeData(data)
    };

    const moveCard = (cur, next) => {
        const {columnIdx: curX, index: curY} = cur;
        const [nextX] = next; //[nextX, nextY]
        const card = tasks[curX].cards[curY];
        const newTasks = [...tasks];

        // remove task
        newTasks[curX].cards = [...newTasks[curX].cards.slice(0, curY), ...newTasks[curX].cards.slice(curY + 1)];
        // move task
        newTasks[nextX].cards.push(card)
        // newTasks[nextX].cards = [...newTasks[nextX].cards.slice(0, nextY), card, ...newTasks[nextX].cards.slice(nextY)];

        changeData(newTasks)
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DragLayer />
            <Board
                tasks={tasks}
                moveCard={moveCard}
                addCard={addCard}
                setCard={setCard}
            />
        </DndProvider>
    );

}

export default Main;
