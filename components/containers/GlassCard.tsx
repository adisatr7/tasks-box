import { ReactNode } from "react"
import { View } from "react-native"
import { twMerge } from "tailwind-merge"
import { styles } from "../../styles"
// import { BlurView } from "expo-blur"


type Props = {
  children?: ReactNode
  className?: string
}

export default function GlassCard({ children, className }: Props) {
  return (
    // <View className={`flex flex-col w-full rounded-full overflow-clip`}>
    <View
      // tint="dark"
      className={twMerge(`
      flex flex-col w-full h-fit px-[10px] pb-[8px] rounded-lg gap-y-[12px]
      ${styles.glass}
      ${styles.glassOutline}`,
      className
    )}>
      {children}
    </View>
    // </View>
  )
}