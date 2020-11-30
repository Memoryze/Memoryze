import React from 'react';
import { Image, Text, View } from 'react-native';

function Welcome({navigation}) {
	function upload() {
		let url = 'http://localhost:8000/';
		let uri = '../app/assets/muse.aiff';
		let uriParts = uri.split('.');
		let fileType = uriParts[uriParts.length - 1];
		let formData = new FormData();
		formData.append('recording', {
			uri,
			name: `sound.${fileType}`,
			type: `audio/x-${fileType}`,
		});
		formData.append('title', 'a title');
		formData.append('subject', 'a subject');

		let options = {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		};

		fetch(url, options)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			});
	}

	return <View>
		<View onStartShouldSetResponder={
			()=>{
				navigation.navigate('RecordView', {name: 'RecordView'})
			}
		}>
			<Text>
				Make a recording
			</Text>

		</View>
	</View>;
}

export default Welcome;
