import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import Main from "./components/main";
import 'antd/dist/antd.css';
import './app.scss';

const getStore = () => {
    try {
        const tasks = JSON.parse(localStorage.getItem("tasks"))
        if (!Array.isArray(tasks) || tasks.length !== 3) {
            throw "is empty"
        }

        tasks.forEach(item => {
            if (!Array.isArray(item.cards)) {
                throw "cards is empty"
            }
        });

        return tasks
    }catch (e) {
        return setStore([
            {id: uuidv4(), title: "В работе", cards: []},
            {id:  uuidv4(), title: "На проверке", cards: []},
            {id:  uuidv4(), title: "Выполнено", cards: []},
        ])
    }
};

const setStore = (tasks = []) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    return tasks
}

function App() {
  return (
    <Router>
        <div className="kanban-boards">
            <Switch>
                <Route path="/">
                    <Main
                        store={getStore()}
                        setStore={setStore}
                    />
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
