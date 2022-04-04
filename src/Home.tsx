import {forwardRef} from 'react'
import projectJSON from './static/projects.json'
import { StyledHome, StyledProjectRow, StyledProject } from './styles/StyledHome'
import {getWebsiteDisplayName} from './utils'
import { IProject } from './interfaces'

interface IHomeProps extends React.ComponentPropsWithoutRef<'div'>{
  onProjectClick:(projectName:string) => void,
}

interface IProjectRowProps {
  projectType: string,
  onProjectClick:(projectName:string) => void
}

interface IProjectProps extends IProject {
  onProjectClick:(projectName:string) => void,
}

///////////////////////////////////////////////////////////

const ProjectRow = (props:IProjectRowProps) => {
  const projectType:string                  = props.projectType
  const projects:Record<string, IProject[]> = projectJSON

  return (
    <StyledProjectRow>
      <h1>{projectType.slice(0,1).toUpperCase() + projectType.slice(1).toLowerCase().replace("_", " ")}</h1>

      <div>
        {
          projects[projectType].map(project => <Project key={project.title} onProjectClick={props.onProjectClick} {...project}></Project>)
        }
      </div>
    </StyledProjectRow>
  )
}


const Project:React.FC<IProjectProps> = (props) => {
  const image = require(`./static/${props.imageSource}`).default
 
  return (
    <StyledProject>
      <div>
        <img src={image} />

        <div>
          {
            ("page" in props) &&
              <a onClick={() => props.onProjectClick(props.page as string)} className="explore">Explore</a>
          }

          {
            props.links.map(link => {
              const logo = require(`./static/${link.type}.png`).default

              return (
                <a key={link.type} href={link.url}>
                  <img src={logo} />
                  <span>{getWebsiteDisplayName(link.type)}</span>
                </a>
              )
            })
          }
        </div>
      </div>

      <h1>{props.title}</h1>
    </StyledProject>
  )
}

///////////////////////////////////////////////////////////

const Home = forwardRef<HTMLDivElement, IHomeProps>((props, ref) => (
  <StyledHome ref={ref}>
    {
      ["hobby_projects", "professional_life"].map(sp => <ProjectRow projectType={sp} key={sp} onProjectClick={props.onProjectClick} />)
    }
  </ StyledHome>
));

Home.displayName = "Home"

export default Home;