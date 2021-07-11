import React from "react";
import styled, { keyframes } from "styled-components"
import {getWebsiteDisplayName} from '../utils'
import { IProject } from '../interfaces'

const move = keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-102%);
  }
`;

const move2 = keyframes`
  from {
    transform: translateY(-100%);
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
      width: inherit;
      height: inherit;
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
        flex-basis: 2;
        flex-grow: 2;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #e3dfd5;
          border: 1px solid #e3dfd5;
        }

        &:active {
          background-color: #cac6bd;
          border: 1px solid #e3dfd5;
        }
      }

      > span {
        flex-basis: 1;
        flex-grow: 1;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #e3dfd5;
          border: 1px solid #e3dfd5;
        }

        &:active {
          background-color: #cac6bd;
          border: 1px solid #e3dfd5;
        }

        > a {
          
        }

        > img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }

      > a, > span {
        border: 1px solid #fdf8ed;
      }

      > a, > span:not(:last-child) {
        border-bottom: 1px solid #D8E2DC;
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
  const image                         = require(`../static/${props.imageSource}`).default
  const pageInProps                   = ("page" in props) ? true : false
 
  return (
    <ProjectContainer>
      <div>
        <img src={image} />    
        <div>
          {
            pageInProps &&
              <a onClick={() => props.onProjectClick(props.page ? props.page : "")}>Explore</a>
          }

          {
            props.links.map(link => {
              const logo = require(`../static/${link.type}.png`).default

              return (
                <span key={link.type}>
                  <img src={logo} />
                  <a href={link.url}>{getWebsiteDisplayName(link.type)}</a>
                </span>
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