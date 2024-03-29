import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		flex: 1,
		backgroundColor: '#ffffff',
	},

	row: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	col6: {
		flexBasis: '50%',
	},

	jcc: {
		justifyContent: 'center',
	},

	main: {
		padding: 15,
	},

	tc: {
		textAlign: 'center',
	},

	tl: {
		textAlign: 'left',
	},

	white: {
		color: '#fff',
	},

	abs: {
		position: 'absolute',
	},

	logo: {
		alignSelf: 'center',
		width: 120,
		height: 120,
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
		width: '100%',
		height: 300,
		resizeMode: 'contain',
	},

	players_img: {
		width: '100%',
		height: 500,
		resizeMode: 'cover',
		marginTop: 20,
	},

	logo_top: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
	},
	h4: {
		fontSize: 22,
		textTransform: "uppercase",
	},

	mt3: {
		marginTop: 30,
	},

	mb3: {
		marginBottom: 30,
	},

	mr3: {
		marginLeft: 30,
	},

	p2: {
		padding: 8,
	},

	m2: {
		margin: 8,
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

	button: {
		padding: 10,
		backgroundColor: "#db524b",
		alignSelf: "center",
		borderRadius: 10,
	},

	button_h4: {
		fontSize: 22,
		fontWeight: 'bold',

	},

	bold: {
		fontWeight: 'bold',
	},

	home: {
		padding: 10,
		backgroundColor: '#035e96',
		alignSelf: "center",
		borderRadius: 10,
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
		fontSize: 16,
	},

	navlinksub: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 16,
	},

	toptitle: {
		fontSize: 30,
		textAlign: 'center',
		paddingTop: 30,
		paddingBottom: 30,
	},

	border: {
		borderTopWidth: 1,
		borderColor: '#d6dfe3',
		width: '100%',
	},

	box_border: {
		borderWidth: 1,
		borderColor: '#d6dfe3',
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

	box: {
		width: '100%',
		padding: 30,
	}

});