import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	tc: {
		textAlign: 'center',
	},
	logo: {
		alignSelf: 'center',
		flex: 1,
		width: 150,
		height: 150,
		resizeMode: 'contain',
		marginTop: 10,
		marginBottom: 10,
	},

	logo_top: {
		alignSelf: 'center',
		flex: 1,
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	h4: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 20,
	},
	mt3: {
		marginTop: 30,
	},
	mb3: {
		marginBottom: 30,
	},
	navigator: {
		marginTop: 0,
	},

	up: {
		textTransform: "uppercase",
	}

});