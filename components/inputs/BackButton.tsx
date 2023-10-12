import { Text, TouchableOpacity } from "react-native"
import LeftArrowIcon from "../icons/LeftArrowIcon"


type Props = {
  onClick?: () => void
  className?: string
}

export default function BackButton({ onClick, className }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      className={`flex-row justify-center items-center py-[6px] pb-[12px] rounded-full absolute ${className}`}>
      <LeftArrowIcon width={32} height={32} fill="white" />
    </TouchableOpacity>
  )
}
