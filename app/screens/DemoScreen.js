import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

function DemoScreen({ navigation }) {
	function upload(uri, name) {
		// let url = 'http://localhost:8000/';
		let url = 'https://memoryze-db.herokuapp.com/recordings/';
		// let uri = 'app/assets/eminem_lose_yourself.mp3';
		let uriParts = uri.split('.');
		let fileType = uriParts[uriParts.length - 1];
		let formData = new FormData();
		// /name: `sound.${fileType}`,
		formData.append('recording', {
			uri,
			name: name,
			type: `audio/x-${fileType}`,
		});
		formData.append('title', 'a title');
		// formData.append('subject', 'a subject');
		formData.append('tutor_id', 1);

		let options = {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		};
		console.log(uri + '  name: ' + name);
		fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			})
			.catch((error) => console.log(error));
	}
	const handleUpload = () => {
		const options = { type: 'audio/*', copyToCacheDirectory: false };
		// type either says success or cancel
		DocumentPicker.getDocumentAsync(options)
			.then(({ type, uri, name, size }) => {
				if (type === 'success') {
					upload(uri, name);
				} else {
					console.log(
						'Sorry Could not upload Type:' +
							type +
							' uri: ' +
							uri +
							' name ' +
							name
					);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('RecordScreen', { propsToPass: 'Example props' });
				}}
				style={styles.button}>
				<Text style={styles.buttonTitle}>Make a recording</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleUpload} style={styles.button}>
				<Text style={styles.buttonTitle}>Upload an audio</Text>
			</TouchableOpacity>
			<Text style={styles.temporaryInstructions}>
				Be Warned, once you select your audio file, it will be automatically
				uploaded
			</Text>
		</View>
	);
}

export default DemoScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	button: {
		backgroundColor: 'rgb(5,3,10)',
		marginBottom: 20,
		padding: 24,
		width: 200,
		borderRadius: 25,
	},
	buttonTitle: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	temporaryInstructions: {
		fontSize: 20,
		// fontWeight:'bold',
		alignSelf: 'center',
		marginHorizontal: 20,
		marginTop: 30,
	},
});
