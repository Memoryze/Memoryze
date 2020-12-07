import React, { useState, useEffect } from 'react';
import {
	Button,
	SafeAreaView,
	View,
	StyleSheet,
	Platform,
	PermissionsAndroid,
} from 'react-native';
import { Player, Recorder } from '@react-native-community/audio-toolkit';


function RecordView({ navigate }) {
	const [fileName, setFilename] = useState('record.mp4');
	
	const [player, setPlayer] = useState( new Player);

	const [recorder, setRecorder] = useState(
		new Recorder(fileName, {
			bitrate: 256000,
			quality: 'max',
		})
	);

	//buttons
	const [buttons, setButtons] = useState({
		recordButton: recorder && recorder.isRecording ? 'Stop' : 'Record',
	});


	useEffect(() => {
		activateMicrophonePermissionRequest();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Button
				title='play'
				onPress={() => {
					playOrPause();
				}}
			/>
			<Button
				title={buttons.recordButton}
				onPress={() => {
					toggleRecord();
				}}
			/>
		</SafeAreaView>
	);
}

export default RecordView;

const styles = StyleSheet.create({
	container: {},
});
