import styled, { keyframes } from "styled-components"

export const StyledHome = styled.div`
  display: flex;
  flex-direction:  column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  //z-index: 1;

`;

export const StyledProjectRow = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin: 0px 0px 15px 30px;

  > h1 {
    padding: 10px 0px 10px 10px;
    width: 150px;
    border-bottom: 5px solid #D8E2DC;
    margin-bottom: 5px;
    font-size: 16px;
  }

  > div {
    display: flex;
    flex-direction: row;
    margin: 10px 0px 10px 0px;
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


export const StyledProject = styled.div`
  width: 350px;
  height: 226px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  
  > div {
    width: 346px;
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
      // heeeeeeeeeeeeeeeeeeeeeeeeeer

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

      > a.explore {
        flex-basis: 2;
        flex-grow: 2;
        width: 100%;
        flex-direction: column;
      }

      > a:not(.explore) {
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
    }
   
    &:hover {
      cursor: pointer;
    }
  }

  > h1 {
    width: 320px;
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

    > h1 {
      background-color: #c2cbc6;
    }
  }
`;