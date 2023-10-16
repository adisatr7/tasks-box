import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native"
import Header from "../../components/containers/Header"
import { styles } from "../../styles"
import { StatusBar as Status } from "react-native"
import image from "../../assets/backgrounds/main.jpg"
import { BlurView } from "expo-blur"
import { useAppDispatch, useAppSelector } from "../../redux"
import ProfileButton from "../../components/buttons/ProfileButton"
import LogoutButton from "../../components/buttons/LogoutButton"
import { removeCurrentUser } from "../../redux/slices/authSlice"
import { router } from "expo-router"


export default function () {
  /**
   * Mengambil data user dari Redux.
   */
  const currentUser = useAppSelector(state => state.auth.currentUser)


  /**
   * Dispatch Redux.
   */
  const dispatch = useAppDispatch()


  /**
   * Menghandle tombol logout.
   */
  const handleLogout = () => {
    router.replace("/onboarding/login")
    setTimeout(() => {
      dispatch(removeCurrentUser())
    }, 10)
  }


  /**
   * Menghandle tombol edit profil.
   */
  const handleEditProfile = () => {
    router.push("/main/editprofile")
  }


  /**
   * Menghandle tombol ganti kata sandi.
   */
  const handleEditPassword = () => {
    router.push("/main/editpassword")
  }


  return (
    <ImageBackground
      source={image}
      blurRadius={2}
      resizeMode="cover"
      className="top-0 h-full -z-10">
      <View className={`absolute z-0 flex w-full h-full blur-lg ${styles.mainOverlay}`}/>
      <SafeAreaView
        style={{ top: Status.currentHeight }}
        className={`z-10 flex-col h-[98%] pt-[20px]`}>
        <View className="mx-[18px] -top-[18px]">
          <Header title="Profil Saya" position="left" />
        </View>

        <View className="flex-1" />

      </SafeAreaView>
      <View className={`${styles.glassOutline} absolute bottom-0 rounded-t-xl h-[65%] w-screen backdrop-filter bg-glass/80 backdrop-blur-lg blur-lg z-10`}>

        {/* Profile Section */}
        <View className={`${styles.glassOutline} absolute -top-[36px] self-center w-[90%] rounded-xl h-fit pb-[16px] backdrop-filter bg-glass/90 backdrop-blur-lg blur-lg items-center`}>
          <Image
            source={{ uri: currentUser.imageUrl }}
            style={{
              position: "absolute",
              height: 92,
              width: 92,
              borderRadius: 1000,
              top: -58,
            }}/>
          <Text className="text-white text-body mt-[46px]">{currentUser.firstName} {currentUser.lastName}</Text>
          <Text className="text-dark-gray text-caption my-[3px]">{currentUser.position} | Lv {currentUser.level}</Text>

          {/* Level bar */}
          <View className="h-[10px] w-[90%] bg-dark-gray/30 rounded-full">
            <View style={{ height: 10, width: `${currentUser.exp}%` }} className="bg-primary"/>
          </View>
        </View>

        {/* Buttons */}
        <View className="mx-[18px] mt-[90px] flex-1 pb-[28px]">
          <ProfileButton label="Edit Profil" onClick={handleEditProfile}/>
          <ProfileButton label="Ganti Kata Sandi" onClick={handleEditPassword}/>

          <View className="flex-1"/>

          <Text className="text-center text-dark-gray/90 text-caption pb-[4px]">App Version 1.0.0</Text>
          <LogoutButton label="Logout" onClick={handleLogout}/>
        </View>
      </View>
    </ImageBackground>
  )
}