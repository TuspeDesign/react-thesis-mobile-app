import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

	content: {
		backgroundColor: '#000000',
		width: '100%',
		height: '100%',
		padding: 15,
		paddingBottom: 0,
	},

	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		backgroundColor: '#ffffff',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},

	main: {
		padding: 15,
	},

	tc: {
		textAlign: 'center',
	},

	font: {
		fontFamily: 'Barlow-Regular',
		fontSize: 15,
	},

	tl: {
		textAlign: 'left',
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

	partner_logo: {
		width: 120,
		height: 120,
		resizeMode: 'contain',
	},

	news_img: {
		alignSelf: 'center',
		flex: 1,
		width: '100%',
		height: 300,
		resizeMode: 'contain',
	},

	players_img: {
		width: '100%',
		height: 500,
		resizeMode: 'cover',
		flex: 1,
		marginTop: 20,
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
		textTransform: "uppercase",
		fontFamily: 'Exo',
	},
	mt3: {
		marginTop: 30,
	},

	mb3: {
		marginBottom: 30,
	},

	p2: {
		padding: 8,
	},

	pb1: {
		paddingTop: 10,
	},

	pt3: {
		paddingTop: 30,
	},

	pl3: {
		paddingLeft: 30,
	},

	up: {
		textTransform: "uppercase",
	},

	delete: {
		padding: 10,
		backgroundColor: "#db524b",
		alignSelf: "center",
		borderRadius: 10,
	},

	delete_h4: {
		fontSize: 22,
		fontWeight: 'bold',
		fontFamily: 'Exo'
	},

	home: {
		padding: 10,
		backgroundColor: '#035e96',
		alignSelf: "center",
		borderRadius: 10,
	},

	players: {
		alignSelf: "center",
		width: '100%',
	},

	bg: {
		backgroundColor: '#035e96',
	},


	test: {
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 2,
	},



	navlink: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'Exo',
		fontSize: 16,
		borderTopWidth: 1,
		borderColor: '#689fc0',
	},

	navlinksub: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'Exo',
		fontSize: 16,
	},

	toptitle: {
		backgroundColor: '#035e96',
		fontSize: 22,
		textTransform: "uppercase",
		fontFamily: 'Exo',
		color: 'white',
		textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},

	border: {
		borderTopWidth: 1,
		borderColor: '#689fc0',
		width: '100%',
	},

	border_bottom: {
		borderBottomWidth: 1,
		borderColor: '#bbb',
		width: '100%',
		marginBottom: 10,
		marginTop: 10,
	},


	dropdown: {
		position: 'absolute',
		right: 5,
		top: 6,
		paddingLeft: 20,
	},

});