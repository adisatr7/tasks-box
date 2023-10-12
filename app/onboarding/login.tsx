import { router } from "expo-router"
import { useState } from "react"
import { Alert, Text, TouchableOpacity } from "react-native"
import GlassCard from "../../components/containers/GlassCard"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import Entry from "../../components/inputs/Entry"
import LongButton from "../../components/inputs/LongButton"
import OnboardingLayout from "../../components/layouts/OnboardingLayout"
import useLogin from "../../hooks/useLogin"

export default function LoginScreen() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  const login = useLogin()

  /**
   * Hanlder untuk tombol register.
   */
  const handleRegister = () => {
    router.push("/onboarding/register")
  }

  /**
   * Handler untuk tombol login.
   */
  const handleLogin = async () => {
    await login.mutateAsync({ email: emailInput, password: rawPasswordInput })

    if (login.isSuccess)
      router.push("/main/home")
    // alert("Login berhasil")

    else
      Alert.alert("Login gagal")
  }

  return (
    <OnboardingLayout>

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
    </OnboardingLayout>
  )
}
