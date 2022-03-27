import React from "react";
import styled, { keyframes } from "styled-components"
import {getWebsiteDisplayName} from '../utils'
import { IProject } from '../interfaces'

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

const ProjectContainer = styled.div`
  width: 350px;
  height: 260px;

  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  
  > div {
    width: 346px;
    overflow: hidden;
    border: 2px solid #D8E2DC;
    position: relative;
  }

  > div:first-child {
    height: 178px;
    border-bottom: none;

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

  > div:last-child {
    height: 78px;
    border-top: none;
    background-color: #D8E2DC;
    color: #2b2d2c;

    > h3 {
      text-align: left;
      padding: 10px;
    }

    > p { 
      padding: 0px 10px;
      text-align: left;
    }
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

    > div:last-child {
      background-color: #c2cbc6;
    }
  }
`;

interface IPropjectProps extends IProject {
  onProjectClick:(projectName:string) => void
}

/////////////////////////

const Project:React.FunctionComponent<IPropjectProps> = (props) => {
  const image = require(`../static/${props.imageSource}`).default
 
  return (
    <ProjectContainer>
      <div>
        <img src={image} />    
        <div>
          {
            ("page" in props) &&
              <a onClick={() => props.onProjectClick(props.page as string)} className="explore">Explore</a>
          }

          {
            props.links.map(link => {
              const logo = require(`../static/${link.type}.png`).default

              return (
                <a key={link.type} href={link.url}>
                  <img src={logo} />
                  <span>{getWebsiteDisplayName(link.type)}</span>
                </a>
              )
            })
          }

        </div>
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </ProjectContainer>
  )
}

export default Project