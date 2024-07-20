import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import MEDITATION_IMAGES from "@/constants/meditation-images"
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { AUDIO_FILES, MEDITATION_DATA } from '@/constants/MeditationData'
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {
  const { id } = useLocalSearchParams()

  const { duration: secondsRemaining, setDuration } = useContext(TimerContext)
  //const [secondsRemaining, setSecondsRemaining] = useState(10)
  const [isMeditating, setIsMeditating] = useState(false)
  const [audioSound, setAudioSound] = useState<Audio.Sound>()
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  useEffect(() => {
    let timerId: NodeJS.Timeout


    if (secondsRemaining == 0) { setIsMeditating(false); return }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1)
      }, 1000)

    }
    return () => {
      clearTimeout(timerId)
    }
  }, [secondsRemaining, isMeditating])

  useEffect(() => {
    return () => {
      setDuration(10)
      audioSound?.unloadAsync();
    }
  }, [audioSound])


  const toggleMeditationStatus = async () => {
    if (secondsRemaining == 0) setDuration(10);

    setIsMeditating(!isMeditating)

    await toggleSound()
  }

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound()
    const status = await sound?.getStatusAsync()

    if (status?.isLoaded) {
      await sound.playAsync();
      setIsPlayingAudio(true)
    } else {
      await sound.pauseAsync()
      setIsPlayingAudio(false)
    }

  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio

    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName]
    )

    setAudioSound(sound)
    return sound
  }

  //format time  
  const timeFormatedInMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0")
  const timeFormatedInSeconds = String(secondsRemaining % 60).padStart(2, "0")

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationStatus()
    router.push("/(modal)/adjust-meditation-duration")
  }
  return (
    <View className='flex-1'>
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable className='absolute top-16 left-6 z-10' onPress={() => router.back()}>
            <AntDesign name='leftcircleo' size={50} color={"white"} />
          </Pressable>
          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-neutral-200 rounded-full h-44 w-44 justify-center items-center'>
              <Text className='text-4xl text-blue-500 font-rmono'>{timeFormatedInMinutes}:{timeFormatedInSeconds}</Text>
            </View>
          </View>

          <View className='mb-5'>
            <CustomButton title={isMeditating ? "Stop" : "Start Meditation"} onPress={toggleMeditationStatus} />
            <CustomButton containerStyles='mt-4' title='Adjust Duration' onPress={handleAdjustDuration} />
          </View>
        </AppGradient>

      </ImageBackground>
    </View>
  )
}

export default Meditate
