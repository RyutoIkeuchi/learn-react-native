import React, { useEffect, useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Platform,
	Image,
	TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ImagePick = () => {
	const [image, setImage] = useState(null);

	const loadItem = async () => {
		try {
			const imageString = await AsyncStorage.getItem('image');
			if (imageString) {
				const result = JSON.parse(imageString);
				setImage(result);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const savePhoto = async (photo) => {
		try {
			const imageString = JSON.stringify(photo);
			await AsyncStorage.setItem('image', imageString);
		} catch (e) {
			console.log(e);
		}
  };
  
	useEffect(() => {
    loadItem();
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestCameraPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 3],
			quality: 0,
		});
		if (!result.cancelled) {
			setImage(result.uri);
			savePhoto(result.uri);
		}
	};
	return (
		<View style={styles.image} onPress={pickImage}>
			<Text style={styles.imageTitle}>写真の検証</Text>
			<TouchableOpacity onPress={pickImage}>
				{image ? (
					<Image style={styles.imageIcon} source={{ uri: image }} />
				) : (
					<Icon style={styles.defaultIcon} name="home" size={100} />
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageTitle: {
		paddingBottom: 30,
		fontSize: 30,
	},
	imageIcon: {
		width: 100,
		height: 100,
		borderRadius: 100,
	},
	defaultIcon: {
		borderRadius: 30,
		borderWidth: 2,
	},
});
