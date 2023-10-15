import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function CalendarIcon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" fill="currentColor" viewBox="0 0 17 18">
    <path d="M13.458 3.333h-1.416v-.708a.708.708 0 1 0-1.417 0v.708h-4.25v-.708a.708.708 0 0 0-1.417 0v.708H3.542a2.125 2.125 0 0 0-2.125 2.125v8.5a2.125 2.125 0 0 0 2.125 2.125h9.916a2.125 2.125 0 0 0 2.125-2.125v-8.5a2.125 2.125 0 0 0-2.125-2.125Zm.709 10.625a.708.708 0 0 1-.709.709H3.542a.709.709 0 0 1-.709-.709V9h11.334v4.958Zm0-6.375H2.833V5.458a.708.708 0 0 1 .709-.708h1.416v.708a.708.708 0 1 0 1.417 0V4.75h4.25v.708a.708.708 0 1 0 1.417 0V4.75h1.416a.708.708 0 0 1 .709.708v2.125Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
