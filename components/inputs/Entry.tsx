import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { twMerge } from "tailwind-merge"
import { styles } from "../../styles"
import { SvgIcon } from "../../types"
import { BlurView } from "expo-blur"
import { useState } from "react"
import ClosedEyeIcon from "../icons/ClosedEyeIcon"
import OpenedEyeIcon from "../icons/OpenedEyeIcon"


type Props = {
  label?: string
  placeholder?: string
  value?: string
  type?: TextInputProps["keyboardType"] | "password"
  setValue?(value: string): void
  icon?: React.FC<SvgIcon>
  multiline?: boolean
}

export default function Entry(props: Props) {

  const [isHidden, setIsHidden] = useState<boolean>(true)

  return (
    <>
      {props.label && (
        <Text className="text-caption text-bright-gray">{props.label}</Text>
      )}
      <BlurView
        tint="dark"
        intensity={10}
        className={`w-full my-[4px] flex-row px-[8px] py-[4px] text-left text-white rounded-md items-center ${styles.glassInput}`}>
        {props.icon && <props.icon height={24} width={24} />}
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor="#989898"
          value={props.value}
          onChangeText={props.setValue}
          multiline={props.multiline ? true : false}
          numberOfLines={props.multiline ? 4 : 1}
          keyboardType={props.type === "password" ? "default" : props.type}
          secureTextEntry={props.type === "password" && isHidden}
          className={`flex-1 ml-[6px] text-white
          ${props.multiline ? "h-[96px]" : "h-[24px]"}
        `} />
        {props.type === "password" && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsHidden(!isHidden)}>
            {isHidden ? (
              <OpenedEyeIcon fill="#EFEFEF" />
            ) : (
              <ClosedEyeIcon fill="#EFEFEF" />
            )}
          </TouchableOpacity>
        )}
      </BlurView>
    </>
  )
}
