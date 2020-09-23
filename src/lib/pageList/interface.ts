import { isExpressionWithTypeArguments } from "typescript"

interface IPages {
  title: string,
  href: string,
  category: string[],
  difficulty: number,
  minutesOfQuestion: number,
  summary?: string,
  imgSrc?: string,
}

export default IPages;