export type Projects = {
  name: string;
  description: string;
  url: string;
  icons?: Icon[]
}
  
export type Icon = {
  name: string;
  url: string;
}

export type Message = {
  sender: "user" | "system", 
  content: string
}