import type { CompletionStatus } from "./TaskTable"
type RemainingTasksProp = {
    taskCompletionStatus: CompletionStatus
}

export const RemainingTasks = ({ taskCompletionStatus }: RemainingTasksProp) => {
    return <>
        <div id="CompletionCard">
            <div className="card">
                <p>Total: </p>
                <h1>{(taskCompletionStatus.started +
                    taskCompletionStatus.inProgress +
                    taskCompletionStatus.done)
                }</h1>
            </div>
            <div className="card">
                <p>Started: </p>
                <h1>{taskCompletionStatus.started}</h1>
            </div>
            <div className="card">
                <p>InProgress: </p>
                <h1>{taskCompletionStatus.inProgress}</h1>
            </div>
            <div className="card">
                <p>Done: </p>
                <h1>{taskCompletionStatus.done}</h1>
            </div>
        </div>
    </>
}