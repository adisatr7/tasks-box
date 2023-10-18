import AnimatedLottieView from "lottie-react-native"
import { View } from "react-native"
import { useAppSelector } from "../../redux"
import { useRef } from "react"
import loadingAnimation from "../../assets/animations/loading.json"


export default function LoadingOverlay() {
  /**
   * State untuk mengecek apakah aplikasi sedang memuat sesuatu.
   */
  const isLoading = useAppSelector((state) => state.layout.isLoading)


  /**
   * Ref untuk animasi loading.
   */
  // const animationRef = useRef(null)


  if (isLoading) {
    return (
      <View className="absolute z-50 items-center self-center justify-center w-full h-full bg-black/70">
        <AnimatedLottieView
          autoPlay
          // ref={animationRef}
          source={loadingAnimation}
          style={{
            width: 100,
            height: 100
          }}
        />
      </View>
    )
  }
}