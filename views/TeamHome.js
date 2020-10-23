import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import home from './Home';



class Kiekkopojat extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]}>Joensuun Kiekko-pojat</Text>


			</View>

		);

	}

}

class Kiekkovantaa extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]} >Kiekko-Vantaa</Text>


			</View>

		);

	}

}


class Roki extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]}>RoKi Hockey</Text>


			</View>

		);

	}

}

class Kurra extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]}>Kurra</Text>


			</View>

		);

	}

}

class Kapulanpallo extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]}>Käpylän pallo</Text>


			</View>

		);

	}

}

class Pallokerhokeskiuusimaa extends React.Component {


	render() {



		return (

			<View style={styles.container}>
				<Text style={[styles.tc, styles.h4]}>Pallokerho keski-uusimaa</Text>
			</View>

		);

	}

}





export { Kiekkopojat, Kiekkovantaa, Roki, Kurra, Kapulanpallo, Pallokerhokeskiuusimaa };




const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 30,
		width: '100%',
		height: '100%',
		justifyContent: 'center',


	},

	tc: {
		textAlign: 'center',
	},


	logo: {
		height: 150,
		width: 150,
		alignSelf: 'center',

	},

	h4: {
		fontSize: 22,
		fontWeight: 'bold',
	}


});