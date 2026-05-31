import './App.css'
import { TaskTable } from './Components/TaskTable'
import { Toast } from './Components/Toast';

function App() {
    return <div>
        <nav style={{
            width: 'fix-content', height: '3rem', border: '2px solid', borderRadius: '5px', marginBottom: '10px',
            margin: 'auto'
        }}>
            <h2>Task Manager</h2>
        </nav>
        <TaskTable />
        <Toast />
    </div>

}

export default App
