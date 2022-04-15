import React, { useState, useEffect, useRef } from "react"
import { useWindowDimensions } from '../hooks'
import { ILoadAnimationProps, ILoadMethodProps, IProjectStatus } from '../interfaces'
import { toPng } from 'html-to-image'
import styled from "styled-components"
import Draw from '../libraries/Draw'
import Utilities from "../libraries/Utilities"
import { motion, AnimatePresence } from "framer-motion"

////////////////////////////////////////////////////////////////

interface ICanvasProps {
  displayCanvas: boolean
}

////////////////////////////////////////////////////////////////

const StyledLoadAnimation = styled.div<ICanvasProps>`
  position: absolute;
  top: 0px;
  left: 0px;

  > canvas:first-child {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: ${props => props.displayCanvas ? 4000 : 0};
  }
`;

////////////////////////////////////////////////////////////////

const LoadAnimation: React.FC<ILoadAnimationProps> = ({ status, setStatus, pageRef, children, onEnter, onExit }) => {
  const { width, height }                             = useWindowDimensions()
  const [screenshotHasLoaded, setScreenshotHasLoaded] = useState(false)
  const [hideOverlay, setHideOverlay]                 = useState(true)
  const [refPageScreenshot, setRefPageScreenshot]     = useState<HTMLImageElement>(new Image())
  const [projectReady, setProjectReady]               = useState(false)
  const canvasRef                                     = useRef(null)
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D | null



  const processScreenshot = (screenshot: HTMLImageElement) => {
    canvas  = canvasRef.current as unknown as HTMLCanvasElement // TODO
    context = canvas.getContext('2d')

    setRefPageScreenshot(screenshot)
    setScreenshotHasLoaded(true)
  }

  const captureScreenshot = (processor:(screenshot:HTMLImageElement) => void) => {
    if (pageRef && "current" in pageRef && pageRef.current) { // TODO
      const captureElement = pageRef.current

      toPng(captureElement)
      .then(function (dataUrl) {
        const img  = new Image()
        img.src    = dataUrl
        img.onload = () => processor(img)
      })
    }
  }

  // captures screenshot of reffed page and generally starts pipeline
  useEffect(() => {
    if (status.shouldEnter) {
      captureScreenshot(processScreenshot)
    }
  }, [status.shouldEnter])

  // when screenshot loads, draw it and continue entering pipeline
  useEffect(() => {
    if (screenshotHasLoaded) {
      setHideOverlay(false)

      canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
      context = canvas.getContext('2d')

      Draw.drawScreenshot(context, refPageScreenshot, width, height, '#fdf8ed')

      onEnter(
        context,
        () => {
          setHideOverlay(true)
          setStatus((prev:IProjectStatus) => ({...prev, hasEntered: true}))
        }
      )
    }
  }, [screenshotHasLoaded])

  // starts the exit pipeline when shouldExit turns true
  useEffect(() => {
    if (status.shouldExit) {
      setHideOverlay(false)

      canvas  = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
      context = canvas.getContext('2d')

      onExit(
        context,
        () => {
          setHideOverlay(true)
          setStatus(prev => ({...prev, hasExited: true}))
          setScreenshotHasLoaded(false)
        },
        refPageScreenshot
      )
    }
  }, [status.shouldExit])
 
  return (
    <StyledLoadAnimation displayCanvas={screenshotHasLoaded && !hideOverlay}>
      <canvas ref={canvasRef} width={width} height={height} />
      {
        children !== undefined && screenshotHasLoaded &&
          children
      }
    </ StyledLoadAnimation>
  )
}

////////////////////////////////////////////////////////////////

