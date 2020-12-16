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

	container_news: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	tc: {
		textAlign: 'center',
		fontFamily: 'Barlow-Regular',
		fontSize: 15,
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

	news_img: {
		alignSelf: 'center',
		flex: 1,
		width: '100%',
		height: 300,
		resizeMode: 'contain',
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
		fontFamily: 'Exo'
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

	border: {
		borderTopWidth: 1,
		borderColor: '#689fc0',
		width: '100%',
	},


	dropdown: {
		position: 'absolute',
		right: 5,
		top: 6,
		paddingLeft: 20,
	},





});