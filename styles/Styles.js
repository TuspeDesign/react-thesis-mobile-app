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

	white: {
		color: '#fff',
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
	},
	mt3: {
		marginTop: 30,
	},
	mb3: {
		marginBottom: 30,
	},
	up: {
		textTransform: "uppercase",
	},

	delete: {
		padding: 10,
		backgroundColor: "#db524b",
		alignSelf: "center",
		borderRadius: 10,
	}
});