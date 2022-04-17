import React from "react";
import styled from "styled-components"
import { IProjectProps, ILoadMethodProps } from '../interfaces'
import { LoadAnimationRandomSquares, LoadAnimationF1 } from './animations'
import GravityProject from '../projects/gravity/src/App'
import GameoflifeProject from '../projects/gameoflife/src/App'

////////////////////////////////////////////////////////////////

interface IBackButtonProps {
  onClick: () => void
}

const StyledBackButton = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 3100;
  width: 50px;
  height: 50px;
  background-color: #fdf8ed;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #c2cbc6;

  > div {
    width: 22px;
    height: 2px;
    background-color: #c2cbc6;
    position: absolute;
    border-radius: 2px;
    left: 11px;
  }

  > div:nth-child(1) {
    transform: rotate(45deg);
    top: 31px;
  }

  > div:nth-child(2) {
    transform: rotate(-45deg);
    top: 17px;
  }

  &:hover {
    border-color: #979e9a
;

    > div {
      background-color: #979e9a;
    }
  }
`;

const BackButton = ({onClick}:IBackButtonProps) => (
  <StyledBackButton onClick={() => onClick()}>
    <div />
    <div />
  </StyledBackButton>
)

////////////////////////////////////////////////////////////////

const Project: React.FC<IProjectProps> = (props) => {
  //const loadMethods: React.FC<IProject>[] = [LoadAnimationClipDiagonally]//[LoadLeft, Load, LoadAnimationRandomSquares, LoadAnimationSlidingSquares, LoadAnimationClipDiagonally]
  const LoadMethod: React.FC<ILoadMethodProps> = LoadAnimationF1

  //const getLoader = (): React.FunctionComponent<IProject> => (
  //  loadMethods[Math.floor(Math.random() * loadMethods.length)]
  ///)

  return (
    <>
      {
        props.project && props.status.hasEntered &&
          <BackButton onClick={() => props.setStatus(prev => ({...prev, shouldExit: true}))} />
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