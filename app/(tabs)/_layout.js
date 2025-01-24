import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
   <Tabs screenOptions={{tabBarActiveTintColor:'red'}}>
    <Tabs.Screen name='index' options={{headerTitle:'Home'}}/>
   </Tabs>
  )
}

export default _layout