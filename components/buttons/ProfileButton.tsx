import { Text, TouchableOpacity } from "react-native"
import ChevronIcon from "../icons/ChevronIcon"


type Props = {
  label: string
  onClick?: () => void
}

export default function ProfileButton({ label, onClick }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      className={`flex-row items-center justify-between bg-transparent border border-transparent border-b-dark-gray/80 py-[8px] my-[6px]`}>
      <Text className="flex-row ml-[4px] text-left text-white w-fit text-body">
        {label}
      </Text>
      <ChevronIcon/>
    </TouchableOpacity>
  )
}