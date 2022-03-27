import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { useWindowDimensions } from '../hooks'
import styled from "styled-components"
import { toPng } from 'html-to-image'

interface ProjectLoaderProps {
  shouldEnter: boolean,
  shouldExit: boolean,
  hasExited: boolean,
  setHasEntered: (hasEntered: boolean) => void,
  setHasExited: (hasExited: boolean) => void,
  children: React.ReactNode,
  homeRef: React.Ref<HTMLDivElement>
}

interface ICanvasProps {
  displayCanvas: boolean
}

////////////////////////


interface IEntranceProps {
  left: number
}

const EntranceContainer = styled.div<IEntranceProps>`
  position: absolute;
  left: ${props => props.left};
`;


/////////////////////////

const LoadLeft: React.FC<ProjectLoaderProps> = ({ shouldEnter, children }) => {
  const { width } = useWindowDimensions()
  const [magnitude, setMagnitude] = useState(width)

  useEffect(() => {
    setMagnitude(magnitude * (shouldEnter ? 1 : -1))
  }, [shouldEnter])


  // TODO fix x: shouldEnter

  return (
    <AnimatePresence>
      <motion.div animate={{ x: shouldEnter ? 0 : magnitude }} transition={{ duration: 1 }} initial={false} >
        <EntranceContainer left={width}>
          {
            children
          }
        </EntranceContainer>
      </motion.div>
    </AnimatePresence>
  )
}

const Load = (props: ProjectLoaderProps) => (
  <>
    {
      props.children
    }
  </>
)




////////////////////////

const LoadAnimationContainer = styled.div<ICanvasProps>`
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

interface LoadAnimationProps extends ProjectLoaderProps {
  onEnter: (context: CanvasRenderingContext2D | null, onEntered: () => void) => void,
  onExit: (context: CanvasRenderingContext2D | null, onEntered: () => void, screenshot: HTMLImageElement) => void
}

const LoadAnimation: React.FC<LoadAnimationProps> = ({ shouldEnter, shouldExit, setHasEntered, setHasExited, homeRef, children, onEnter, onExit }) => {
  const { width, height } = useWindowDimensions()
  const [screenshotHasLoaded, setScreenshotHasLoaded] = useState(false)
  const [hideOverlay, setHideOverlay] = useState(true)
  const [image, setImage] = useState<HTMLImageElement>(new Image())
  const canvasRef = useRef(null)
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D | null

  const onScreenshotReady = (screenshot: HTMLImageElement) => {
    canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
    context = canvas.getContext('2d')

    context!.fillStyle = '#fdf8ed'
    context!.fillRect(0, 0, width, height)
    context!.drawImage(screenshot, 0, 0)

    setImage(screenshot)
    setHideOverlay(false)
    setScreenshotHasLoaded(true)
  }

  useEffect(() => {
    if (shouldEnter) {
      if (homeRef && "current" in homeRef && homeRef.current) {
        const elem: HTMLDivElement = homeRef.current

        toPng(elem)
          .then(function (dataUrl) {
            const img = new Image()
            img.src = dataUrl
            img.onload = () => onScreenshotReady(img)
          })
      }
    }
  }, [shouldEnter])


  useEffect(() => {
    if (screenshotHasLoaded) {
      canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
      context = canvas.getContext('2d')

      onEnter(
        context,
        () => {
          setHideOverlay(true)
          setHasEntered(true)
        }
      )
    }
  }, [screenshotHasLoaded])

  useEffect(() => {
    if (shouldExit) {
      setHideOverlay(false)

      canvas = canvasRef.current as unknown as HTMLCanvasElement // crazy stuff
      context = canvas.getContext('2d')

      onExit(
        context,
        () => {
          setHideOverlay(true)
          setHasExited(true)
        },
        image
      )
    }
  }, [shouldExit])

  return (
    <LoadAnimationContainer displayCanvas={screenshotHasLoaded && !hideOverlay}>
      <canvas ref={canvasRef} width={width} height={height} />
      {
        screenshotHasLoaded &&
        children
      }
    </ LoadAnimationContainer>
  )
}

const LoadAnimationRandomSquares: React.FC<ProjectLoaderProps> = (props) => {
  const { width, height } = useWindowDimensions()
  const side = Math.ceil(width / 25)
  const numRows = Math.ceil(height / side)
  const numColumns = Math.ceil(width / side)
  const updateFrequency = 5

  const onEnter = (context: CanvasRenderingContext2D | null, onEntered: () => void) => {
    const regions = Array.from(Array(numRows * numColumns).keys())

    const interval = setInterval(() => {
      const region = regions.splice(Math.floor(Math.random() * regions.length), 1)[0]
      const x = region % numColumns
      const y = Math.floor(region / numColumns)

      context!.clearRect(x * side, y * side, side, side)

      if (regions.length === 0) {
        onEntered()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  const onExit = (context: CanvasRenderingContext2D | null, onExited: () => void, screenshot: HTMLImageElement) => {
    const remainingRegions = Array.from(Array(numRows * numColumns).keys())
    context!.fillStyle = '#fdf8ed'

    const interval = setInterval(() => {
      const appliedRegion = remainingRegions.splice(Math.floor(Math.random() * remainingRegions.length), 1)[0]
      const x = appliedRegion % numColumns
      const y = Math.floor(appliedRegion / numColumns)

      context!.fillRect(x * side, y * side, side, side)
      context!.drawImage(screenshot, x * side, y * side, side, side, x * side, y * side, side, side);

      if (remainingRegions.length === 0) {
        onExited()
        clearInterval(interval)
      }
    }, updateFrequency)
  }

  return <LoadAnimation {...props} onEnter={onEnter} onExit={onExit} />
}


const LoadAnimationSlidingSquares: React.FC<ProjectLoaderProps> = (props) => {
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



const LoadAnimationClipDiagonally: React.FC<ProjectLoaderProps> = (props) => {
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
      if (rectanglePool.length === 0) {
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














////////////////////////



const ProjectLoader: React.FC<ProjectLoaderProps> = (props) => {
  const loadMethods: React.FC<ProjectLoaderProps>[] = [LoadLeft, Load, LoadAnimationRandomSquares, LoadAnimationSlidingSquares, LoadAnimationClipDiagonally]
  const LoadMethod: React.FC<ProjectLoaderProps> = LoadAnimationClipDiagonally

  const getLoader = (): React.FunctionComponent<ProjectLoaderProps> => (
    loadMethods[Math.floor(Math.random() * loadMethods.length)]
  )

  return (
    <>
      <LoadMethod {...props} />
    </>
  )
}

export default ProjectLoader