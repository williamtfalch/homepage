import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { useWindowDimensions, useInterval } from '../hooks'
import styled from "styled-components"
import {toPng} from 'html-to-image'

interface IProjectLoaderProps {
  shouldAnimate:boolean,
  shouldEnter:boolean,
  children: React.ReactNode,
  homeRef:React.Ref<HTMLDivElement>
}

interface ICanvasProps {
  displayCanvas:boolean
}

/////////////////////////

const LoadImageContainer2 = styled.div<ICanvasProps>`
  width: 100vw;
  height: 100vh;

  > canvas {
    position: absolute;
    z-index: 2;
  }
`;






////////////////////////


interface IEntranceProps {
  left: number
}

const EntranceContainer = styled.div<IEntranceProps>`
  position: absolute;
  left: ${props => props.left};
`;


/////////////////////////

const LoadLeft:React.FunctionComponent<IProjectLoaderProps> = ({shouldAnimate, shouldEnter, children}) => {
  const { width } = useWindowDimensions()
  const [magnitude, setMagnitude] = useState(width)

  useEffect(() => {
    setMagnitude(magnitude * (shouldEnter ? 1 : -1))
  }, [shouldEnter])
  
  return (
    <AnimatePresence>
      <motion.div animate={{x: shouldAnimate ? 0 : magnitude}} transition={{ duration: 1 }} initial={false} >
        <EntranceContainer left={width}>
          {
            children
          }
        </EntranceContainer>
      </motion.div>
    </AnimatePresence>
  )
}

const Load = ({shouldAnimate, shouldEnter, children}:IProjectLoaderProps) => {
  
  return (
    <>
      {
        children
      }
    </>  
  )
}





const LoadImageContainer = styled.div<ICanvasProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;

  > canvas:first-child {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: ${props => props.displayCanvas ? 3 : 0};
  }
`;



const LoadImage:React.FunctionComponent<IProjectLoaderProps> = ({shouldAnimate, shouldEnter, homeRef, children}) => {
  const { width, height }               = useWindowDimensions()
  const [canvasWidth, setCanvasWidth]   = useState(width)
  const [canvasHeight, setCanvasHeight] = useState(height)
  const canvasRef                       = useRef(null)

  const [hideOverlay, setHideOverlay]   = useState(true)
  const side                            = Math.ceil(width/30)
  const numRows                         = Math.ceil(height/side)
  const numColumns                      = Math.ceil(width/side)
  const [regions, setRegions]           = useState(Array(numRows * numColumns).fill(0).map((v, i) => i))
  let canvas:HTMLCanvasElement
  let context:CanvasRenderingContext2D | null
  let x:number
  let y:number

  useEffect(() => {
    if (shouldAnimate) {
      if(homeRef && "current" in homeRef && homeRef.current) {
        const elem:HTMLDivElement = homeRef.current
  
        toPng(elem)
        .then(function (dataUrl) {
          const img = new Image()
          img.src = dataUrl
          img.onload = function() {
            canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
            context = canvas.getContext('2d')
            
            context!.fillStyle = '#fdf8ed'
            context!.fillRect(0,0,width,height)
            context!.drawImage(img, 0, 0)

            setHideOverlay(false)
          }
        })
      }
    }
  }, [shouldAnimate])

  useInterval(() => {
    if (shouldAnimate && !hideOverlay) {
      const copiedRegions = Object.assign([], regions)
      const region        = copiedRegions.splice(Math.floor(Math.random() * copiedRegions.length), 1)[0]

      const x = region%numColumns
      const y = Math.floor(region/numColumns)

      canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
      context = canvas.getContext('2d')
      context!.clearRect(x * side,y * side, side, side)

      setRegions(copiedRegions)

      if (regions.length === 0) {
        setHideOverlay(true)
      }
    }
  }, 5)
  
  return (
    <LoadImageContainer displayCanvas={shouldAnimate && !hideOverlay}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {
        children
      }
    </ LoadImageContainer> 
  )
}





////////////////////////

const ProjectLoader:React.FunctionComponent<IProjectLoaderProps> = (props) => {
  const [canAnimate, setCanAnimate]                            = useState(true)
  const loaders:React.FunctionComponent<IProjectLoaderProps>[] = [LoadLeft, Load, LoadImage]
  let Loader:React.FunctionComponent<IProjectLoaderProps>      = LoadImage

  const getLoader                                              = ():React.FunctionComponent<IProjectLoaderProps> => loaders[Math.floor(Math.random() * loaders.length)]


  useEffect(() => {
    if (canAnimate) {
      Loader = getLoader()
      setCanAnimate(false)

      setTimeout(
        () => setCanAnimate(true),
        2000
      )
    }

  }, [props.shouldAnimate])

  return (
    <>
      <Loader {...props} />
    </>
  )
}

export default ProjectLoader