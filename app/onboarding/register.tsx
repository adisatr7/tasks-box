import { useState } from "react"
import { Text, View } from "react-native";
import GlassCard from "../../components/containers/GlassCard"
import BriefcaseIcon from "../../components/icons/BriefcaseIcon"
import EmailIcon from "../../components/icons/EmailIcon"
import LockIcon from "../../components/icons/LockIcon"
import NameIcon from "../../components/icons/NameIcon"
import BackButton from "../../components/inputs/BackButton"
import Entry from "../../components/inputs/Entry"
import LongButton from "../../components/inputs/LongButton"
import OnboardingLayout from "../../components/layouts/OnboardingLayout"
import { styles } from "../../styles"


export default function RegisterScreen() {
  const [emailInput, setEmailInput] = useState<string>("")
  const [rawPasswordInput, setRawPasswordInput] = useState<string>("")

  /**
   * Handler untuk tombol login.
   */
  const handleSubmit = () => {
    // TODO: Implement submit!

  }

  return (
    <OnboardingLayout>

      <GlassCard className="py-[12px]">

        {/* Header */}
        <View className="flex-row items-center w-full bg-red-0 h-fit">
          <BackButton />
          <Text className="text-center text-white text-heading-1 mt-[4px] w-full">
            Daftar Akun Baru
          </Text>
        </View>

        {/* Upload picture | Non functional */}
        <View className="flex-col items-center justify-center w-full h-fit pb-[8px]">
          <View className={`rounded-full w-[84px] h-[84px] bg-gray-500 ${styles.glassOutline}`}/>
          <Text className="text-bright-gray mt-[4px]">Unggah gambar</Text>
        </View>

        {/* Form */}
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

        {/* Gap */}
        <View className="h-[1px]" />

        {/* Register button */}
        <LongButton label="Daftar Sekarang" onClick={handleSubmit} />

      </GlassCard>
    </OnboardingLayout>
  )
}
