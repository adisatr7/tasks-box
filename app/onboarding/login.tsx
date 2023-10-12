import { router } from "expo-router"
import { useState } from "react"
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import image from "../../assets/backgrounds/login.jpg"
import GlassCard from "../../components/containers/GlassCard"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import Entry from "../../components/inputs/Entry"
import LongButton from "../../components/inputs/LongButton"
import { styles } from "../../styles"

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  /**
   * Hanlder untuk tombol register.
   */
  const handleRegister = () => {
    router.push("/onboarding/register")
  }

  /**
   * Handler untuk tombol login.
   */
  const handleLogin = () => {
    // TODO: Implement login!

    router.push("/main/home")
  }

  return (
    <ImageBackground source={image} blurRadius={4} className="h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.loginOverlay}`}/>
      <SafeAreaView className="z-10 flex flex-col h-screen m-[18px] items-center justify-center">
        <GlassCard className="py-[12px]">

          {/* Header */}
          <Text className="text-center text-white text-heading-1 mt-[4px] mb-[12px]">
            Login
          </Text>

          {/* Form */}
          <Entry
            placeholder="Masukkan email"
            icon={EmailIcon}
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

          {/* Register Button */}
          <TouchableOpacity activeOpacity={0.5} onPress={handleRegister}>
            <Text className=" text-white text-caption -mt-[4px] mb-[6px] mx-[2px]">
              Belum punya akun? Klik disini
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <LongButton label="Masuk" onClick={handleLogin} />

        </GlassCard>
      </SafeAreaView>
    </ImageBackground>
  )
}
