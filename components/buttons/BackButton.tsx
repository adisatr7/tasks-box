import { Keyboard, TouchableOpacity } from "react-native"
import LeftArrowIcon from "../icons/LeftArrowIcon"
import { router } from "expo-router"


type Props = {
  onClick?: () => void
  className?: string
  absolute?: boolean
}

export default function BackButton({ onClick, className, absolute }: Props) {
  /**
   * Handler untuk tombol Back.
   */
  const handleClick = () => {
    Keyboard.dismiss()

    // Jika ada prop handler yang diberikan, jalankan.
    if (onClick) {
      onClick()
    }

    // Jika tidak ada, kembali ke halaman sebelumnya.
    else {
      router.back()
    }
  }


  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleClick}
      className={`flex-row justify-center items-center py-[6px] pb-[6px] rounded-full ${absolute && "absolute"} z-20 ${className}`}>
      <LeftArrowIcon width={32} height={32} fill="white"/>
    </TouchableOpacity>
  )
}
