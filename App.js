import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from './screen/AuthScreen';
import { ImagePick } from './screen/ImagePicker';
import { MenuBar } from './navigation/MenuBar';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<MenuBar/>
		</NavigationContainer>
	)
}

export default App