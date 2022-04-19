import styled from "styled-components"

interface IButtonProps {
  active: boolean
}

export const StyledExplore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  > div { 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(192px * 6);
  
  
    @media (max-width: calc(192px * 6.5)), (max-height: calc(96px * 6.5)) {
      width: calc(192px * 5);
    }

    @media (max-width: calc(192px * 5.5)), (max-height: calc(96px * 5.5)) {
      width: calc(192px * 4);
    }

    @media (max-width: calc(192px * 4.5)), (max-height: calc(96px * 4.5)) {
      width: calc(192px * 3);
    }
  }
`;

export const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;

  > div:first-of-type {
    width: inherit;
    border: 2px solid #D8E2DC;
    border-radius: 2px;
    position: relative;
    display: flex;
    height: calc(96px * 6);

    @media (max-width: calc(192px * 6.5)), (max-height: calc(96px * 6.5)) {
      width: calc(192px * 5);
      height: calc(96px * 5);
    }

    @media (max-width: calc(192px * 5.5)), (max-height: calc(96px * 5.5)) {
      width: calc(192px * 4);
      height: calc(96px * 4);
    }

    @media (max-width: calc(192px * 4.5)), (max-height: calc(96px * 4.5)) {
      width: calc(192px * 3);
      height: calc(96px * 3);
    }

    > img {
      position: relative;
      width: inherit;
      height: inherit;
      z-index: 1200;
    }

    > div {
      position: fixed;
      top:calc(-100% - 40px); right:-100%; left:-100%; bottom:-100%;
      margin:auto;
      animation: loading 2s linear infinite;
      border: 1px solid #cca254;
      border-left: 1px solid transparent;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      z-index: 1100;
    }

    @keyframes loading {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }

  > div:last-of-type {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
`;

export const StyledPreviewButton = styled.div<IButtonProps>`
  height: 6px;
  margin: 6px;
  background-color: ${props => props.active ? "#c2cbc6" : "#D8E2DC"};
  border-radius: 2px;
  flex-grow: 1;
`;

export const StyledInformation = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div:first-of-type {
    margin: 10px 10px 0px 5px;
    display: flex;
    flex-direction: column;
    flex: 4 4 4;

    > p {
      line-height: 22px;
    }

    > span:last-child {
      margin-top: 10px;
      font-size: 13px;
      opacity: 0.7;
    }
  }

  > div:last-of-type {
    display: flex;
    flex: 1 1 1;

    > a {
      position: relative;
      right: 0px;
      margin-top: 10px;
    }
  }
`;

export const StyledInformationButton = styled.a<IButtonProps>`
  width: 150px;
  padding: 10px;
  color: ${props => props.active ? "#fff" : "#2b2d2c"};
  background-color: ${props => props.active ? "#cc0000" : "#D8E2DC"};
  border: ${props => props.active ? "1px solid #cc0000" : "1px solid #e3dfd5"};
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: inherit;

  > h1 {
    padding: 0px 80px 4px 10px;
    border-bottom: 4px solid #D8E2DC;
    margin-bottom: 20px;
    color: #2b2d2c;
  }

`;

export const StyledBackButton = styled.div`
  position: relative;
  left: 10px;
  width: 50px;
  height: 50px;
  background-color: #fdf8ed;
  cursor: pointer;

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
    > div {
      background-color: #979e9a;
    }
  }
`;
