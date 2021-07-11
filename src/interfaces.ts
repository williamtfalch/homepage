export interface IProject {
  title:string,
  description:string,
  tags:string[],
  type:string,
  imageSource:string,
  page?:string,
  links:Record<string,string>[],
}