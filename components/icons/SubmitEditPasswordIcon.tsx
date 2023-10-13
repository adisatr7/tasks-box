import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function SubmitEditPasswordIcon({
  width = 24,
  height = 24,
  fill = "white"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
    <path d="M10.5 11.625H8.25v-.75a.75.75 0 0 1 1.41-.375.75.75 0 0 0 1.027.255.75.75 0 0 0 .255-1.005 2.305 2.305 0 0 0-.345-.442A2.249 2.249 0 0 0 9 8.625a2.25 2.25 0 0 0-2.25 2.25v.885a2.25 2.25 0 0 0 .75 4.365h3a2.25 2.25 0 1 0 0-4.5Zm0 3h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 0 1 0 1.5Zm3.315-9.585a5.25 5.25 0 0 0-10.02 1.418 3 3 0 0 0-.285 5.745.846.846 0 0 0 .24.037.759.759 0 1 0 .24-1.5A1.5 1.5 0 0 1 3 9.375a1.5 1.5 0 0 1 1.5-1.5.75.75 0 0 0 .75-.75 3.75 3.75 0 0 1 7.297-1.207.75.75 0 0 0 .585.502 2.25 2.25 0 0 1 .75 4.148.753.753 0 0 0 .75 1.305A3.75 3.75 0 0 0 16.5 8.625a3.75 3.75 0 0 0-2.685-3.585Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
