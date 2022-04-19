import React, {forwardRef, useState, useEffect} from 'react'
import projectJSON from './static/projects.json'
import { StyledExplore, StyledPreview, StyledInformation, StyledPreviewButton, StyledInformationButton, StyledHeader, StyledBackButton } from './styles/StyledExplore'
import {getWebsiteDisplayName} from './utils'
import { IProject } from './interfaces'
import { useInterval } from './hooks'

interface IExploreProps extends React.ComponentPropsWithoutRef<'div'> {
  project: string,
  onOpenClick: () => void,
  onBackClick:() => void,
}

interface IPreviewProps {
  projectName: string,
  numPreviews: number
}

interface IInformationProps {
  information: IProject,
  onOpenClick: () => void
}

interface IHeaderProps {
  title: string,
  onBackClick: () => void
}

interface IBackButtonProps {
  onClick: () => void
}

///////////////////////////////////////////////////////////

const BackButton = ({onClick}:IBackButtonProps) => (
  <StyledBackButton onClick={() => onClick()}>
    <div />
    <div />
  </StyledBackButton>
)

const Header:React.FC<IHeaderProps> = ({title, onBackClick}) => (
  <StyledHeader>
    <h1>{title}</h1>
    <BackButton onClick={() => onBackClick()} />
  </StyledHeader>
)

const Preview:React.FC<IPreviewProps> = ({projectName, numPreviews}) => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(1)
  const [currentPreview, setCurrentPreview]           = useState<string | undefined>(undefined)
  const [skipNextInterval, setSkipNextInterval]       = useState(false)
  const [pauseInterval, setPauseInterval]             = useState(false)
  //const [isLoadingImage, setIsLoadingImage]           = useState(false)

  const increasePreviewIndex = () => {
    const nextIndex = currentPreviewIndex !== numPreviews ? currentPreviewIndex + 1 : 1
    setCurrentPreviewIndex(nextIndex)
  }

  const loadPreviewImage = () => {
    const preview = require(`./static/${projectName}_${currentPreviewIndex}.png`).default
    setCurrentPreview(preview)
  }

  useInterval(() => {
    if (!pauseInterval) {
      if (!skipNextInterval) {
        increasePreviewIndex()
      } else {
        setSkipNextInterval(false)
      }
    }
  }, 6000)

  useEffect(() => {
    if (numPreviews !== 0) {
      loadPreviewImage()
    }
  }, [currentPreviewIndex])

  useEffect(() => {
    if (numPreviews < 2) {
      setPauseInterval(true)
    }

    if (numPreviews !== 0) {
      loadPreviewImage()
    }

  }, [])

  return (
    <StyledPreview>
        <div>
          {
            currentPreview &&
              <img src={currentPreview} alt="" />
          }

          <div />
        </div>
  
      <div>
        {
          currentPreview && numPreviews > 1 &&
            Array(numPreviews).fill(0).map((_, index) => <StyledPreviewButton key={index} active={currentPreviewIndex === index + 1} onClick={() => { setCurrentPreviewIndex(index + 1); setSkipNextInterval(true)}} />)
        }
      </div>
    </StyledPreview>
  )
}

const Information:React.FC<IInformationProps> = ({information, onOpenClick}) => (
  <StyledInformation>
    <div>
      <p>{information.description}</p>
      <span>{information.tags.reduce((tagLine, tag) => tagLine + ` #${tag}\xa0`, "")}</span>
    </div>
    <div>
      {
        information.type === "web application" &&
          <StyledInformationButton key={information.type} onClick={() => onOpenClick()} active={true}>Open</StyledInformationButton>
      }

      {
        //information.links.map(link => <StyledInformationButton key={link.type} href={link.url} active={false}>{link.type}</StyledInformationButton>)
      }
    </div>
  </StyledInformation>
)


///////////////////////////////////////////////////////////

const Explore = forwardRef<HTMLDivElement, IExploreProps>((props, ref) => {
  const project:IProject = projectJSON.find(project => project.id === props.project) as IProject

  return (
    <StyledExplore ref={ref}>
      <div>
        <Header title={project.title} onBackClick={() => props.onBackClick()} />
        <Preview projectName={project.id} numPreviews={project.numPreviews} />
        <Information information={project} onOpenClick={props.onOpenClick} />
      </div>
    </ StyledExplore>
  )
});

Explore.displayName = "Home"

export default Explore;