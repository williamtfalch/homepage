import React from "react";
import styled from "styled-components"
import { IProjectProps, ILoadMethodProps } from '../interfaces'
import { LoadAnimationRandomSquares, LoadAnimationSlidingSquares } from './animations'
import GravityProject from '../projects/gravity/src/App'
import GameoflifeProject from '../projects/gameoflife/src/App'

////////////////////////////////////////////////////////////////

const BackButton = styled.span`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3100;
  background-color: #D8E2DC;
  cursor: pointer;
  padding: 8px 30px;
  border-radius: 5px;
  border: 2px solid #c2cbc6;

  &:hover {
    background-color: #c2cbc6;
  }
`;

////////////////////////////////////////////////////////////////

const Project: React.FC<IProjectProps> = (props) => {
  //const loadMethods: React.FC<IProject>[] = [LoadAnimationClipDiagonally]//[LoadLeft, Load, LoadAnimationRandomSquares, LoadAnimationSlidingSquares, LoadAnimationClipDiagonally]
  const LoadMethod: React.FC<ILoadMethodProps> = LoadAnimationSlidingSquares

  //const getLoader = (): React.FunctionComponent<IProject> => (
  //  loadMethods[Math.floor(Math.random() * loadMethods.length)]
  ///)

  return (
    <>
      {   
        props.project && props.status.hasEntered &&
          <BackButton onClick={() => props.setStatus(prev => ({...prev, shouldExit: true}))}>Back</BackButton>
      }

      {
        (props.status.shouldEnter || props.status.hasEntered || props.status.shouldExit) && !props.status.hasExited &&
          <LoadMethod {...props}>
            {
              props.project === "gravity" &&
                <GravityProject />
            }

            {
              props.project === "gameoflife" &&
                <GameoflifeProject />
            }
          </LoadMethod>
      }
    </>
  )
}

export default Project