/*
export const LoadAnimationClipDiagonally: React.FC<ILoadAnimationProps> = (props) => {
  const { width, height } = useWindowDimensions()
  const updateFrequency = 400

  // constants for rectangles
  const denominator = width / 50
  const rectangleWidth = Math.ceil(width / denominator)
  const tilt = Math.PI / 6
  const complementaryAngle = (Math.PI / 2) - tilt

  // math for rectangles
  const hypothenuse = rectangleWidth / Math.sin(complementaryAngle)
  const angularWidth = height * Math.tan(tilt)                      // width of transparent triangle created in vacuum on sides of rectangle
  const totalWidthCovered = width// + angularWidth                         // width of canvas plus needed to fill canvas width rectangles according to tilt
  const numRectangles = Math.ceil(totalWidthCovered / hypothenuse)
  const firstRectangleX = 0//width - totalWidthCovered

  const onEnter = (context: CanvasRenderingContext2D | null, onEntered: () => void) => {
    const rectanglePool = Array.from(Array(numRectangles).keys())
    const drawnRectangles: number[] = []

    const interval = setInterval(() => {
      drawnRectangles.push(rectanglePool.splice(rectanglePool.length - 1, 1)[0])//rectanglePool.splice(Math.floor(Math.random() * rectanglePool.length), 1)[0])

      context!.save()
      context!.beginPath();

      const startX = firstRectangleX
      const hypothenuses = drawnRectangles.length * hypothenuse
      const endX = startX + hypothenuses + angularWidth

      console.log(startX, hypothenuses, angularWidth, endX)

      context!.moveTo(startX, height)
      context!.lineTo(startX + hypothenuses, height)
      context!.lineTo(startX + hypothenuses + angularWidth, 0)
      context!.lineTo(startX + hypothenuses + angularWidth - hypothenuse, 0)
      context!.lineTo(startX, height)

      context!.closePath();
      context!.clip();

      context!.clearRect(startX, 0, endX, height)

      /*for (const rectangle of drawnRectangles) {
        const startX = firstRectangleX + rectangle * hypothenuse
        
        context!.moveTo(startX, height)
        context!.lineTo(startX + hypothenuse, height)
        context!.lineTo(startX + hypothenuse + angularWidth, 0)
        context!.lineTo(startX + angularWidth, 0)
        context!.lineTo(startX, height)
        
      }

      context!.closePath();
      context!.clip();

      context!.clearRect(0, 0, width, height)
      */
/*      if (rectanglePool.length === 0) {
        onEntered()
        clearInterval(interval)
      } else {
        context!.restore()
      }
    }, updateFrequency)
  }

  const onExit = (context: CanvasRenderingContext2D | null, onExited: () => void, screenshot: HTMLImageElement) => {
    context!.fillStyle = '#fdf8ed'
    const rectanglePool = Array.from(Array(numRectangles).keys())
    const drawnRectangles: number[] = []

    const interval = setInterval(() => {
      drawnRectangles.push(rectanglePool.splice(0, 1)[0])//rectanglePool.splice(Math.floor(Math.random() * rectanglePool.length), 1)[0]) //rectanglePool.splice(0, 1)[0]) //

      context!.save()
      context!.beginPath();

      for (const rectangle of drawnRectangles) {
        const startX = firstRectangleX + rectangle * hypothenuse

        context!.moveTo(startX, height)
        context!.lineTo(startX + hypothenuse, height)
        context!.lineTo(startX + hypothenuse + angularWidth, 0)
        context!.lineTo(startX + angularWidth, 0)
        context!.lineTo(startX, height)

      }

      context!.closePath();
      context!.clip();

      context!.fillRect(0, 0, width, height)
      context!.drawImage(screenshot, 0, 0, width, height)

      if (rectanglePool.length === 0) {
        onExited()
        clearInterval(interval)
      } else {
        context!.restore()
      }
    }, updateFrequency / 4)
  }

  return <LoadAnimation {...props} onEnter={onEnter} onExit={onExit} />
}
*/

export const LoadAnimationSlidingSquares: React.FC<ILoadMethodProps> = (props) => {
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
        //Draw.clearRectangle()
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

export const LoadAnimationRandomSquares: React.FC<ILoadMethodProps> = (props) => {
  const { width, height }         = useWindowDimensions()
  const side                      = Math.ceil(width / 25)
  const numRows                   = Math.ceil(height / side)
  const numColumns                = Math.ceil(width / side)
  const numSquares                = numRows * numColumns
  const updateFrequency           = 5 // TODO

  const onEnter = (context: CanvasRenderingContext2D | null, onEntered: () => void) => {
    const regions                 = Utilities.shuffleArray([...Array(numSquares).keys()])

    const interval                = setInterval(() => {
      const region                = regions.shift() || 0 // TODO

      const startX                = (region % numColumns) * side
      const startY                = (Math.floor(region / numColumns)) * side

      Draw.clearRectangle(context, startX, startY, side, side)

      if (regions.length === 0) {
        onEntered()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  // TODO
  const onExit = (context: CanvasRenderingContext2D | null, onExited: () => void, screenshot: HTMLImageElement) => {
    const regions:number[]        = Utilities.shuffleArray([...Array(numSquares).keys()])
    const removedRegions:number[] = []

    const interval                = setInterval(() => {
      removedRegions.push(regions.shift() || 0) // TODO

      for (const region of removedRegions) {
        const startX              = (region % numColumns) * side
        const startY              = (Math.floor(region / numColumns)) * side

        Draw.drawRectangle(context, startX, startY, side, side, '#fdf8ed')
        Draw.drawImage(context, screenshot, startX, startY, side, side, startX, startY, side, side)
      }

      if (regions.length === 0) {
        onExited()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  return <LoadAnimation {...props} onEnter={onEnter} onExit={onExit} />
}