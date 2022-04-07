import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { useWindowDimensions } from '../hooks'
import styled from "styled-components"
import { toPng } from 'html-to-image'
import { IProjectStatus, IProjectProps, ILoadMethodProps } from '../interfaces'
import { LoadAnimationRandomSquares } from './animations'
import GravityProject from '../projects/gravity/src/App'
import GameoflifeProject from '../projects/gameoflife/src/App'

////////////////////////////////////////////////////////////////

interface IEntranceProps {
  left: number
}

////////////////////////////////////////////////////////////////



const EntranceContainer = styled.div<IEntranceProps>`
  position: absolute;
  left: ${props => props.left};
`;

/////////////////////////

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

/*
const LoadLeft: React.FC<IProject> = ({ status, children }) => {
  const { width } = useWindowDimensions()
  const [magnitude, setMagnitude] = useState(width)

  useEffect(() => {
    setMagnitude(magnitude * (status.shouldEnter ? 1 : -1))
  }, [status])


  // TODO fix x: shouldEnter

  return (
    <AnimatePresence>
      <motion.div animate={{ x: status.shouldEnter ? 0 : magnitude }} transition={{ duration: 1 }} initial={false} >
        <EntranceContainer left={width}>
          {
            children
          }
        </EntranceContainer>
      </motion.div>
    </AnimatePresence>
  )
}

const Load = (props: IProject) => (
  <>
    {
      props.children
    }
  </>
)




////////////////////////



const LoadAnimationSlidingSquares: React.FC<IProject> = (props) => {
  const { width, height } = useWindowDimensions()
  const side = Math.ceil(width / 500)
  const numRows = Math.ceil(height / side)
  const numColumns = Math.ceil(width / side)
  const updateFrequency = 1
  const minDirection = Math.min(numRows, numColumns)

  const onEnter = (context: CanvasRenderingContext2D | null, onEntered: () => void) => {
    let round = 0

    const interval = setInterval(() => {
      const numRegions = round < numColumns ? Math.min(round, minDirection) : minDirection - (round - numColumns - 1)
      const startRow = round < numColumns ? 0 : round - numColumns - 1

      for (let i = 0; i < numRegions; i++) {
        context!.clearRect((Math.max(0, numColumns - round) + i) * side, (numRows - 1 - startRow - i) * side, side, side)
      }

      round += 1

      if (round > numColumns && numRegions === 0) {
        onEntered()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  const onExit = (context: CanvasRenderingContext2D | null, onExited: () => void, screenshot: HTMLImageElement) => {
    context!.fillStyle = '#fdf8ed'
    let round = 0

    const interval = setInterval(() => {
      const numRegions = round < numColumns ? Math.min(round, minDirection) : minDirection - (round - numColumns - 1)
      const startRow = (round < minDirection ? round : minDirection) - 1

      for (let i = 0; i < numRegions; i++) {
        const x = Math.max(0, round - minDirection) + i
        const y = (startRow - i)

        context!.fillRect(x * side, y * side, side, side)
        context!.drawImage(screenshot, x * side, y * side, side, side, x * side, y * side, side, side)
      }

      round += 1

      if (round > minDirection && numRegions === 0) {
        onExited()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  return <LoadAnimation {...props} onEnter={onEnter} onExit={onExit} />
}
*/



////////////////////////

const Project: React.FC<IProjectProps> = (props) => {
  //const loadMethods: React.FC<IProject>[] = [LoadAnimationClipDiagonally]//[LoadLeft, Load, LoadAnimationRandomSquares, LoadAnimationSlidingSquares, LoadAnimationClipDiagonally]
  const LoadMethod: React.FC<ILoadMethodProps> = LoadAnimationRandomSquares

  //const getLoader = (): React.FunctionComponent<IProject> => (
  //  loadMethods[Math.floor(Math.random() * loadMethods.length)]
  ///)

  return (
    <>
      {   
        props.project && props.status.hasEntered &&
          <BackButton onClick={() => props.setStatus({...props.status, shouldExit: true})}>Back</BackButton>
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