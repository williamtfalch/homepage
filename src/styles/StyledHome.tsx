import styled, { keyframes } from "styled-components"

interface IProjectRowProps {
  offset:number,
  numProjects: number
}

interface IProjectProps {
  numProjects:number
}

export const StyledHome = styled.div`
  position: relative;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  > input {
    position: relative;
    left: calc(0.9 * 100vw - 170px);
    width: 150px;
    padding: 8px;
    background-color: #D8E2DC;
    outline: none;
    border: 2px solid #c2cbc6;
    border-radius: 5px;
  }
`;

export const StyledProjectRow = styled.div<IProjectRowProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 15px;
  position: relative;
  width: 100vw;
  //flex: 1;
  justify-content: center;

  > h2 {
    align-self: start;
    padding: 10px 20px 10px 10px;
    border-bottom: 5px solid #D8E2DC;
    margin-bottom: 5px;
    margin-left: calc(0.1 * 100vw);
    flex-shrink: 0;
  }

  > div {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    flex-basis: 1;
    flex-shrink: 1;

    > div:first-of-type {
      display: flex;
      flex-direction: row;
      position: relative;
      left: calc((0.1 + ${props => props.offset} * (${props => (-0.8 / props.numProjects)} - 0.005)) * 100vw);
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

const moveDown = keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(calc(-100%));
  }
`;

const moveUp = keyframes`
  from {
    transform: translateY(calc(-100%));
  }

  to {
    transform: translateY(0%);
  }
`;


export const StyledProject = styled.div<IProjectProps>`
  width: calc(${props => ((0.8 - (0.01 * (props.numProjects - 1))) / props.numProjects)} * 100vw);
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 0px calc(0.01 * 100vw) 0px 0px;
  display: flex;
  flex: 1;
  flex-direction: column;

  > div:first-of-type {
    width: calc((${props => ((0.8 - (0.01 * (props.numProjects - 1))) / props.numProjects)} * 100vw) - 4px);
    overflow: hidden;
    border: 2px solid #D8E2DC;
    position: relative;
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 160px;

    div {
      height: 160px;
      animation: ${moveUp} 0.33s 1 forwards;
      display: flex;
      flex-direction: column;
    }

    > div:first-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > div:last-of-type {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      align-items: center;

      > a {
        display: flex;
        width: 100%;
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
        flex: 2;
      }

      > a:not(.grow) {
        flex: 1;

        > img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
   
    &:hover {
      cursor: pointer;
    }
  }

  > div:last-of-type {
    width: inherit;
    display: flex;
    flex: 1;
    flex-basis: 40px;
    align-items: center;

    border-top: none;
    background-color: #D8E2DC;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    > p {
      text-align: left;
      padding-left: 15px;
    }
  }


  &:hover {
    > div:first-child {
      border-color: #c2cbc6;

      > * {
        animation: ${moveDown} 0.33s 1 forwards;
      }
    }

    > div:last-of-type {
      background-color: #c2cbc6;
    }
  }
`;