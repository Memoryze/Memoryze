import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';


function Welcome({navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.welcomeMessage}>Welcome to Memoryze</Text>
			<Text style={styles.questionHeaders}>Already have an account?</Text>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonTitle}>Sign In</Text>
			</TouchableOpacity>
			<Text style={styles.questionHeaders}>New here?</Text>
			<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SignUp')}>
				<Text style={styles.buttonTitle}>Sign Up</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

export default Welcome;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	welcomeMessage:{
		marginBottom:20,
		fontSize:20,
		bottom:50
	},
	questionHeaders:{
		fontSize:17,
	},
	button: {
		backgroundColor: 'dodgerblue',
		marginTop:10,
		marginBottom: 20,
		padding: 8,
		width: 200,
		borderRadius: 25,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
});