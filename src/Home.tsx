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
  title: string,
  projects: IProject[],
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

  const changeStartIndex = (change:number) => {
    const newIndex = currentStartIndex + change

    if ((numProjectsShown + newIndex <= props.projects.length) && newIndex >= 0) {
      setCurrentStartIndex(newIndex)
    }
  }

  useEffect(() => {
    const idealProjectWidth      = 350
    const availableWidth         = 0.8 * width

    const numProjectsDisplayable = Math.ceil(availableWidth/idealProjectWidth)

    setNumProjectsShown(numProjectsDisplayable)
  }, [width])

  console.log(props.projects)


  useEffect(() => {
    setCurrentStartIndex(0)
  }, [width, height])

  return (
    <StyledProjectRow offset={currentStartIndex} numProjects={numProjectsShown}>
      <h2>{props.title}</h2>

      <div>
        <div>
          {
            props.projects.map(project => (
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
          numProjectsShown + currentStartIndex < props.projects.length &&
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
        <div>
          {<img src={icon} />
          }
        </div>
        <div>
          {
            props.type === "preview" &&
              <a onClick={() => props.onExploreClick(props.id) } className="grow">Explore</a>
          }
          
          {
            (props.capacity === "personal" && props.type === "web application") &&
              <a onClick={() => props.onOpenClick(props.id)} className="grow">Open</a>
          }

          {
            props.links.length > 0 &&
              <>
                {
                  props.links.map((link, i) => {
                    if (link.type === "web") {
                      return <a key={i} href={link.url}  className="grow">Visit</a>
                    } else {
                      const logo = require(`./static/${link.type}.png`).default
  
                      return (
                        <a key={i} href={link.url}>
                          <img src={logo} />
                          <span>{getWebsiteDisplayName(link.type)}</span>
                        </a>
                      )
                    }
                  })
                }
              </>
          }

        </div>
      </div>
      
      <div>
        <p>{props.title}</p>
      </div>
    </StyledProject>
  )
}

///////////////////////////////////////////////////////////

const Home = forwardRef<HTMLDivElement, IHomeProps>((props, ref) => {
  const capacity2title:Record<string,string>    = {
    "personal": "Hobby projects",
    "professional": "Professional life"
  }
  const formattedProjects                       = projectJSON.reduce((prev:string[][], project:IProject) => [...prev, [project.id, ...project.tags, project.title, project.type, project.capacity, capacity2title[project.capacity]]], [])
  const [filteredResults, setFilteredResults]   = useState<IProject[]>(projectJSON)
  const capacities                              = ["personal", "professional"]

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter             = event.target.value
    let results:IProject[]   = []

    if (filter === "") {
      results = projectJSON
    } else {
      const filteredProjects = formattedProjects.filter((project:string[]) => project.some(property => property.toLowerCase().includes(filter)))
      const resultIDs        = filteredProjects.reduce((prev, [id, ...rest]) => [...prev, id], [])
      results                = projectJSON.filter(project => resultIDs.includes(project.id))
    }

    setFilteredResults(results)
  }

  return (
    <StyledHome ref={ref}>
      <input placeholder="Filter.." onChange={onFilterChange} />
      <>
        {
          Object.entries(
            capacities.reduce(
              (prev, capacity) => ({...prev, [capacity]: filteredResults.filter(
                result => result.capacity === capacity
              )}), {}
            )
          ).filter(
            ([_, projects]) => (projects as IProject[]).length > 0
          )
          .map(
            ([capacity, projects]) => <ProjectRow key={capacity} title={capacity2title[capacity]} projects={projects as IProject[]} onOpenClick={props.onOpenClick} onExploreClick={props.onExploreClick} />
          )
        }
      </>
    </ StyledHome>
  )
});

Home.displayName = "Home"

export default Home;