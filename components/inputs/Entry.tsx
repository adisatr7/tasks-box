import { BlurView } from "expo-blur"
import { useState } from "react"
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from "react-native"
import { styles } from "../../styles"
import { SvgIcon } from "../../types"
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
  ref?: React.LegacyRef<TextInput>
  onSubmitEditing? (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void
  returnKeyType?: TextInputProps["returnKeyType"]
}

export default function Entry(props: Props) {

  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [height, setHeight] = useState<number>(96)

  return (
    <>
      {props.label && (
        <Text className="text-caption text-bright-gray">{props.label}</Text>
      )}
      <BlurView
        tint="dark"
        intensity={10}
        className={`w-full my-[4px] flex-row px-[8px] py-[4px] text-left text-white rounded-md ${styles.glassInput}`}>
        {props.icon && <props.icon height={24} width={24} />}
        <TextInput
          ref={props.ref}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          blurOnSubmit={!props.onSubmitEditing}
          placeholder={props.placeholder}
          placeholderTextColor="#989898"
          value={props.value}
          onChangeText={props.setValue}
          onContentSizeChange={(e) => {
            setHeight(e.nativeEvent.contentSize.height + 20)
          }}
          multiline={props.multiline ? true : false}
          numberOfLines={props.multiline ? 4 : 1}
          textAlignVertical={props.multiline ? "top" : "auto"}
          keyboardType={props.type === "password" ? "default" : props.type}
          secureTextEntry={props.type === "password" && isHidden}
          className={`flex-1 ml-[6px] text-white
            ${Platform.OS === "android" && props.multiline && "top-[8px]"}
          `}
          style={{ height: props.multiline ? Math.max(height, 96) : 24 }}/>
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
