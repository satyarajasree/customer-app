import { Stack } from 'expo-router'
import React from 'react'

export const _layout = () => {
  return (
    <Stack screenOptions={{
      headerShown:true
    }}>
        <Stack.Screen name='Availability' options={{headerTitle:"Available Plots"}} />
      
    </Stack>
  )
}
