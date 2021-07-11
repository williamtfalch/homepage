import './App.css';
import {forwardRef} from 'react'
import Project from './components/Project'
import styled from "styled-components"
import projectJSON from './static/projects.json'
import { IProject } from './interfaces'

const HomeContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const ProjectsContainer = styled.div`
  width: 100vw;
  height: 280px;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 15px 0px;

  > h1 {
    position: absolute;
    left: 30px;
  }

  > div {
    margin: 30px 0px 0px 30px;
  }
`;


interface IProjectDisplayProps {
  projectType: string,
  onProjectClick:(projectName:string) => void
}

const ProjectDisplay = (props:IProjectDisplayProps) => {
  const projectType:string                  = props.projectType
  const projects:Record<string, IProject[]> = projectJSON

  return (
    <ProjectsContainer>
      <h1>{projectType.slice(0,1).toUpperCase() + projectType.slice(1).toLowerCase().replace("_", " ")}</h1>
      {
        projects[projectType].map(project => {return <Project key={project.title} onProjectClick={props.onProjectClick} {...project}></Project>})
      }
    </ProjectsContainer>
  )
}

interface IHomeProps extends React.ComponentPropsWithoutRef<'div'>{
  onProjectClick:(projectName:string) => void,
}

const Home = forwardRef<HTMLDivElement, IHomeProps>((props, ref) => (
  <HomeContainer ref={ref}>
    {
      ["side_projects", "professionally"].map(sp => <ProjectDisplay projectType={sp} key={sp} onProjectClick={props.onProjectClick} />)
    }
  </ HomeContainer>
));

Home.displayName = "Home"

export default Home;