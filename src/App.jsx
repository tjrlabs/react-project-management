import {useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState,setProjectsState] = useState({
      selectedProjectId: undefined,
      projects: [],
      tasks:[]
  });

  function handleAddTask(task){
        setProjectsState(prevState => {
            const newTask = {
                id: Math.random().toString(),
                title: task,
                projectId: prevState.selectedProjectId
            }
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        })
  }

  function handleDeleteTask(id){
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(task => task.id !== id)
            }
        })
  }

  function handleStartAddProject(){
      setProjectsState(prevState => {
          return {
              ...prevState,
              selectedProjectId: null
          }
      })
  }

  function handleAddProject(projectData){
      setProjectsState(prevState => {
          const newProject = {
              id: Math.random().toString(),
              ...projectData
          }
          return {
              ...prevState,
              selectedProjectId: undefined,
              projects: [...prevState.projects, newProject]
          }
      })
  }

  function handleCancelProject(){
      setProjectsState(prevState => {
          return {
              ...prevState,
              selectedProjectId: undefined
          }
      })
  }

  function handleSelectProject(projectId){
      setProjectsState(prevState => {
          return {
              ...prevState,
              selectedProjectId: projectId
          }
      })
  }

  function handleDeleteProject(){
          setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
            }
        })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;

  if(projectState.selectedProjectId === null){
      content = <NewProject onProjectAdd={handleAddProject} onCancelProject={handleCancelProject}/>
  }else if(projectState.selectedProjectId === undefined){
      content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
          <Sidebar onStartAddProject={handleStartAddProject}  projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
          {content}
      </main>
    </>
  );
}

export default App;
