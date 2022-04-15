import styled from "styled-components"

interface IButtonProps {
  active: boolean
}

export const StyledTest = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > div {
    background-color: green;
    display: flex;
    flex-basis: 200px;
    flex-direction: column;
    justify-content: space-between;

    > div {
      background-color: blue;
      flex-basis: 70px;
      flex-shrink: 1;
    }
  }
`;