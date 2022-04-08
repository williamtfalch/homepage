import styled from "styled-components"

interface IButtonProps {
  active: boolean
}

export const StyledExplore = styled.div`
  width: 100vw;
  height: 100vh;
  > div { 
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: flex-start;
    width: calc(192px * 4);
  }
`;

export const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;

  > img {
    width: calc(inherit - 4px);
    border: 2px solid #D8E2DC;
    border-radius: 2px;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

  > div {
    display: flex;
    flex-direction: column;
    padding: 0px 10px;

    > span {
      margin: 10px 0px 10px 10px;
      color: #2b2d2c;
    }

    > span:last-child {
      font-size: 13px;
      opacity: 0.7;
    }

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

  > span {
    padding: 10px;
    font-weight: normal;
    color: #2b2d2c;
    font-size: 14px;
    cursor: pointer;
    align-self: flex-start;
  }
`;