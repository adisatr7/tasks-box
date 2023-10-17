import { Alert, Text, TouchableOpacity } from "react-native"
import ChevronIcon from "../icons/ChevronIcon"


type Props = {
  label: string
  disabled?: boolean
  onClick?: () => void
}

export default function ProfileButton({ label, onClick, disabled=false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (!disabled)
          onClick()
        else
          Alert.alert(
            "Fitur belum tersedia",
            "Maaf, fitur ini belum tersedia pada versi demo aplikasi ini.",
          )
      }}
      className={`flex-row items-center justify-between bg-transparent border border-transparent border-b-dark-gray/80 py-[8px] my-[6px]`}>
      <Text
        className={`flex-row ml-[4px] text-left w-fit text-body
          ${disabled ? "text-dark-gray" : "text-white"}
        `}>
        {label}
      </Text>
      <ChevronIcon fill={disabled ? "#989898" : "white"}/>
    </TouchableOpacity>
  )
}