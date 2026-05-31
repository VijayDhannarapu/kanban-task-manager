import React, { useEffect, useState } from "react";
import type { Table } from "./Types"
import { TaskCard } from "./TaskCard";
import { smoothColors } from "./Types";
import { successToast, errorToast } from "./Toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { RemainingTasks } from "./RemainingTasks";
import { getDate } from "./Types";

export type CompletionStatus = {
    done: number,
    inProgress: number,
    started: number,
}

export const TaskTable = React.memo(() => {
    const [addCardName, setAddCardName] = useState<string>('');

    const initialValue: Table = JSON.parse(localStorage.getItem('table')!) || {
        Todo: [
            {
                id: 1,
                priority: "High",
                priorityColor: "#DA77F2",
                status: "In-Progress",
                statusColor: "#FFD43B",
                discription: '',
                title: "Click Me to Add title",
                date: '30-06-2026'
            }
        ]
    }

    const [taskCompletionStatus, setTaskCompletionStatus] = useState<CompletionStatus>({
        done: 0,
        inProgress: 0,
        started: 0
    })

    const [table, setTable] = useState<Table>(initialValue)
    const handleAddTask = (addTableName: string) => {
        setTable({
            ...table,
            [addTableName]: [
                ...table[addTableName],
                {
                    id: table[addTableName].length + 1,
                    title: 'Click Me to Add title',
                    status: 'In-Progress',
                    priority: 'High',
                    priorityColor: smoothColors[Math.floor(Math.random() * smoothColors.length)],
                    statusColor: smoothColors[Math.floor(Math.random() * smoothColors.length)],
                    date: getDate()
                }
            ]
        })
    }

    const handleAddCard = () => {
        if (addCardName?.trim() && addCardName !== '') {
            if (!table[addCardName]) {
                setTable({ ...table, [addCardName]: [] })
                successToast('Board Added')
            }
            else {
                errorToast('Already Exist')
            }
            setAddCardName('')
        }

    }

    const handleDeleteBtn = (deleteCardName: string) => {
        delete table[deleteCardName]
        successToast('Board Deleted', '#d9262c')
        setTable((prev) => {
            return { ...prev }
        })
    }

    const handleTaskDeleteBtn = (tableName: string, id: number) => {
        setTable({
            ...table,
            [tableName]: table[tableName].filter((task) => task.id !== id)
        })
        successToast('Task Deleted', '#d9262c')
    }

    const update = (tableName: string, id: number, value: string, chageingOne: string) =>{
        setTable({
            ...table,
            [tableName]: table[tableName].map((task) => (
                (task.id === id ? { ...task, [chageingOne]: value } : task)
            ))
        })
    }

    // updating TaskCompletion Values
    useEffect(() => {
        let done = 0, started = 0, inProgress = 0;
        Object.values(table).map((tasks) => {
            tasks.map((task) => {
                switch (task.status) {
                    case 'Started': started++; break;
                    case 'In-Progress': inProgress++; break
                    case 'Done': done++;
                }
            })
        })
        setTaskCompletionStatus({ done, started, inProgress });
    }, [table])
    
    // updating Local Storage
    useEffect(() => {
        localStorage.setItem('table', JSON.stringify(table))
    }, [table])

    return <div>
        <RemainingTasks taskCompletionStatus={taskCompletionStatus} />
        <div id="addCard" >
            <input type="text" placeholder="Enter Board Name" value={addCardName} onChange={(event) => setAddCardName(event.target.value.toLocaleLowerCase())} />
            <button onClick={handleAddCard}>Add Board</button>
        </div>

        <div className="tablesCard">
            {
                Object.entries(table).map(([tableName, tasks]) => (
                    <div className="tasksCard" key={tableName}>
                        <div className="taskTitleCard">
                            <div id="title" >
                                <div className="dot" style={{ backgroundColor: smoothColors[Math.floor(Math.random())] }}></div>
                                <p>{tableName.split(' ').map((word) => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(' ')}</p>
                            </div>
                            <div><button id="deleteBtn" onClick={() => handleDeleteBtn(tableName)}><FontAwesomeIcon icon={faTrash} className="icon" /></button></div>
                        </div>
                        {
                            tasks.map((task) => (
                                <TaskCard task={task}
                                    tableName={tableName}
                                    handleTaskDeleteBtn={handleTaskDeleteBtn}
                                    update = {update}
                                    key={task.id} />
                            ))
                        }
                        <button onClick={() => handleAddTask(tableName)}> Add +</button>
                    </div>
                ))
            }
        </div>
    </div>
})