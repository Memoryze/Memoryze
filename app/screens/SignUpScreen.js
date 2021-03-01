import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Image,
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

	const handleSubmit = () => {
		const key = 'key';
		let url = 'http://localhost:8000/users/create_user/' + key;
		let body = {
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
		};

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((res) => {
				//get the users's id from the response
				//the id would be passed through the navigator to the next
				console.log(res);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topContent}>
				<Image source={require('../assets/logo-icon.png')} 
				style={styles.logo} />
			</View>
			<View style={styles.bottomContents}>
				<Text style={styles.heading}>Sign Up</Text>
				<Text style={styles.subHeading}>
					{' '}
					Signup to get started with the app.
				</Text>

				<TextInput
					style={styles.inputBox}
					onChangeText={(text) => handleUsernameChange(text)}
					value={userInfo.name}
					placeholder='Username'
					placeholderTextColor='#7c8ca0'
				/>

				<TextInput
					style={styles.inputBox}
					onChangeText={(text) => handleEmailChange(text)}
					value={userInfo.email}
					placeholder='Email'
					placeholderTextColor='#7c8ca0'
				/>

				<TextInput
					style={styles.inputBox}
					onChangeText={(text) => handlePasswordChange(text)}
					placeholder='Password'
					value={userInfo.password}
					placeholderTextColor='#7c8ca0'
				/>

				<TextInput
					style={styles.inputBox}
					onChangeText={(text) => handleRetypePasswordChange(text)}
					placeholder='Confirm Password'
					value={userInfo.password}
					placeholderTextColor='#7c8ca0'
				/>
				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonTitle}>SIGN UP</Text>
				</TouchableOpacity>
				<Text style={styles.loginPageNavigator}>Login to my Account</Text>
			</View>
		</SafeAreaView>
	);
}

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		color: '#ffffff',
		backgroundColor: '#ffffff',
	},
	topContent: {
		width: '100%',
		height: '30%',
		alignSelf: 'flex-start',
		top: 0,
		justifyContent: 'center',
	},
	logo: {
		alignSelf: 'center',
		height: 100,
		width: 100,
	},
	heading: {
		fontSize: 35,
		marginBottom: 22,
		alignSelf: 'flex-start',
		color: '#0a2549',
	},
	subHeading: {
		fontSize: 18,
		marginBottom: 45,
		color: '#546780',
	},
	bottomContents: {
		width: '80%',
		maxWidth: 300,
		justifyContent: 'center',
		paddingVertical: 30,
	},
	inputBox: {
		borderColor: '#eff2f7',
		padding: 12,
		width: '100%',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#eff2f7',
		marginBottom: 19,
	},
	button: {
		backgroundColor: '#b4f3b4',
		marginTop: 15,
		width: '100%',
		marginBottom: 25,
		padding: 12,
		borderRadius: 10,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	loginPageNavigator: {
		color: '#445973',
		fontSize: 20,
		alignSelf:'center',
	},
});
