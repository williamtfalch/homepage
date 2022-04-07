import { useState, useEffect, useRef } from 'react'
import Project from './components/Project'
import Explore from './Explore'
import Home from './Home'
import { IProjectStatus } from './interfaces'

const App:React.FunctionComponent = (props) => {
  const [canOpenProject, setCanOpenProject] = useState(true)
  const [activeProject, setActiveProject]   = useState<string>("")
  const pageRef                             = useRef<HTMLDivElement>(null)
  const [currentView, setCurrentView]       = useState<"home" | "explore">("home")

  const [projectStatus, setProjectStatus]   = useState<IProjectStatus>({
    shouldEnter: false,
    shouldExit: false,
    hasEntered: false,
    hasExited: false
  })
  
  // TODO
  useEffect(() => {
    if (canOpenProject) {
      if (!activeProject) {
        setProjectStatus({
          shouldEnter: false,
          shouldExit: false,
          hasEntered: false,
          hasExited: false
        })
      }
    }
  }, [activeProject])

  useEffect(() => {
    if (projectStatus.hasEntered) {
      setProjectStatus({...projectStatus, shouldEnter: false})
    }
  }, [projectStatus.hasEntered])

  useEffect(() => {
    if (projectStatus.shouldExit) { 
      setProjectStatus({...projectStatus, hasEntered: false})
    }
  }, [projectStatus.shouldExit])

  useEffect(() => {
    if (projectStatus.hasExited) { 
      setProjectStatus({...projectStatus, shouldExit: false})
    }
  }, [projectStatus.hasExited])

  useEffect(() => {
    if (projectStatus.shouldEnter) { 
      setProjectStatus({...projectStatus, hasExited: false})
    }
  }, [projectStatus.shouldEnter])

  return (
    <>
      {
        currentView === "home" &&
          <Home 
            onOpenClick={(projectName:string) => {
              setActiveProject(projectName);
              setProjectStatus({...projectStatus, shouldEnter: true})
            }} 
            onExploreClick={(projectName:string) => {
              setActiveProject(projectName)
              setCurrentView("explore")
            }}
            ref={pageRef}
          />
      }
      {
        currentView === "explore" &&
          <Explore 
            project={activeProject}
            onOpenClick={() => {
              setProjectStatus({...projectStatus, shouldEnter: true})
            }}
            onBackClick={() => {
              setCurrentView("home");
              setActiveProject("");
            }}
            ref={pageRef}
          />
    
      }

    <Project project={activeProject} status={projectStatus} setStatus={setProjectStatus} pageRef={pageRef} />
    </>
  );
}

export default App;