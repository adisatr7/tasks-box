import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function LeftArrowIcon({
  width = 24,
  height = 24,
  fill = "#989898"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="#EDEDED" d="M17 11H9.41l3.3-3.29a1.004 1.004 0 1 0-1.42-1.42l-5 5a1 1 0 0 0-.21.33 1 1 0 0 0 0 .76 1 1 0 0 0 .21.33l5 5a1.002 1.002 0 0 0 1.639-.325 1.002 1.002 0 0 0-.219-1.095L9.41 13H17a1 1 0 0 0 0-2Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
