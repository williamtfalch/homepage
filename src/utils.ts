export const getWebsiteDisplayName = function(name:string):string {
  const sites:Record<string,string> = {
    "github": "Github",
    "npm"   : "NPM",
    "web"   : "Web"
  }

  return sites[name]
}

export const getLanguageExtension = function(language:string):string {
  const languages:Record<string,string> = {
    "javascript": "js",
    "typescript": "ts",
    "python"    : "py"
  }

  return languages[language]
}