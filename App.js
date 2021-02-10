import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './app/screens/Welcome';
import LoginView from './app/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordScreen from './app/screens/RecordScreen';


const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
			screenOptions={{
				headerShown:false
			}}
			>
				<Stack.Screen
					name='Home'
					component={Welcome}
				/>
				<Stack.Screen name='Login' component={LoginView} />
				<Stack.Screen
					name='RecordScreen'
					component={RecordScreen}
				/>
				<Stack.Screen 
					name='loginScreen'
					component={LoginView}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
