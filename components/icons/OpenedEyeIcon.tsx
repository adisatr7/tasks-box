import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"

export default function OpenedEyeIcon({
  width = 24,
  height = 24,
  fill = "#989898"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" viewBox="0 0 24 25">
    <path fill="#fff" d="M21.92 12.1C19.9 7.41 16.1 4.5 12 4.5s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.59 7.9 20.5 12 20.5s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8ZM12 18.5c-3.17 0-6.17-2.29-7.9-6 1.73-3.71 4.73-6 7.9-6s6.17 2.29 7.9 6c-1.73 3.71-4.73 6-7.9 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
