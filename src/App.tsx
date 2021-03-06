import { useState, useEffect, useRef, MutableRefObject } from 'react'
import Project from './components/Project'
import Explore from './Explore'
import Home from './Home'
import { IProjectStatus } from './interfaces'

const App:React.FunctionComponent = (props) => {
  const [activeProject, setActiveProject] = useState<string>("")
  const pageRef                           = useRef() as MutableRefObject<HTMLDivElement>
  const [explore, setExplore]             = useState(false)

  const [projectStatus, setProjectStatus] = useState<IProjectStatus>({
    shouldEnter: false,
    shouldExit: false,
    hasEntered: false,
    hasExited: false
  })

  useEffect(() => {
    if (projectStatus.hasEntered) {
      setProjectStatus(prev => ({...prev, shouldEnter: false}))
    }
  }, [projectStatus.hasEntered])

  useEffect(() => {
    if (projectStatus.shouldExit) { 
      setProjectStatus(prev => ({...prev, hasEntered: false}))
    }
  }, [projectStatus.shouldExit])

  useEffect(() => {
    if (projectStatus.hasExited) { 
      setProjectStatus(prev => ({...prev, shouldExit: false}))
    }
  }, [projectStatus.hasExited])

  useEffect(() => {
    if (projectStatus.shouldEnter) { 
      setProjectStatus(prev => ({...prev, hasExited: false}))
    }
  }, [projectStatus.shouldEnter])

  return (
    <>
      {
        !explore ?
          <Home 
            onOpenClick={(projectName:string) => {
              setActiveProject(projectName);
              setProjectStatus({...projectStatus, shouldEnter: true})
            }} 
            onExploreClick={(projectName:string) => {
              setActiveProject(projectName)
              setExplore(true)
            }}
            ref={pageRef}
          />
        :
          <Explore 
            project={activeProject}
            onOpenClick={() => {
              setProjectStatus({...projectStatus, shouldEnter: true})
            }}
            onBackClick={() => {
              setExplore(false);
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