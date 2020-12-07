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
	if (player) {
		player
	}
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

	async function requestRecordPermission() {
		try {
			const permissionGranted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
				{
					title: 'Microphone Permission',
					message: 'Memoryze needs access to your microphone for recording',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				}
			);

			if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	const activateMicrophonePermissionRequest = () => {
		let recordRequest =
			Platform.OS === 'android'
				? requestRecordPermission()
				: new Promise((resolve, reject) => resolve(true));

		recordRequest.then((permitted) => {
			if (!permitted) {
				setMicPermissionStatus('denied');
			}
		});
	};

	function playerReload() {
		if (player) {
			player.destroy();
		}

		setPlayer(
			new Player(fileName, { autoDestroy: false }).prepare((error) => {
				//this function is to preload the file so it plays immediately it is played
				if (error) {
					console.log('reload player error');
					console.log(error);
				} else {
					player.looping = false; //come back to this later
				}

				//make necessary state updates
			})
		);

		//perform operations when the player is paused and ended
	}

	function recorderReload() {
		if (recorder) {
			recorder.destroy();
		}

		setRecorder(
			new Recorder(fileName, {
				bitrate: 256000,
				quality: 'max',
			})
		);

		//make necessary state updates
	}
	const playOrPause = () => {
		player.playPause((error, paused) => {
			if (err) {
				setErrorMessage(error.message);
			}

			//make necessary state updates
		});
	};

	const toggleRecord = () => {
		if (micPermissionStatus === 'denied') {
			setErrorMessage('Permission to Record Audio has been denied');
			return;
		}
		recorder.toggleRecord((error, stopped) => {
			if (error) {
				setErrorMessage(error.message);
			} else if (stopped) {
				playerReload();
				recorderReload();
			}
		});
	};

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
