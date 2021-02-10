import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

function SignUpScreen(props) {
    return (
			<SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Sign Up</Text>
				<TextInput
					style={styles.inputBox}
					placeholder='Username'
					placeholderTextColor='black'
				/>
				<TextInput
					style={styles.inputBox}
					placeholder='Email'
					placeholderTextColor='black'
				/>
				<TextInput
					style={styles.inputBox}
					placeholder='Password'
					placeholderTextColor='black'
				/>
				<TextInput
					style={styles.inputBox}
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
        marginBottom:15,
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