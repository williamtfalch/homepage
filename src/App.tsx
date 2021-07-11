import { useState, useEffect, useRef } from 'react'
import ProjectLoader from './components/ProjectLoader'
import Home from './Home'
import GravityApp from './projects/gravity/src/GravityApp'
import GameoflifeApp from './projects/gameoflife/src/GameoflifeApp'

const App:React.FunctionComponent = (props) => {
  const [shouldEnter, setShouldEnter]                 = useState(true)
  const [shouldAnimate, setShouldAnimate]             = useState(false)
  const [activeProjectString, setActiveProjectString] = useState("k")
  const [activeProject, setActiveProject]             = useState<React.ReactNode>(null)
  const homeRef                                       = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    switch (activeProjectString) {
      case "gravity":
        setActiveProject(<GravityApp />)
        setShouldAnimate(true)
        break;

      case "gameoflife":
        setActiveProject(<GameoflifeApp />)
        setShouldAnimate(true)
        break;
    
      default:
        setActiveProject(null)
        setShouldAnimate(false)
        break;
    }
  }, [activeProjectString])

  return (
    <div className="App">
      <Home onProjectClick={setActiveProjectString} ref={homeRef} />

      <ProjectLoader shouldEnter={shouldEnter} shouldAnimate={shouldAnimate} homeRef={homeRef}>
        {
          activeProject
        }
      </ProjectLoader>
    </div>
  );
}

export default App;