import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './app/screens/Welcome';
import LoginView from './app/screens/LoginView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecordView from './app/screens/RecordView';

const Stack = createStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={Welcome}
					options={{ title: 'Welcome' }}
				/>
				<Stack.Screen name='Login' component={LoginView} />
				<Stack.Screen
					name='RecordView'
					component={RecordView}
					options={{ title: 'RecordView' }}
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
