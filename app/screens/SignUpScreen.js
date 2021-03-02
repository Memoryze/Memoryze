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
	const [buttonClicked, setButtonClicked] = useState(false);
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);
	const [
		passwordConfirmFieldMessage,
		setPasswordConfirmFieldMessage,
	] = useState('Passwords must match');
	const [usernameFieldMessage, setUsernameFieldMessage] = useState(
		'Only letters and numbers allowed'
	);
	const [emailFieldMessage, setEmailFieldMessage] = useState(
		''
	);
	const [usernameBorderColor, setUsernameBorderColor] = useState('#eff2f7');
	const [emailBorderColor, setEmailBorderColor] = useState('#eff2f7');
	const [usernameFieldMessageColor, setUsernameFieldMessageColor] = useState(
		'#7c8ca0'
	);
	const [emailFieldMessageColor, setEmailFieldMessageColor] = useState(
		'#7c8ca0'
	);

	const [
		retypePasswordFieldMessageColor,
		setRetypePasswordFieldMessageColor,
	] = useState('#7c8ca0');
	const [passwordFieldMessageColor, setPasswordFieldMessageColor] = useState(
		'#7c8ca0'
	);
	const [emailFieldBorderColor, setEmailFieldBorderColor] = useState('');
	const handleUsernameChange = (username) => {
		let unwantedCharacters = ' !@#$%^&*()~`-+=,><?|\\{}:;\'"._';
		let lastChar = username[username.length - 1];
		setUsernameFieldMessage('Only letters and numbers allowed');
		setUsernameFieldMessageColor('#7c8ca0');
		setUsernameBorderColor('#eff2f7');

		setUsernameBorderColor('#eff2f7');
		setUserInfo({
			name: unwantedCharacters.includes(lastChar)
				? userInfo.name
				: username.toLocaleLowerCase(),
			email: userInfo.email,
			password: userInfo.password,
			retypePassword: userInfo.retypePassword,
		});
		setButtonClicked(false);
	};
	const handleEmailChange = (email) => {
		setEmailFieldMessage('');
		setEmailFieldMessageColor('#7c8ca0');
		setEmailBorderColor('#eff2f7');
		setUserInfo({
			name: userInfo.name,
			email: email,
			password: userInfo.password,
			retypePassword: userInfo.retypePassword,
		});
		setButtonClicked(false);
	};
	const handlePasswordChange = (password) => {
		setUserInfo({
			name: userInfo.name,
			email: userInfo.email,
			password: password,
			retypePassword: userInfo.retypePassword,
		});

		if (password === userInfo.retypePassword) {
			setPasswordConfirmed(true);
			setRetypePasswordFieldMessageColor('green');
			setPasswordConfirmFieldMessage('Passwords match!');
		} else {
			setPasswordConfirmFieldMessage('Passwords must match');
			setPasswordFieldMessageColor('#7c8ca0');
			setRetypePasswordFieldMessageColor('#7c8ca0');
		}
		setButtonClicked(false);
	};
	const handleRetypePasswordChange = (password) => {
		setUserInfo({
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
			retypePassword: password,
		});

		if (password === userInfo.password && userInfo.password !== '' && userInfo.password.length >= 6) {
			setPasswordConfirmed(true);
			setPasswordConfirmFieldMessage('Passwords match!');
			setRetypePasswordFieldMessageColor('green');
		} else {
			setPasswordConfirmFieldMessage('Passwords must match');
			setRetypePasswordFieldMessageColor('#7c8ca0');
		}
		setButtonClicked(false);
	};

	const handleSubmit = () => {
		let confirmedPassword = userInfo.password === userInfo.retypePassword;
		if (
			userInfo.password.length >= 6 &&
			confirmedPassword &&
			userInfo.name &&
			userInfo.email
		) {
			let url = 'http://localhost:8000/users/create_user';
			let body = {
				name: userInfo.name.toLocaleLowerCase(),
				email: userInfo.email.toLocaleLowerCase(),
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
					//get the user's id from the response
					//the id would be passed through the navigator to the next
					if(res.error){
						if(res.error === 'Username taken'){
							setUsernameFieldMessage('Oops! username already taken')
							setUsernameFieldMessageColor('#ff0033');
							setUsernameBorderColor('#ff0033');
						}else if(res.error === 'User with email already exists'){
							setEmailFieldMessage(res.error);
							setEmailFieldMessageColor('#ff0033');
							setEmailBorderColor('#ff0033');
							

						}
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			if (userInfo.password.length < 6) {
				setPasswordFieldMessageColor('#ff0033');
			}
			if (!confirmedPassword) {
				setRetypePasswordFieldMessageColor('#ff0033');
			}

			if (!userInfo.name) {
				setUsernameBorderColor('#ff0033');
			}
			if (!userInfo.email) {
				setEmailBorderColor('#FF0033');
			}
		}
	};
	let retypePasswordMessageStyle = {
		fontSize: 12,
		marginLeft: 5,
		marginBottom: 3,
		color: retypePasswordFieldMessageColor,
	};
	let passwordMessageStyle = {
		fontSize: 12,
		marginLeft: 5,
		marginBottom: 3,
		color: passwordFieldMessageColor,
	};
	let usernameMessageStyle = {
		fontSize: 12,
		marginLeft: 5,
		marginBottom: 3,
		color: usernameFieldMessageColor,
	};
	let emailMessageStyle = {
		fontSize: 12,
		marginLeft: 5,
		marginBottom: 3,
		color: emailFieldMessageColor,
	};
	let usernameInputBoxStyle = {
		borderColor: usernameBorderColor,
		padding: 12,
		width: '100%',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#eff2f7',
		marginBottom: 5,
	};
	let emailInputBoxStyle = {
		borderColor: emailBorderColor,
		padding: 12,
		width: '100%',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#eff2f7',
		marginBottom: 5,
	};

	return (
		<ImageBackground
			source={require('../assets/signupBackground.png')}
			style={styles.container}>
				<View style={styles.topContent}>
					<Image
						source={require('../assets/logo-icon.png')}
						style={styles.logo}
					/>
				</View>
			<View style={{backgroundColor:'white', width:'100%', justifyContent:'center', alignItems:'center', height:'75%' }}>
				
				<View style={styles.bottomContents}>
					<Text style={styles.heading}>Sign Up</Text>
					<Text style={styles.subHeading}>
						Signup to get started with the app.
					</Text>

					<View>
						<Text style={usernameMessageStyle}>{usernameFieldMessage}</Text>
						<TextInput
							style={usernameInputBoxStyle}
							onChangeText={(text) => handleUsernameChange(text)}
							value={userInfo.name}
							placeholder='Username'
							placeholderTextColor='#7c8ca0'
							autoCapitalize='none'
						/>
					</View>
					<View>
						<Text style={emailMessageStyle}> {emailFieldMessage} </Text>
						<TextInput
							style={emailInputBoxStyle}
							onChangeText={(text) => handleEmailChange(text)}
							value={userInfo.email}
							placeholder='Email'
							placeholderTextColor='#7c8ca0'
							autoCapitalize='none'
						/>
					</View>

					<View>
						<Text style={passwordMessageStyle}>
							Must be at least six characters, no spaces
						</Text>
						<TextInput
							style={styles.inputBox}
							onChangeText={(text) => handlePasswordChange(text)}
							placeholder='Password'
							value={userInfo.password}
							placeholderTextColor='#7c8ca0'
							secureTextEntry
							autoCapitalize='none'
						/>
					</View>

					<View>
						<Text style={retypePasswordMessageStyle}>
							{passwordConfirmFieldMessage}
						</Text>
						<TextInput
							style={styles.inputBox}
							onChangeText={(text) => handleRetypePasswordChange(text)}
							placeholder='Confirm Password'
							value={userInfo.retypePassword}
							placeholderTextColor='#7c8ca0'
							autoCapitalize='none'
							secureTextEntry
						/>
					</View>

					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonTitle}>SIGN UP</Text>
					</TouchableOpacity>
					<Text style={styles.loginPageNavigator}>Login to my Account</Text>
				</View>
			</View>
		</ImageBackground>
	);
}

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		color: '#ffffff',
		backgroundColor: '#f7f8fc',
	},
	topContent: {
		width: '100%',
		height: '25%',
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
		fontSize: 28,
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
		marginBottom: 5,
	},
	button: {
		backgroundColor: '#b1f0b1',
		marginTop: 15,
		width: '100%',
		marginBottom: 25,
		padding: 12,
		borderRadius: 10,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	loginPageNavigator: {
		color: '#445973',
		fontSize: 16,
		alignSelf: 'center',
	},
});
