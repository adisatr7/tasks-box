import { TouchableOpacity, Text, Image, View } from "react-native"
import { styles } from "../../styles"
import * as ImagePicker from "expo-image-picker"
import ImageIcon from "../icons/ImageIcon"


type Props = {
  imageUrl: string
  setImageUrl: (imageUrl: string) => void
  componentSize?: number
}

export default function ImageSelector({ imageUrl, setImageUrl, componentSize: size=84 }: Props) {
  /**
   * Handler untuk memilih gambar dari galeri.
   */
  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0
    })

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleImageSelect}
      style={{ width: size, height: size }}
      className={`rounded-full bg-gray-500 justify-center items-center ${styles.glassOutline}`}>
      {imageUrl
        ? <Image source={{ uri: imageUrl }} style={{ width: size, height: size, borderRadius: 1000 }}/>
        : <ImageIcon fill="#E3E3E3"/>
      }
    </TouchableOpacity>
  )
}