import { Text, View } from "react-native"
import BackButton from "../buttons/BackButton"

type Props = {
  title: string
  position: "left" | "center"
}

export default function Header({ title, position = "center" }: Props) {
  return (
    <View className="flex-row items-center w-full h-fit top-[18px] mb-[8px]">
      <BackButton absolute={position === "center"} />
      <Text
        className={`text-center text-white text-heading-1 mt-[4px] line-clamp-1
          ${position === "center"
            ? "w-full"
            : "w-fit mb-[4px] ml-[6px]"
          }`}>
        {title}
      </Text>
    </View>
  )
}