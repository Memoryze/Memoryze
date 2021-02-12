import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
	});
	const [passwordSecurityProps, setPasswordSecurityProps] = useState({
		iconName: 'md-eye',
		secureTextEntry: true,
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
	const onIconPress = () => {
		let newIconName = passwordSecurityProps.secureTextEntry
			? 'md-eye-off'
			: 'md-eye';
		setPasswordSecurityProps({
			iconName: newIconName,
			secureTextEntry: !passwordSecurityProps.secureTextEntry,
		});
	};
	function makeCode() {
		let text = '';
		let possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text + Math.random().toString(36).substring(1, 1);
	}
	const handleSubmit = () => {
		const key = 'key';
		let url = 'http://localhost:8000/users/create_user/' + key;
		let verificationCode = makeCode();
		let body = {
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
			code: verificationCode,
		};
		body['is_verified'] = true;

		// fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(body),
		// })
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		//get the users's id from the response
		// 		//the id would be passed through the navigator to the next
		// 		console.log(res);
		// 	});

		// fetch(
		// 	'https://6hfzcyy43e.execute-api.us-east-2.amazonaws.com/default/API_ACCESS?name=Memoryze'
		// )
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		//get the users's id from the response
		// 		//the id would be passed through the navigator to the next
		// 		console.log(res);
		// 	});

		// fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ user_id: 43, code: verificationCode }),
		// })
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		//get the users's id from the response
		// 		//the id would be passed through the navigator to the next
		// 		console.log(res);
		// 	});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.heading}>Sign Up</Text>
			<View style={styles.inputBoxContainer}>
				<TextInput
					style={{ flex: 1 }}
					onChangeText={(text) => handleUsernameChange(text)}
					value={userInfo.name}
					placeholder='Username'
					placeholderTextColor='black'
				/>
			</View>

			<View style={styles.inputBoxContainer}>
				<TextInput
					style={{ flex: 1 }}
					onChangeText={(text) => handleEmailChange(text)}
					value={userInfo.email}
					placeholder='Email'
					placeholderTextColor='black'
				/>
			</View>

			<View style={styles.inputBoxContainer}>
				<TextInput
					style={styles.inputBox}
					onChangeText={(text) => handlePasswordChange(text)}
					placeholder='Password'
					value={userInfo.password}
					secureTextEntry={true}
					placeholderTextColor='black'
				/>
				<TouchableOpacity onPress={onIconPress}>
					<Ionicons
						name={passwordSecurityProps.iconName}
						size={24}
						color='black'
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
	inputBox: { flex: 1 },
	inputBoxContainer: {
		borderBottomWidth: 1,
		flexDirection: 'row',
		width: '70%',
		marginBottom: 25,
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
