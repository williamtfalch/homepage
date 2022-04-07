import {forwardRef, useEffect, useState} from 'react'
import projectJSON from './static/projects.json'
import { StyledHome, StyledProjectRow, StyledProject } from './styles/StyledHome'
import {getWebsiteDisplayName} from './utils'
import { IProject } from './interfaces'
import { useWindowDimensions } from './hooks'

interface IHomeProps extends React.ComponentPropsWithoutRef<'div'>{
  onOpenClick: (projectName:string) => void,
  onExploreClick: (projectName:string) => void,
}

interface IProjectRowProps {
  projectType: string,
  onOpenClick: (projectName:string) => void,
  onExploreClick: (projectName:string) => void,
}

interface IProjectProps extends IProject {
  numProjects: number,
  onOpenClick: (projectName:string) => void,
  onExploreClick: (projectName:string) => void,
}

///////////////////////////////////////////////////////////

const ProjectRow = (props:IProjectRowProps) => {
  const { width, height }                         = useWindowDimensions()
  const [numProjectsShown, setNumProjectsShown]   = useState(4)
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const projectType:string                        = props.projectType
  const filteredProjects:IProject[]               = projectJSON.filter(project => project.capacity === projectType)
  const capacity2heading:Record<string,string>    = {
    "personal": "Hobby projects",
    "professional": "Professional life"
  }

  const changeStartIndex = (change:number) => {
    const newIndex = currentStartIndex + change

    if ((numProjectsShown + newIndex <= filteredProjects.length) && newIndex >= 0) {
      setCurrentStartIndex(newIndex)
    }
  }

  useEffect(() => {
    const idealProjectWidth             = 350
    const availableWidth                = 0.8 * width

    const numProjectsDisplayable        = Math.ceil(availableWidth/idealProjectWidth)

    setNumProjectsShown(numProjectsDisplayable)
  }, [width])


  useEffect(() => {
    setCurrentStartIndex(0)
  }, [width, height])

  return (
    <StyledProjectRow offset={currentStartIndex} numProjects={numProjectsShown}>
      <h2>{capacity2heading[projectType]}</h2>

      <div>
        <div>
          {
            filteredProjects.map(project => (
              <Project key={project.title} numProjects={numProjectsShown} onOpenClick={props.onOpenClick} onExploreClick={props.onExploreClick} {...project}></Project>
            ))
          }
        </div>

        {
          currentStartIndex > 0 &&
            <div className="gradient_left" onClick={() => changeStartIndex(-1)}>
              <div />
              <div />
            </div>
        }
        {
          numProjectsShown + currentStartIndex < filteredProjects.length &&
            <div className="gradient_right" onClick={() => changeStartIndex(1)}>
              <div />
              <div />
            </div>
          
        }
      </div>
    </StyledProjectRow>
  )
}


const Project:React.FC<IProjectProps> = (props) => {
  const icon = require(`./static/${props.id}_icon.png`).default
 
  return (
    <StyledProject numProjects={props.numProjects}>
      <div>
        <img src={icon} />

        <div>
          {
            (props.capacity === "personal" && props.type === "web application") &&
              <a onClick={() => props.onOpenClick(props.id)} className="open">Open</a>
          }

          <a onClick={() => props.onExploreClick(props.id)} className="">Explore</a>
        </div>
      </div>

      <h3>{props.title}</h3>
    </StyledProject>
  )
}

///////////////////////////////////////////////////////////

const Home = forwardRef<HTMLDivElement, IHomeProps>((props, ref) => (
  <StyledHome ref={ref}>
    <div>
      {
        ["personal", "professional"].map(sp => <ProjectRow projectType={sp} key={sp} onOpenClick={props.onOpenClick} onExploreClick={props.onExploreClick} />)
      }
    </div>
  </ StyledHome>
));

Home.displayName = "Home"

export default Home;