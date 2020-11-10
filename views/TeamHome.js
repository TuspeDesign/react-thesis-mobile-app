import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import home from './Home';
import { createDrawer } from "./Home";




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
	constructor(props) {

		super(props);
		this.state = {
			news: null,
			partners: null,
			games: null,
			isLoading: true,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/928640177/home')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					partners: data.partners,
					news: data.news,
					games: data.games.upcoming,
				})
			})
			.catch((error) => {
				console.log(error)
			});


	}
	render() {

		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator />
				</View>
			)
		} else {

			let news = this.state.news.map((val, key) => {
				return <View key={key} style={styles.item, styles.mb3}>
					<Button style={[styles.tc, styles.h4]} title={val.title} />
				</View>
			});

			let partners = this.state.partners.map((val, key) => {
				return <View key={key} style={styles.item}>
					<Image style={styles.logo} source={{ uri: val.img }} />
				</View>

			});

			let games = this.state.games.map((val, key) => {
				return <View key={key} style={styles.item}>
					<Text style={[styles.tc, styles.mb3]}>{val.time}</Text>
					<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - {val.teamVist[0]}</Text>
				</View>

			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }}>
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Uutiset</Text>
						{news}
						<Text style={[styles.tc, styles.h4, styles.mt3, styles.mb3]}>Tulevat ottelut</Text>
						{games}
						<Text style={[styles.tc, styles.h4, styles.mt3, styles.mb3]}>Yhteistyökumppanit</Text>
						{partners}

					</ScrollView>
				</View>

			);

		}

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
		alignSelf: 'center',
		flex: 1,
		width: 150,
		height: 150,
		resizeMode: 'contain'

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
	}


});