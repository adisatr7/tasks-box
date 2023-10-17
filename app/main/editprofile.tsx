import { Alert, Text, View } from "react-native"
import Header from "../../components/containers/Header"
import MainLayout from "../../components/layouts/MainLayout"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import SubmitEditUserIcon from "../../components/icons/SubmitEditUserIcon"
import Entry from "../../components/inputs/Entry"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux"
import { endLoading, startLoading } from "../../redux/slices/layoutSlice"
import GlassCard from "../../components/containers/GlassCard"
import EmailIcon from "../../components/icons/EmailIcon"
import NameIcon from "../../components/icons/NameIcon"
import BriefcaseIcon from "../../components/icons/BriefcaseIcon"
import ImageSelector from "../../components/inputs/ImageSelector"
import useUpdateUser from "../../hooks/useUpdateUser"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { User } from "../../types"
import { router } from "expo-router"
import LockIcon from "../../components/icons/LockIcon"

export default function EditProfilePage() {
  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  /**
   * Hook untuk mengambil data user sekarang.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const [imageUrlInput, setImageUrlInput] = useState<string>("")
  const [firstNameInput, setFirstNameInput] = useState<string>("")
  const [lastNameInput, setLastNameInput] = useState<string>("")
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [positionInput, setPositionInput] = useState<string>("")

  const [imageIsChanged, setImageIsChanged] = useState<boolean>(false)
  const [emailIsChanged, setEmailIsChanged] = useState<boolean>(false)

  // Set input value dari data user sekarang
  useEffect(() => {
    if (currentUser) {
      setImageUrlInput(currentUser.imageUrl)
      setFirstNameInput(currentUser.firstName)
      setLastNameInput(currentUser.lastName)
      setEmailInput(currentUser.email)
      setPositionInput(currentUser.position)
    }
  }, [])

  // Cek apakah foto profil berubah
  useEffect(() => {
    if (imageUrlInput !== currentUser?.imageUrl) {
      setImageIsChanged(true)
    } else {
      setImageIsChanged(false)
    }
  }, [imageUrlInput])

  // Cek apakah email berubah
  useEffect(() => {
    if (emailInput !== currentUser?.email) {
      setEmailIsChanged(true)
    } else {
      setEmailIsChanged(false)
    }
  }, [emailInput])


  /**
   * Hook untuk mengambil mutasi update data user.
   */
  const updateUserMutation = useUpdateUser()


  /**
   * Handle submit edit profile
   */
  const handleSubmit = async () => {
    // Validasi input kosong
    if (
      firstNameInput === "" ||
      lastNameInput === "" ||
      emailInput === "" ||
      positionInput === ""
    ) {
      Alert.alert(
        "Data tidak lengkap",
        "Mohon pastikan Anda mengisi semua data yang diperlukan."
      )
      return
    }

    if (emailIsChanged && !passwordInput) {
      Alert.alert(
        "Kata sandi kosong",
        "Untuk mengubah email Anda, mohon masukkan kata sandi Anda."
      )
      return
    }

    dispatch(startLoading())

    const updatedUserData: User = {
      ...currentUser,
      imageUrl: imageUrlInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      position: positionInput
    }

    // Lakukan mutasi register
    await updateUserMutation
      .mutateAsync({
        user: updatedUserData,
        imageIsChanged,
        emailIsChanged,
        passwordAuth: passwordInput
      })
      .then(() => {
        // Jika sukses, simpan data user ke Redux state
        dispatch(setCurrentUser(updatedUserData))

        // Pindah ke halaman utama
        Alert.alert("Sukses", "Data Anda berhasil diubah!")
        setTimeout(() => {
          router.back()
        }, 100)
      })

      .finally(() => {
        dispatch(endLoading())
      })
  }


  return (
    <MainLayout>
      <Header position="left" title="Edit Profil" />
      <View className="flex-1" />
      <GlassCard>
        {/* Upload picture */}
        <View className="flex-col items-center justify-center w-full h-fit pb-[8px]">
          <ImageSelector
            imageUrl={imageUrlInput}
            setImageUrl={setImageUrlInput}
          />
          <Text className="text-bright-gray mt-[4px]">Ubah foto profil</Text>
        </View>

        {/* Form */}
        <View className="flex-row justify-between w-full items-end">
          <View className="flex-1 flex-col">
            <Entry
              // label="Nama lengkap"
              placeholder="Nama depan"
              returnKeyType="next"
              icon={NameIcon}
              value={firstNameInput}
              setValue={setFirstNameInput}
            />
          </View>
          <View className="w-[6px]" />
          <View className="flex-1 flex-col">
            <Entry
              placeholder="Nama belakang"
              returnKeyType="next"
              value={lastNameInput}
              setValue={setLastNameInput}
            />
          </View>
        </View>
        {/* <Entry
          // label="Alamat email"
          disabled
          placeholder="Masukkan email"
          type="email-address"
          returnKeyType="next"
          icon={EmailIcon}
          value={emailInput}
          setValue={setEmailInput}
        /> */}
        {emailIsChanged && (
          <Entry
            // label="Kata sandi sekarang"
            placeholder="Masukkan sandi untuk mengubah email"
            type="password"
            returnKeyType="next"
            icon={LockIcon}
            value={passwordInput}
            setValue={setPasswordInput}
          />
        )}
        <Entry
          // label="Jabatan"
          placeholder="Masukkan jabatan"
          icon={BriefcaseIcon}
          value={positionInput}
          setValue={setPositionInput}
        />
      </GlassCard>
      <View className="flex-1" />
      <PrimaryButton
        label="Simpan Perubahan"
        icon={SubmitEditUserIcon}
        onClick={handleSubmit}
      />
    </MainLayout>
  )
}