import { Text, TouchableOpacity } from "react-native"
import { SvgIcon } from "../../types"


type Props = {
  label: string
  icon?: React.FC<SvgIcon>
  onClick?: () => void
  className?: string
}

export default function LongButton({ label, icon: Icon, onClick, className }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onClick}
      className={`flex-row items-center justify-center bg-primary py-[6px] my-[4px] rounded-[6px] ${className}`}>
      {Icon && <Icon fill="white" />}
      <Text className="flex-row font-bold mx-[8px] text-center text-white w-fit text-caption">
        {label}
      </Text>
    </TouchableOpacity>
  )
}