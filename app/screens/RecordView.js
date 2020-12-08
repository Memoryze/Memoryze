import React, { useState, useEffect } from 'react';
import {
	Button,
	SafeAreaView,
	View,
	StyleSheet,
	Platform,
	PermissionsAndroid,
} from 'react-native';
import { Audio } from 'expo-av';

function RecordView({ navigate }) {
	const [fileName, setFilename] = useState('record.mp4');

	const [RecordPermissionGranted, setRecordPermissionGranted] = useState(false);
	const [player, setPlayer] = useState(new Audio.Sound());
	const [recorder, setRecorder] = useState(new Audio.Recording());

	const [buttons, setButtons] = useState('Record');
	function play() {
		player.getStatusAsync().then((res) => {
			console.log(res);
			if (res.isLoaded) {
				player.replayAsync();
			} else {
				player.loadAsync(require('../assets/muse.aiff')).then((res) => {
					player.playAsync().then((res) => {
						console.log(res);
					});
				});
			}
		});
	}
	function record() {
		recorder
			.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
			.then((res) => {
				console.log(res);
				recorder.startAsync();
				console.log('recording...');
			});
	}

	function playRecording() {
		recorder.createNewLoadedSoundAsync().then((res) => {
			res.sound.playAsync();
			res.sound.setVolumeAsync(5)
			console.log('playing recording');
		});
	}
	function stopRecording() {
		recorder.stopAndUnloadAsync();
		console.log('stopping recording')
	}

	useEffect(() => {
		Audio.requestPermissionsAsync().then((permissionResponse) => {
			setRecordPermissionGranted(permissionResponse.granted);
		});
		Audio.setAudioModeAsync({allowsRecordingIOS:true, playsInSilentModeIOS:true})
		player.setVolumeAsync(5);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Button title='play' onPress={play} />
			<Button title={buttons} onPress={record} />
			<Button title='stopRecording' onPress={stopRecording} />
			<Button title='playRecording' onPress={playRecording} />
		</SafeAreaView>
	);
}

export default RecordView;

const styles = StyleSheet.create({
	container: {},
});