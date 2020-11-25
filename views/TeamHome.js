import React, { Component } from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { styles } from '../styles/Styles'


class Etusivu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			partners: null,
			news: null,
			games: null,
		};
	}

	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.id + '/home')
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
			console.log(this.props)

			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={[styles.tc, styles.h4]}>ID: {this.props.route.params.id}</Text>
				</View>
			)
		} else {
			let logo = this.props.route.params.logo_url
			console.log(this.props)
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
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
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

export { Etusivu };


