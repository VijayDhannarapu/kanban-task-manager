import React from "react";
import { InlineEditing } from "./AllInLineEditings/InlineEditiing"
import type { Task } from "./Types"
import { Badges } from "./AllInLineEditings/Badges";
import { statusBadges, priorityBadges } from "./Types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DateInLineEdit } from "./AllInLineEditings/DateInlineEdit";

export type Updates = {
    handleTaskDeleteBtn: (tableName: string, id: number) => void,
    update: (tableName: string, id: number,value: string,chageingOne: string) => void
}

type TaskCardProps = {
    task: Task,
    tableName: string
} & Updates

export const TaskCard = React.memo(({ 
                task, 
                tableName,
                handleTaskDeleteBtn, 
                update,
    }: TaskCardProps) => {

        const getBorder = () =>{
            if(task.status === 'done')
                return '#36ed61'
            switch (task.status) {
                case 'Done':
                    return '#36ed61'
                case 'In-Progress':
                    return '#e4a841'
                default:
                    return '#535554'
            }
        }
    return <div key={task.id} className="task" style={{border: '2px solid '+ getBorder()}}>
        <InlineEditing type={"title"} value={task.title} taskId={task.id} tableName={tableName} onSave={update} />
        <InlineEditing type={"discription"} value={task.discription} taskId={task.id} tableName={tableName} onSave={update} />
        <div className="statusCard">
            <p className="badge">Status: </p>
            <Badges type = {'status'} id={task.id} value={task.status} color={task.statusColor} tableName={tableName} onSave={update} badges={statusBadges} />
            <p className="badge">Priority: </p>
            <Badges type = {'priority'} id={task.id} value={task.priority} color={task.priorityColor} tableName={tableName} onSave={update} badges={priorityBadges} />
            <p id="date">Date: </p> 
            <DateInLineEdit id={task.id} value={task.date} tableName={tableName} onSave = {update}/>
        </div>
        <button onClick={() => handleTaskDeleteBtn( tableName ,task.id)}><FontAwesomeIcon icon={faTrash}  className="icon"  /></button>
    </div>
})