import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from 'react-native';

function SignUpScreen(props) {
	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		password: '',
		retypePassword: '',
	});
	const handleUsernameChange = (username) => {
		setUserInfo({
			name: username,
			email: userInfo.email,
			password: userInfo.password,
		});
	};
	const handleEmailChange = (email) => {
		setUserInfo({
			name: userInfo.name,
			email: email,
			password: userInfo.password,
		});
	};
	const handlePasswordChange = (password) => {
		setUserInfo({
			name: userInfo.name,
			email: userInfo.email,
			password: password,
		});
	};
	const handleRetypePasswordChange = (password) => {
		setUserInfo({
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
			retypePassword: password,
		});
	};
	function makeId() {
		let text = '';
		let possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text + Math.random().toString(36).substring(1,1);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.heading}>Sign Up</Text>
			<TextInput
				style={styles.inputBox}
				onChangeText={(text) => handleUsernameChange(text)}
				placeholder='Username'
				placeholderTextColor='black'
			/>
			<TextInput
				style={styles.inputBox}
				onChangeText={(text) => handleEmailChange(text)}
				placeholder='Email'
				placeholderTextColor='black'
			/>
			<TextInput
				style={styles.inputBox}
				onChangeText={(text) => handlePasswordChange(text)}
				placeholder='Password'
				placeholderTextColor='black'
			/>
			<TextInput
				style={styles.inputBox}
				onChangeText={(text) => handleRetypePasswordChange(text)}
				placeholder='Re-type Password'
				placeholderTextColor='black'
			/>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonTitle}>Create Account</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: 'white',
		color: 'white',
	},
	heading: {
		fontSize: 20,
		marginBottom: 15,
	},
	inputBox: {
		borderColor: 'black',
		padding: 10,
		width: '70%',
		borderWidth: 1,
		borderRadius: 15,
		marginBottom: 15,
	},
	button: {
		backgroundColor: 'dodgerblue',
		marginTop: 20,
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
