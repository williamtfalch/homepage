import styled, { keyframes } from "styled-components"

interface IProjectRowProps {
  offset:number,
  numProjects: number
}

interface IProjectProps {
  numProjects:number
}

export const StyledHome = styled.div`
  display: flex;
  flex-direction:  column;
  position: relative;
  z-index: 1000;
  width: 100vw;
  height: 100vh;

  > div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const StyledProjectRow = styled.div<IProjectRowProps>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 15px;
  position: relative;
  width: 100vw;

  > h2 {
    padding: 10px 0px 10px 10px;
    width: 150px;
    border-bottom: 5px solid #D8E2DC;
    margin-bottom: 5px;
    margin-left: calc(0.1 * 100vw);
    //background-color: blue;
  }

  > div {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;

    > div:first-of-type {
      //background-color: green;
      display: flex;
      flex-direction: row;
      position: relative;
      left: calc((0.1 + ${props => props.offset} * (${props => (-0.8 / props.numProjects)} - 0.005)) * 100vw); // TODO
      transition: left 0.3s;
    }

    > div.gradient_left, div.gradient_right {
      position: absolute;
      width: calc(0.1 * 100vw);
      height: 100%;
      z-index: 1100;
      cursor: pointer;

      > div {
        width: 30px;
        height: 5px;
        background-color: #c2cbc6;
        border-radius: 5px;
        position: absolute;
      }

      > div:nth-child(1) {
        transform: rotate(60deg);
      }

      > div:nth-child(2) {
        transform: rotate(-60deg);
      }
    }

    > div.gradient_left {
      background-image: linear-gradient(to right, rgba(253, 248, 237,1), rgba(253, 248, 237,0));
      left: 0px;

      > div {
        left: calc(0.03 * 100vw);
      }

      > div:nth-child(2) {
        top: 90px;
      }

      > div:nth-child(1) {
        top: 112px;
      }
    }

    > div.gradient_right {
      background-image: linear-gradient(to right, rgba(253, 248, 237,0), rgba(253, 248, 237,1));
      right: 0px;

      > div {
        right: calc(0.03 * 100vw);
      }

      > div:nth-child(1) {
        top: 90px;
      }

      > div:nth-child(2) {
        top: 112px;
      }
    }
  }
`;

const move = keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(calc(-100% - 3px));
  }
`;

const move2 = keyframes`
  from {
    transform: translateY(calc(-100% - 3px));
  }

  to {
    transform: translateY(0%);
  }
`;


export const StyledProject = styled.div<IProjectProps>`
  width: calc(${props => ((0.8 - (0.01 * (props.numProjects - 1))) / props.numProjects)} * 100vw);
  height: 226px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0px calc(0.01 * 100vw) 0px 0px;
  //background-color: red;
  
  > div {
    width: calc((${props => ((0.8 - (0.01 * (props.numProjects - 1))) / props.numProjects)} * 100vw) - 4px);
    overflow: hidden;
    border: 2px solid #D8E2DC;
    position: relative;
  }

  > div:first-child {
    height: 178px;
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    > * {
      width: 100%;
      height: 100%;
      animation: ${move2} 0.33s 1 forwards;
    }

    > img {
      object-fit: none;
    }

    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      > a {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #D8E2DC;

        &:hover {
          background-color: #e3dfd5;
        }

        &:active {
          background-color: #cac6bd;
        }
      }

      > a:last-child {
        border-bottom: none;
      }

      > a.grow {
        flex-basis: 2;
        flex-grow: 2;
        width: 100%;
        flex-direction: column;
      }

      > a:not(.grow) {
        flex-basis: 1;
        flex-grow: 1;
        position: relative;
        flex-direction: row;

        > img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }

      > div {
        display: flex;
        flex-direction: row;
      }
    }
   
    &:hover {
      cursor: pointer;
    }
  }

  > h3 {
    width: calc((${props => ((0.8 - (0.01 * (props.numProjects - 1))) / props.numProjects)} * 100vw) - 30px);
    border-top: none;
    background-color: #D8E2DC;
    color: #2b2d2c;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: left;
    padding: 15px;
    font-size: 16px;
  }

  &:hover {
    > div {
      border-color: #c2cbc6;
    }

    > div:first-child {
      > * {
        animation: ${move} 0.33s 1 forwards;
      }
    }

    > h3 {
      background-color: #c2cbc6;
    }
  }
`;