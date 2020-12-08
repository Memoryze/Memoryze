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
	let recorder = new Audio.Recording();
	let player = new Audio.Sound();
	let recording = new Audio.Sound();

	const [RecordPermissionGranted, setRecordPermissionGranted] = useState(false);

	const [initialStatus, setInitialStatus] = useState({
		shouldPlay: false,
		rate: 1.0,
		shouldCorrectPitch: true,
		volume: 1.0,
		isMuted: false,
		isLooping: false,
	});

	const [buttons, setButtons] = useState('Record');

	function play() {
		player.getStatusAsync().then((res) => {
			console.log(res);
			if (res.isLoaded) {
				player.replayAsync();
			} else {
				player
					.loadAsync(require('../assets/muse.aiff'), initialStatus)
					.then((res) => {
						player.playAsync().then((res) => {
							console.log(res);
						});
					});
			}
		});
	}

	function record() {
		const prepareToRecord = () => {
			recorder
				.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
				.then((res) => {
					console.log(res);
					recorder.startAsync();
					console.log('recording...');
				});
		};
		if (RecordPermissionGranted) {
			recorder.getStatusAsync().then((status) => {
				console.log(status);
				if (status.canRecord) {
					prepareToRecord();
				} else {
					recorder = new Audio.Recording();
					prepareToRecord();
				}
			});
		}
	}

	function playRecording() {
		recording.getStatusAsync().then((status) => {
			console.log(status);
			if (status.isLoaded) {
				recording.replayAsync();
				console.log('replaying recording...');
			} else {
				recorder.createNewLoadedSoundAsync(initialStatus).then((res) => {
					res.sound.playAsync();
					console.log('playing recording...');
				});
			}
		});
	}

	function stopRecording() {
		recorder.stopAndUnloadAsync();
		console.log('stopping recording');
	}

	useEffect(() => {
		Audio.requestPermissionsAsync().then((permissionResponse) => {
			setRecordPermissionGranted(permissionResponse.granted);
		});
		Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			playsInSilentModeIOS: true,
		});
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
