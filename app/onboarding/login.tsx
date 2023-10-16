import { router } from "expo-router"
import { useRef, useState } from "react"
import { Alert, Text, TouchableOpacity } from "react-native";
import GlassCard from "../../components/containers/GlassCard"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import Entry from "../../components/inputs/Entry"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import OnboardingLayout from "../../components/layouts/OnboardingLayout"
import useLogin from "../../hooks/useLogin"
import { useAppDispatch } from "../../redux"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { User } from "../../types"
import { endLoading, startLoading } from "../../redux/slices/layoutSlice"

export default function LoginScreen() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  /**
   * Ref untuk input password.
   */
  const passwordRef = useRef(null)

  /**
   * Ref untuk tombol submit.
   */
  const submitButtonRef = useRef(null)

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

    dispatch(startLoading())

    login.mutateAsync({ email: emailInput, password: rawPasswordInput })

    // Jika login sukses
    .then((data) => {
      // Simpan data user ke Redux state
      const user: User = data

      // Validasi user
      if (!user.firstName || !user.email) {
        Alert.alert("Error", "Terjadi kesalahan")
        return
      }

      dispatch(setCurrentUser(user))

      // Pindah ke halaman utama
      setTimeout(() => {
        router.replace("/main/home")
      }, 10)
    })

    .finally(() => {
      dispatch(endLoading())
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
          type="email-address"
          placeholder="Masukkan email"
          // onSubmitEditing={() => {
          //   setTimeout(() => {
          //     passwordRef.current.focus()
          //   }, 10)
          // }}
          returnKeyType="next"
          icon={EmailIcon}
          value={emailInput}
          setValue={setEmailInput}
        />
        <Entry
          type="password"
          placeholder="Masukkan kata sandi"
          onSubmitEditing={() => handleLogin()}
          // ref={passwordRef}
          icon={LockIcon}
          value={rawPasswordInput}
          setValue={setRawPasswordInput}
        />

        {/* Register Button */}
        <TouchableOpacity activeOpacity={0.5} onPress={handleRegister}>
          <Text className=" text-white text-caption -mt-[4px] mb-[6px] mx-[2px]">
            Belum punya akun? Klik disini
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <PrimaryButton ref={submitButtonRef} label="Masuk" onClick={handleLogin} />
      </GlassCard>
    </OnboardingLayout>
  )
}
