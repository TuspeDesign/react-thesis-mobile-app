import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/Styles';

export default class Loading extends React.Component {
	//Render loading circle to indicate that the fetching data process is not completed
	render() {
		return (
			<View style={[styles.container, { justifyContent: 'center' }]} >
				<ActivityIndicator size="large" color="blue" />
				<Text style={[styles.tc]}>Ladataan...</Text>
			</View>
		)
	}
}

export { Loading }