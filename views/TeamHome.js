import React from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
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
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={[styles.tc, styles.h4]}>Ladataan...</Text>
				</View>
			)
		} else {
			let news = this.state.news.map((val, key) => {
				return <View key={key} style={styles.mb3}>
					<TouchableOpacity style={[styles.tc, styles.h4]} onPress={() => this.props.navigation.navigate('Sivu', {
						team_id: this.props.route.params.id, page_id: val.id
					})}>
						<Text style={[styles.tc, styles.h4, styles.white, styles.up, styles.bg, styles.p2]}>{val.title} </Text></TouchableOpacity>
				</View>
			});

			let partners = this.state.partners.map((val, key) => {
				return <View key={key} style={styles.item}>
					<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
						<Image style={styles.logo} source={{ uri: val.img }} />
					</TouchableOpacity>
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
						<Text style={[styles.tc, styles.h4, styles.mb3, styles.mt3]}>Uutiset</Text>
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


