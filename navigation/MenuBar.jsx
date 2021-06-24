import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from '../screen/AuthScreen'
import { ImagePick } from '../screen/ImagePicker';

const Tabs = createBottomTabNavigator();

export const MenuBar = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='Auth'
        component={Auth}
      />
      <Tabs.Screen
        name='Image'
        component={ImagePick}
      />
    </Tabs.Navigator>
  )
}