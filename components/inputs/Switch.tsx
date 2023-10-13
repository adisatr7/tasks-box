import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../styles"


type Props = {
  label?: string
  value: boolean
  setValue: (value: boolean) => void
}

export default function Switch({ label, value, setValue }: Props) {
  /**
   * Fungsi untuk menghandle klik pada switch.
   */
  const handleClick = () => {
    setValue(!value)
  }

  return (
    <View className="flex-row items-center justify-between w-full">
      <Text className="text-bright-gray text-caption">
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleClick}>
        <View className={`w-8 h-[20px] rounded-full bg-gray-400/50 justify-center`}>
          <View className={`w-[20px] h-[20px] transition-all duration-300 rounded-full
          ${value
            ? `bg-secondary translate-x-[12px] shadow-sm`
            : "bg-white translate-x-0"}`}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}