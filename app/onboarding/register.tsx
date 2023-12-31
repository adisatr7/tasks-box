import { router } from "expo-router"
import { useState } from "react"
import { Alert, Text, View } from "react-native"
import BackButton from "../../components/buttons/BackButton"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import GlassCard from "../../components/containers/GlassCard"
import BriefcaseIcon from "../../components/icons/BriefcaseIcon"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import NameIcon from "../../components/icons/NameIcon"
import Entry from "../../components/inputs/Entry"
import ImageSelector from "../../components/inputs/ImageSelector"
import OnboardingLayout from "../../components/layouts/OnboardingLayout"
import useRegister from "../../hooks/useRegister"
import { useAppDispatch } from "../../redux"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { User } from "../../types"
import { endLoading, startLoading } from "../../redux/slices/layoutSlice"
import LoadingOverlay from "../../components/layouts/LoadingOverlay"


export default function RegisterScreen() {
  const [imageUrlInput, setImageUrlInput] = useState<string>("")
  const [firstNameInput, setFirstNameInput] = useState<string>("")
  const [lastNameInput, setLastNameInput] = useState<string>("")
  const [emailInput, setEmailInput] = useState<string>("")
  const [positionInput, setPositionInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")
  const [rawPasswordConfirm, setRawPasswordConfirm] = useState<string>("")

  /**
   * Hook untuk register akun baru.
   */
  const register = useRegister()

  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  /**
   * Mengambil data yang diisi user dari form.
   *
   * @returns Data dari form.
   */
  const getDataFromForm = (): User => {
    return {
      imageUrl: imageUrlInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      position: positionInput,
      level: 1,
      exp: 0
    }
  }

  /**
   * Handler untuk tombol login.
   */
  const handleSubmit = async () => {

    // Validasi input kosong
    if (firstNameInput === "" || lastNameInput === "" || emailInput === "" || positionInput === "" || rawPasswordInput === "" || rawPasswordConfirm === "") {
      Alert.alert("Data tidak lengkap", "Mohon pastikan Anda mengisi semua data yang diperlukan.")
      return
    }

    // Validasi password
    if (rawPasswordInput !== rawPasswordConfirm) {
      Alert.alert("Konfirmasi kata sandi salah", "Mohon pastikan Anda memasukkan kata sandi yang sama.")
      return
    }

    dispatch(startLoading())

    // Lakukan mutasi register
    await register.mutateAsync({
      userData: getDataFromForm(),
      passwordInput: rawPasswordInput
    }).then((data) => {
      // Jika sukses, simpan data user ke Redux state
      const user: User = data
      dispatch(setCurrentUser(user))

      // Pindah ke halaman utama
      Alert.alert("Sukses", "Pendaftaran akun berhasil!")
      setTimeout(() => {
        router.replace("/main/home")
      }, 300)
    })

    .finally(() => {
      dispatch(endLoading())
    })
  }


  return (
    <OnboardingLayout>
      <GlassCard className="py-[12px]">
        {/* Header */}
        <View className="flex-row items-center w-full bg-red-0 h-fit">
          <BackButton absolute/>
          <Text className="text-center text-white text-heading-1 mt-[4px] w-full">
            Daftar Akun Baru
          </Text>
        </View>

        {/* Upload picture */}
        <View className="flex-col items-center justify-center w-full h-fit pb-[8px]">
          <ImageSelector
            imageUrl={imageUrlInput}
            setImageUrl={setImageUrlInput}
          />
          <Text className="text-bright-gray mt-[4px]">Unggah gambar</Text>
        </View>

        {/* Form */}
        <View className="flex-row justify-between w-[49%]">
          <Entry
            placeholder="Nama depan"
            icon={NameIcon}
            value={firstNameInput}
            setValue={setFirstNameInput}
          />
          <View className="w-[6px]" />
          <Entry
            placeholder="Nama belakang"
            value={lastNameInput}
            setValue={setLastNameInput}
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
          value={positionInput}
          setValue={setPositionInput}
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
          value={rawPasswordConfirm}
          setValue={setRawPasswordConfirm}
          type="password"
        />

        {/* Gap */}
        <View className="h-[1px]" />

        {/* Register button */}
        <PrimaryButton label="Daftar Sekarang" onClick={handleSubmit} />
      </GlassCard>
      <LoadingOverlay />
    </OnboardingLayout>
  )
}
