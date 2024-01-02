import NewTask from "./NewTask.jsx";

export default function Tasks({onAddTask,onDeleteTask,tasks}){
    return <section>
        <h2 className={`text-2xl font-bold text-stone-700 mb-4`}>Tasks</h2>
        <NewTask onAddTask={onAddTask}/>
        {tasks.length == 0 && (<p className={`text-stone-800 my-4`}>This project does not have any tasks yet</p>)}

        {tasks.length > 0 && (<ul className={`p-4 mt-8 rounded-md bg-stone-100`}>
            {tasks.map((task,index) => {
                return <li key={index} className={`flex my-4 justify-between`}>
                    <span>{task.title}</span>
                    <button className={`text-stone-700 hover:text-red-500`} onClick={() => onDeleteTask(task.id)}>Clear</button>
                </li>
            })}
        </ul>)}
    </section>
}