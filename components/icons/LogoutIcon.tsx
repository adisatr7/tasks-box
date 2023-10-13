import { SvgXml } from "react-native-svg"
import { SvgIcon } from "../../types"


export default function LogoutIcon({ width = 24, height = 24, fill = "white" }: SvgIcon) {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="currentColor" viewBox="0 0 19 18">
    <path d="M3.5 9a.75.75 0 0 0 .75.75h5.693l-1.726 1.717a.75.75 0 0 0 0 1.066.75.75 0 0 0 1.066 0l3-3a.75.75 0 0 0 .157-.248.75.75 0 0 0 0-.57.75.75 0 0 0-.157-.248l-3-3a.753.753 0 1 0-1.066 1.066L9.944 8.25H4.25A.75.75 0 0 0 3.5 9Zm9.75-7.5h-7.5A2.25 2.25 0 0 0 3.5 3.75V6A.75.75 0 0 0 5 6V3.75A.75.75 0 0 1 5.75 3h7.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V12a.75.75 0 1 0-1.5 0v2.25a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25V3.75a2.25 2.25 0 0 0-2.25-2.25Z"/>
  </svg>`

  return <SvgXml xml={svgString} width={width} height={height} fill={fill} />
}
