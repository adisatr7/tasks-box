import { Text, TouchableOpacity } from "react-native"
import LogoutIcon from "../icons/LogoutIcon"


type Props = {
  label: string
  onClick?: () => void
  className?: string
}

export default function LogoutButton({ label, onClick, className }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      className={`flex-row items-center justify-center bg-white/[18%] py-[6px] my-[4px] rounded-[6px] shadow-sm ${className}`}>
      <LogoutIcon width={18} height={18} fill="#FF352B"/>
      <Text className="flex-row mx-[8px] text-center text-[#FF352B] w-fit text-body">
        {label}
      </Text>
    </TouchableOpacity>
  )
}