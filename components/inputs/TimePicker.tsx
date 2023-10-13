import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { twMerge } from "tailwind-merge"
import { styles } from "../../styles"
import { SvgIcon } from "../../types"
import { BlurView } from "expo-blur"
import { useState } from "react"
import ClosedEyeIcon from "../icons/ClosedEyeIcon"
import OpenedEyeIcon from "../icons/OpenedEyeIcon"
import RNDateTimePicker from "@react-native-community/datetimepicker"


type Props = {
  label?: string
  placeholder?: string
  value: Date
  setValue(value: Date): void
  icon?: React.FC<SvgIcon>
  multiline?: boolean
}

export default function TimePicker(props: Props) {

  // ! Implementasi Android lebih diutamakan. Jika suatu saat ingin melanjutkan, lanjutkan utk iOS juga!

  /**
   * State untuk menampilkan atau menyembunyikan Date Picker.
   */
  const [isPickerShown, setIsPickerShown] = useState<boolean>(false)

  /**
   * State untuk menyimpan nilai Date Picker.
   */
  const handlePickTime = () => {
    setIsPickerShown(true)
  }

  return (
    <>
      {props.label && (
        <Text className="text-caption text-bright-gray">{props.label}</Text>
      )}
      <TouchableOpacity activeOpacity={0.8} onPress={handlePickTime}>
        <BlurView
          tint="dark"
          intensity={10}
          className={`w-full my-[4px] flex-row px-[8px] py-[4px] text-left text-white rounded-md items-center h-[32px] ${styles.glassInput}`}>
          {props.icon && <props.icon height={24} width={24} />}

          <Text className="self-center text-white">
            {props.value.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}{" | "}
            {props.value.toLocaleTimeString("id-ID", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
              dayPeriod: "short"
            })}
          </Text>
        </BlurView>
      </TouchableOpacity>

      {isPickerShown && (
        <RNDateTimePicker
          mode="datetime"
          value={props.value}
          onChange={(_, selectedDate) => {
            props.setValue(selectedDate)
            setIsPickerShown(false)
          }}
          textColor={"white"}
        />
      )}
    </>
  )
}
