import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function FinishTaskIcon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" fill="currentColor" viewBox="0 0 17 18">
    <path d="m10.122 8.143-2.33 2.337-.914-.92a.711.711 0 0 0-1.006 1.005l1.417 1.417a.707.707 0 0 0 1.006 0l2.833-2.833a.711.711 0 1 0-1.006-1.006Zm3.336-3.747H9.01l-.227-.708A2.125 2.125 0 0 0 6.772 2.27h-3.23a2.125 2.125 0 0 0-2.125 2.125v9.208a2.125 2.125 0 0 0 2.125 2.125h9.916a2.125 2.125 0 0 0 2.125-2.125V6.521a2.125 2.125 0 0 0-2.125-2.125Zm.709 9.208a.708.708 0 0 1-.709.709H3.542a.708.708 0 0 1-.709-.709V4.396a.708.708 0 0 1 .709-.708h3.23a.708.708 0 0 1 .673.481l.382 1.162a.708.708 0 0 0 .673.481h4.958a.708.708 0 0 1 .709.709v7.083Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
