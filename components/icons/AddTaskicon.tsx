import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function AddTaskicon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 17 17">
    <path d="M9.917 8.854h-.709v-.708a.708.708 0 1 0-1.416 0v.708h-.709a.708.708 0 1 0 0 1.417h.709v.708a.708.708 0 0 0 1.416 0v-.708h.709a.708.708 0 1 0 0-1.417Zm3.541-4.958H9.01l-.227-.708A2.125 2.125 0 0 0 6.772 1.77h-3.23a2.125 2.125 0 0 0-2.125 2.125v9.208a2.125 2.125 0 0 0 2.125 2.125h9.916a2.125 2.125 0 0 0 2.125-2.125V6.021a2.125 2.125 0 0 0-2.125-2.125Zm.709 9.208a.708.708 0 0 1-.709.709H3.542a.708.708 0 0 1-.709-.709V3.896a.708.708 0 0 1 .709-.708h3.23a.708.708 0 0 1 .673.481l.382 1.162a.708.708 0 0 0 .673.481h4.958a.708.708 0 0 1 .709.709v7.083Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
