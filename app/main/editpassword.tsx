import { Alert, View } from "react-native";
import Header from "../../components/containers/Header"
import MainLayout from "../../components/layouts/MainLayout"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import Entry from "../../components/inputs/Entry"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux"
import { startLoading } from "../../redux/slices/layoutSlice";
import GlassCard from "../../components/containers/GlassCard"
import useUpdateUser from "../../hooks/useUpdateUser"
import ChangePasswordLogo from "../../components/icons/ChangePasswordLogo"
import SubmitEditPasswordIcon from "../../components/icons/SubmitEditPasswordIcon"

export default function EditProfilePage() {
  /**
   * Hook untuk dispatch Redux state.
   */
  const dispatch = useAppDispatch()

  /**
   * Hook untuk mengambil data user sekarang.
   */
  const currentUser = useAppSelector((state) => state.auth.currentUser)

  const [oldPasswordInput, setOldPasswordInput] = useState<string>("")
  const [newPasswordInput, setNewPasswordInput] = useState<string>("")
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState<string>("")


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
      oldPasswordInput === "" ||
      newPasswordInput === "" ||
      confirmNewPasswordInput === ""
    ) {
      Alert.alert(
        "Data tidak lengkap",
        "Mohon pastikan Anda mengisi semua form yang diberikan."
      )
      return
    }

    // Validasi password baru dan konfirmasi password baru
    if (newPasswordInput !== confirmNewPasswordInput) {
      Alert.alert(
        "Password tidak cocok",
        "Mohon pastikan password baru dan konfirmasi password baru cocok."
      )
      return
    }

    dispatch(startLoading())

    // const updatedUserData: User = {
    //   ...currentUser,
    //   imageUrl: imageUrlInput,
    //   firstName: firstNameInput,
    //   lastName: lastNameInput,
    //   email: emailInput,
    //   position: positionInput
    // }

    // // Lakukan mutasi register
    // await updateUserMutation
    //   .mutateAsync({
    //     user: updatedUserData,
    //     imageIsChanged
    //   })
    //   .then(() => {
    //     // Jika sukses, simpan data user ke Redux state
    //     dispatch(setCurrentUser(updatedUserData))

    //     // Pindah ke halaman utama
    //     Alert.alert("Sukses", "Data Anda berhasil diubah!")
    //     setTimeout(() => {
    //       router.back()
    //     }, 100)
    //   })

    //   .finally(() => {
    //     dispatch(endLoading())
    //   })
  }


  return (
    <MainLayout>
      <Header position="left" title="Ubah Kata Sandi"/>
      <View className="flex-1" />
      <GlassCard>
        <View className="w-full h-fit justify-center items-center pb-[6px]">
          <ChangePasswordLogo height={64} width={64}/>
        </View>
        <Entry
          placeholder="Masukkan kata sandi lama"
          type="password"
          returnKeyType="next"
          value={oldPasswordInput}
          setValue={setOldPasswordInput}
        />
        <Entry
          placeholder="Masukkan kata sandi baru"
          type="password"
          returnKeyType="next"
          value={newPasswordInput}
          setValue={setNewPasswordInput}
        />
        <Entry
          placeholder="Ulangi kata sandi baru"
          type="password"
          value={confirmNewPasswordInput}
          setValue={setConfirmNewPasswordInput}
        />
      </GlassCard>
      <View className="flex-1"/>
      <PrimaryButton
        label="Simpan Perubahan"
        icon={SubmitEditPasswordIcon}
        onClick={handleSubmit}
      />
    </MainLayout>
  )
}