export interface IProject {
  title: string,
  description: string,
  tags: string[],
  type: string,
  imageSource: string,
  page?: string,
  links: {
    type: string,
    url: string,
  }[]
}

export interface IProjectStatus {
  shouldEnter: boolean,
  hasEntered: boolean,
  shouldExit: boolean,
  hasExited: boolean
}

export interface IProjectProps {
  project: string | undefined,
  status: IProjectStatus,
  setStatus: (status:IProjectStatus) => void,
  homeRef: React.Ref<HTMLDivElement>
}

export interface ILoadMethodProps {
  project: string | undefined,
  status: IProjectStatus,
  setStatus: (status:IProjectStatus) => void,
  homeRef: React.Ref<HTMLDivElement>,
  children: React.ReactNode
}

export interface ILoadAnimationProps {
  project: string | undefined,
  status: IProjectStatus,
  setStatus: (status:IProjectStatus) => void,
  homeRef: React.Ref<HTMLDivElement>,
  onEnter: (context: CanvasRenderingContext2D | null, onEntered: () => void) => void,
  onExit: (context: CanvasRenderingContext2D | null, onEntered: () => void, screenshot: HTMLImageElement) => void
}