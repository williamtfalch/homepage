import React, {forwardRef, useState, useEffect} from 'react'
import projectJSON from './static/projects.json'
import { StyledExplore, StyledPreview, StyledInformation, StyledPreviewButton, StyledInformationButton, StyledHeader } from './styles/StyledExplore'
import {getWebsiteDisplayName} from './utils'
import { IProject } from './interfaces'
import { useInterval } from './hooks'
import { StyledTest } from './styles/StyledTest'

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

///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////

const Test:React.FC = () => (
  <StyledTest>
    <div>
      <div></div>
      <div></div>
    </div>
    <div>
      <div></div>
      <div></div>
    </div>
  </ StyledTest>
)

export default Test;