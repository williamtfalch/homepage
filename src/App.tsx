import { useState, useEffect, useRef } from 'react'
import ProjectLoader from './components/ProjectLoader'
import Home from './Home'
import GravityApp from './projects/gravity/src/GravityApp'
import GameoflifeApp from './projects/gameoflife/src/GameoflifeApp'
import styled from 'styled-components'

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
`;

const App:React.FunctionComponent = (props) => {
  const [canOpenProject, setCanOpenProject]           = useState(true)
  const [activeProjectString, setActiveProjectString] = useState("")
  const [activeProject, setActiveProject]             = useState<React.ReactNode>(null)
  const homeRef                                       = useRef<HTMLDivElement>(null)

  const [shouldEnter, setShouldEnter]                 = useState(false)
  const [shouldExit, setShouldExit]                   = useState(false)
  const [hasEntered, setHasEntered]                   = useState(false)
  const [hasExited, setHasExited]                     = useState(false)
  
  useEffect(() => {
    if (canOpenProject) {
      switch (activeProjectString) {
        case "gravity": 
          setActiveProject(<GravityApp />)
          setShouldEnter(true)
          break
        
  
        case "gameoflife": 
          setActiveProject(<GameoflifeApp />)
          setShouldEnter(true)
          break
        
        default:
          setShouldEnter(false)
          setShouldExit(false)
          setHasEntered(false)
          setHasExited(false)
          break
      }
    }
  }, [activeProjectString])

  useEffect(() => {
    if (hasExited) {
      setActiveProjectString("")
    }
  }, [hasExited])

  return (
    <>
      <Home onProjectClick={setActiveProjectString} ref={homeRef} />

      {
        hasEntered && !hasExited &&
          <BackButton onClick={() => setShouldExit(true)}>Back</BackButton>
      }
      {
        (shouldEnter && !hasExited) &&
          <ProjectLoader shouldEnter={shouldEnter} shouldExit={shouldExit} hasExited={hasExited} setHasEntered={setHasEntered} setHasExited={setHasExited} homeRef={homeRef}>
            {
              activeProject
            }
          </ProjectLoader>
      }
    </>
  );
}

export default App;