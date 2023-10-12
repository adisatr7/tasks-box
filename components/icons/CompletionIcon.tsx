import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"

export default function CompletionIcon({
  width = 24,
  height = 24,
  fill = "#989898"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="currentColor" viewBox="0 0 13 14">
    <path d="M7.204 7.12a2.665 2.665 0 0 0 .921-2.016 2.708 2.708 0 0 0-5.417 0A2.665 2.665 0 0 0 3.63 7.12a4.333 4.333 0 0 0-2.546 3.944.542.542 0 1 0 1.084 0 3.25 3.25 0 1 1 6.5 0 .542.542 0 1 0 1.083 0A4.333 4.333 0 0 0 7.205 7.12Zm-1.787-.39a1.625 1.625 0 1 1 0-3.25 1.625 1.625 0 0 1 0 3.25Zm6.343-1.285a.542.542 0 0 0-.77 0L9.907 6.53l-.336-.341a.542.542 0 1 0-.769.763l.726.726a.542.542 0 0 0 .764 0l1.446-1.446a.542.542 0 0 0 .022-.786Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
