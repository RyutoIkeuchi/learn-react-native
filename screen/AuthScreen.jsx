import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default class Auth extends React.Component {
	supportAuthentication = async () => {
		const result =
			await LocalAuthentication.supportedAuthenticationTypesAsync();
		alert(result);
	};

	checkDeviceForHardware = async () => {
		const compatible = await LocalAuthentication.hasHardwareAsync();
		if (compatible) {
			alert('有効なデバイスです');
		} else {
			alert('無効なデバイスです');
		}
	};

	checkForBiometrics = async () => {
		const biometricRecords = await LocalAuthentication.isEnrolledAsync();
		if (biometricRecords) {
			alert('生体認証有効');
		} else {
			alert('生体認証無効');
		}
	};

	handleAuthentication = async () => {
		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: '認証を促すメッセージ',
			cancelLabel: 'キャンセルラベル',
			fallbackLabel: '認証失敗時のメッセージ',
			disableDeviceFallback: true,
		});
		if (result.success) {
			alert('認証成功');
		} else {
			LocalAuthentication.cancelAuthenticate();
			alert('認証失敗');
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Local authentication</Text>
				<Button
					title="デバイスチェック"
					onPress={this.checkDeviceForHardware}
				/>
				<Button title="生体認証チェック" onPress={this.checkForBiometrics} />
				<Button
					title="認証サポートチェック"
					onPress={this.supportAuthentication}
				/>
				<Button title="認証チェック" onPress={this.handleAuthentication} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
