import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function EditTaskIcon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M14 8a.667.667 0 0 0-.667.667v4a.667.667 0 0 1-.666.666H3.333a.667.667 0 0 1-.666-.666V3.333a.667.667 0 0 1 .666-.666h4a.667.667 0 1 0 0-1.334h-4a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h9.334a2 2 0 0 0 2-2v-4A.666.666 0 0 0 14 8ZM4 8.507v2.826a.667.667 0 0 0 .667.667h2.826a.666.666 0 0 0 .474-.193l4.613-4.62 1.893-1.854a.666.666 0 0 0 0-.946l-2.826-2.86a.667.667 0 0 0-.947 0L8.82 3.413l-4.627 4.62A.667.667 0 0 0 4 8.507Zm7.173-5.567 1.887 1.887-.947.946-1.886-1.886.946-.947Zm-5.84 5.84 3.954-3.953 1.886 1.886-3.953 3.954H5.333V8.78Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
