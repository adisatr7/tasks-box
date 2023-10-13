import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function SubmitEditUserIcon({
  width = 24,
  height = 24,
  fill = "white"
}: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
    <path d="M13.815 6.165a5.25 5.25 0 0 0-10.02 1.418A3 3 0 0 0 4.5 13.5a.75.75 0 1 0 0-1.5 1.5 1.5 0 1 1 0-3 .75.75 0 0 0 .75-.75 3.75 3.75 0 0 1 7.297-1.207.75.75 0 0 0 .585.502 2.25 2.25 0 0 1 .18 4.38.751.751 0 0 0 .376 1.455 3.75 3.75 0 0 0 .127-7.215ZM9.532 7.718a.75.75 0 0 0-.247-.158.75.75 0 0 0-.57 0 .75.75 0 0 0-.248.158l-2.25 2.25a.753.753 0 1 0 1.065 1.065l.968-.976v4.193a.75.75 0 1 0 1.5 0v-4.193l.967.976a.75.75 0 0 0 1.23-.244.75.75 0 0 0-.164-.821l-2.25-2.25Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
