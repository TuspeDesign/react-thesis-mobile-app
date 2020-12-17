import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/Styles';

export default class Loading extends React.Component {
	render() {
		return (
			<View style={styles.container} >
				<ActivityIndicator size="large" color="blue" />
				<Text style={[styles.tc, styles.h4]}>Ladataan...</Text>
			</View>
		)
	}
}

export { Loading }