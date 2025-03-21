import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:'false'}}>
      <Stack.Screen name='otp' options={{headerShown:'false'}}/>
      <Stack.Screen name='index' options={{headerShown:'true', headerTitle:'Login', headerBackVisible:false}} />
    </Stack>
  )
}

export default _layout;