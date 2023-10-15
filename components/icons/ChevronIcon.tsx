import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function ChevronIcon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.54 11.29 9.88 5.64a1 1 0 1 0-1.42 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.3 1.001 1.001 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
