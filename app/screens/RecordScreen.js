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

function RecordScreen({ navigate }) {
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
					.loadAsync(
						require('../assets/eminem_lose_yourself.mp3'),
						initialStatus
					)
					.then((res) => {
						player.playAsync().then((res) => {
							console.log(res);
						});
					});
			}
		});
	}
	function pause() {
		player.pauseAsync().then(() => {
			console.log('music paused');
		});
	}

	function continuePlaying() {
		player.playAsync().then(() => {
			console.log('playing after pause');
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
		const butt = (you) => {
			return you;
		};
		console.log(butt());
	}, []);
	const Butt = ({ children }) => {
		return children;
	};
	console.log(player);
	return (
		<SafeAreaView style={styles.container}>
			<Butt>
				<Button title='Play Music' onPress={play} />
			</Butt>

			<Button title='Pause Music' onPress={pause} />
			<Button title='Continue Music' onPress={continuePlaying} />
			<Button title={buttons} onPress={record} />
			<Button title='stop Recording' onPress={stopRecording} />
			<Button title='play Recording' onPress={playRecording} />
		</SafeAreaView>
	);
}

export default RecordScreen;

const styles = StyleSheet.create({
	container: {},
});
