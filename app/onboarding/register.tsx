import { Link, router } from "expo-router"
import { useState } from "react"
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import GlassCard from "../../components/containers/GlassCard"
import BriefcaseIcon from "../../components/icons/BriefcaseIcon"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import NameIcon from "../../components/icons/NameIcon"
import BackButton from "../../components/inputs/BackButton"
import Entry from "../../components/inputs/Entry"
import LongButton from "../../components/inputs/LongButton"
import { styles } from "../../styles"
import image from "../../assets/backgrounds/login.jpg"

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  /**
   * Handler untuk tombol login.
   */
  const handleSubmit = () => {
    // TODO: Implement submit!
  }

  return (
    <ImageBackground source={image} blurRadius={4} className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.loginOverlay}`}/>
      <SafeAreaView className="z-10 flex flex-col h-screen m-[18px] items-center justify-center">
        <GlassCard className="py-[12px]">
          <View className="flex-row items-center w-full bg-red-0 h-fit">
            <BackButton />
            <Text className="text-center text-white text-heading-1 mt-[4px] w-full">
              Daftar Akun Baru
            </Text>
          </View>
          <View className="flex-col items-center justify-center w-full h-fit pb-[8px]">
            <View className={`rounded-full w-[84px] h-[84px] bg-gray-500 ${styles.glassOutline}`}/>
            <Text className="text-bright-gray mt-[4px]">Unggah gambar</Text>
          </View>
          <View className="flex-row justify-between w-[49%]">
            <Entry
              placeholder="Nama depan"
              icon={NameIcon}
              value={emailInput}
              setValue={setEmailInput}
            />
            <View className="w-[6px]" />
            <Entry
              placeholder="Nama belakang"
              value={emailInput}
              setValue={setEmailInput}
            />
          </View>
          <Entry
            placeholder="Masukkan email"
            icon={EmailIcon}
            value={emailInput}
            setValue={setEmailInput}
          />
          <Entry
            placeholder="Masukkan jabatan"
            icon={BriefcaseIcon}
            value={emailInput}
            setValue={setEmailInput}
          />
          <Entry
            placeholder="Masukkan kata sandi"
            icon={LockIcon}
            value={rawPasswordInput}
            setValue={setRawPasswordInput}
            type="password"
          />
          <Entry
            placeholder="Ulangi kata sandi"
            icon={LockIcon}
            value={rawPasswordInput}
            setValue={setRawPasswordInput}
            type="password"
          />
          <View className="h-[1px]" />
          <LongButton label="Daftar Sekarang" onClick={handleSubmit} />
        </GlassCard>
      </SafeAreaView>
    </ImageBackground>

  )
}
