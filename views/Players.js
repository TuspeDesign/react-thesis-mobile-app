import React from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import moment from "moment";
import { styles } from '../styles/Styles'

const default_img = 'https://kiekko-vantaa.fi/site/assets/files/2398/lohi.png';
const team_img = 'https://kiekko-vantaa.fi/site/assets/files/2398/untitled1-edit-edit.jpg';

class Pelaajat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			team: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/players')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					team: data.data,
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
			let team = this.state.team.map((val, key) => {
				return <View key={key}>
					<Text style={[styles.tc, styles.h4]}>{val.title}</Text>
					{val.players.map((val, key) => {
						if (val.img == null) {
							return <View key={key} style={styles.item, styles.mt3}>
								<Image style={styles.news_img} source={{ uri: default_img }} />
								<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img, team_id: this.props.route.params.team_id })} />
							</View>
						} else {
							return <View key={key} style={styles.item}>
								<Image style={styles.news_img} source={{ uri: val.img }} />
								<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img, team_id: this.props.route.params.team_id })} />
							</View>
						}
					})}
				</View>
			});
			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} >
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Joukkue</Text>
						<Image style={styles.news_img} source={{ uri: team_img }} />
						{team}
					</ScrollView>
				</View>
			);
		}
	}
}

class Pelaaja_profiili extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			title: null,
			number: null,
			position: null,
			birthDay: null,
			birthPlace: null,
			height: null,
			weight: null,
			catches: null,
			partner: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/' + this.props.route.params.profile_id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					title: data.title,
					number: data.teamId,
					position: data.position,
					birthDay: data.birthDay,
					birthPlace: data.birthPlace,
					height: data.height,
					weight: data.weight,
					catches: data.catches,

				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.route.params.profile_id !== prevProps.route.params.profile_id) {
			fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/' + this.props.route.params.profile_id)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						isLoading: false,
						title: data.title,
						number: data.teamId,
						position: data.position,
						birthDay: data.birthDay,
						birthPlace: data.birthPlace,
						height: data.height,
						weight: data.weight,
						catches: data.catches,
					})
				})
				.catch((error) => {
					console.log(error)
				});
		}
	}
	render() {
		let name = this.state.title;
		let number = this.state.number;
		let position = this.state.position;
		let birthDay = moment(this.state.birthDay * 1000).format('DD.MM.YYYY');
		let birthPlace = this.state.birthPlace;
		let height = this.state.height;
		let weight = this.state.weight;
		let catches = this.state.catches;

		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={[styles.tc, styles.h4]}>Ladataan...</Text>
				</View>
			)
		} else {

			let info = <View>
				<Text>Pelipaikka: {position}</Text>
				<Text>Syntymäaika: {birthDay}</Text>
				<Text>Syntymäpaikka: {birthPlace}</Text>
				<Text>Pituus: {height}</Text>
				<Text>Paino: {weight}</Text>
				<Text>Kätisyys: {catches}</Text>
			</View>

			if (this.props.route.params.profile_img == null) {
				return <View style={styles.container}>
					<Button style={[styles.tc, styles.mb3]} title={number + ' ' + name} />
					<Image style={styles.news_img} source={{ uri: default_img }} />
					{info}
				</View>
			} else {
				return <View style={styles.container}>
					<Button style={[styles.tc, styles.mb3]} title={number + ' ' + name} />
					<Image style={styles.news_img} source={{ uri: this.props.route.params.profile_img }} />
					{info}
				</View>
			}
		};

	}
}

export { Pelaajat, Pelaaja_profiili };



