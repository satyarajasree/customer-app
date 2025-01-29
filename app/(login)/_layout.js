import { Stack } from 'expo-router'
import React from 'react'

export const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='otp' />
    </Stack>
        
    
  )
}
