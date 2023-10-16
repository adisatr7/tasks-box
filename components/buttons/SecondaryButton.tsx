import { Keyboard, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { SvgIcon } from "../../types"


type Props = {
  label: string
  icon?: React.FC<SvgIcon>
  onClick?: () => void
  style?: StyleProp<ViewStyle>
}

export default function SecondaryButton({ label, icon: Icon, onClick, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        Keyboard.dismiss()
        onClick && onClick()
      }}
      style={style}
      className={`flex-row items-center justify-center bg-white py-[6px] my-[4px] rounded-[6px] px-[14px] shadow-sm`}>
      {Icon && <Icon fill="#4B5FC7" />}
      <Text className="flex-row font-bold ml-[8px] text-center text-secondary w-fit text-caption">
        {label}
      </Text>
    </TouchableOpacity>
  )
}