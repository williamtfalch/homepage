export interface IProject {
  id: string,
  title: string,
  description: string,
  type: string,
  capacity: string,
  tags: string[],
  numPreviews: number,
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
  pageRef: React.Ref<HTMLDivElement>
}

export interface ILoadMethodProps {
  project: string | undefined,
  status: IProjectStatus,
  setStatus: (status:IProjectStatus) => void,
  pageRef: React.Ref<HTMLDivElement>,
  children: React.ReactNode
}

export interface ILoadAnimationProps {
  project: string | undefined,
  status: IProjectStatus,
  setStatus: (status:IProjectStatus) => void,
  pageRef: React.Ref<HTMLDivElement>,
  onEnter: (context: CanvasRenderingContext2D | null, onEntered: () => void) => void,
  onExit: (context: CanvasRenderingContext2D | null, onEntered: () => void, screenshot: HTMLImageElement) => void
}