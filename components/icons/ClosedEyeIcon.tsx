import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"

export default function ClosedEyeIcon({
  width = 24,
  height = 24,
  fill = "#989898"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" viewBox="0 0 24 25">
    <path fill="#fff" d="M10.94 6.58A6.93 6.93 0 0 1 12 6.5c3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 0 1-.9 1.64 1 1 0 0 0 .05 1.152 1 1 0 0 0 1.65-.102c.466-.732.87-1.501 1.21-2.3a1 1 0 0 0 0-.79C19.9 7.41 16.1 4.5 12 4.5a7.77 7.77 0 0 0-1.4.12 1.014 1.014 0 1 0 .34 2v-.04ZM3.71 2.79a1.004 1.004 0 1 0-1.42 1.42l3.1 3.09a14.62 14.62 0 0 0-3.31 4.8 1 1 0 0 0 0 .8C4.1 17.59 7.9 20.5 12 20.5a9.26 9.26 0 0 0 5.05-1.54l3.24 3.25a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095l-18-18Zm6.36 9.19 2.45 2.45a2 2 0 0 1-2.45-2.45ZM12 18.5c-3.18 0-6.17-2.29-7.9-6a12.09 12.09 0 0 1 2.7-3.79l1.77 1.79A4 4 0 0 0 14 15.93l1.59 1.57a7.24 7.24 0 0 1-3.59 1Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
