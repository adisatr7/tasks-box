import { router } from "expo-router"
import { useState } from "react"
import { Alert, Text, TouchableOpacity } from "react-native"
import GlassCard from "../../components/containers/GlassCard"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import Entry from "../../components/inputs/Entry"
import LongButton from "../../components/buttons/LongButton"
import OnboardingLayout from "../../components/layouts/OnboardingLayout"
import useLogin from "../../hooks/useLogin"
import { useAppDispatch } from "../../redux"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { User } from "../../types"

export default function LoginScreen() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  /**
   * Hook untuk login.
   */
  const login = useLogin()

  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

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

    // Validasi input kosong
    if (!emailInput || !rawPasswordInput) {
      Alert.alert("Error", "Mohon isi semua input")
      return
    }

    login.mutateAsync({ email: emailInput, password: rawPasswordInput })

    // Jika login sukses
    .then((data) => {
      // Simpan data user ke Redux state
      const user: User = data
      Alert.alert("User data", JSON.stringify(user))
      dispatch(setCurrentUser(user))

      // Pindah ke halaman utama
      router.push("/main/home")
    })
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
          type="email-address"
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
