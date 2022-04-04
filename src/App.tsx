import { useState, useEffect, useRef } from 'react'
import Project from './components/Project'
import Home from './Home'
import { IProjectStatus } from './interfaces'

const App:React.FunctionComponent = (props) => {
  const [canOpenProject, setCanOpenProject] = useState(true)
  const [activeProject, setActiveProject]   = useState<string | undefined>(undefined)
  const homeRef                             = useRef<HTMLDivElement>(null)

  const [projectStatus, setProjectStatus]   = useState<IProjectStatus>({
    shouldEnter: false,
    shouldExit: false,
    hasEntered: false,
    hasExited: false
  })
  
  useEffect(() => {
    if (canOpenProject) {
      if (activeProject) {
        setProjectStatus({...projectStatus, shouldEnter: true})
      } else {
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
    if (projectStatus.hasExited) {
      setActiveProject(undefined)
    }
  }, [projectStatus.hasExited])

  return (
    <>
      <Home onProjectClick={setActiveProject} ref={homeRef} />

      <Project project={activeProject} status={projectStatus} setStatus={setProjectStatus} homeRef={homeRef} />
    </>
  );
}

export default App;