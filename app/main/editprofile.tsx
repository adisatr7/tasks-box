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
  const [imageIsChanged, setImageIsChanged] = useState<boolean>(false)
  const [firstNameInput, setFirstNameInput] = useState<string>("")
  const [lastNameInput, setLastNameInput] = useState<string>("")
  const [emailInput, setEmailInput] = useState<string>("")
  const [positionInput, setPositionInput] = useState<string>("")

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
        imageIsChanged
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
      <Header position="left" title="Edit Profil"/>
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
      </GlassCard>
      <View className="flex-1"/>
      <PrimaryButton
        label="Simpan Perubahan"
        icon={SubmitEditUserIcon}
        onClick={handleSubmit}
      />
    </MainLayout>
  )
}