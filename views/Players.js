import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Loading } from './Loading';
import moment from "moment";
import { styles } from '../styles/Styles'

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
			return (<Loading />);
		} else {
			let team = this.state.team.map((val, key) => {
				return <View key={key}>
					<Text style={[styles.toptitle, styles.mt3, { backgroundColor: color }]}>{val.title}</Text>
					{val.players.map((val, key) => {
						if (val.img == null) {
							return <View key={key}>
								<TouchableOpacity style={[styles.pb1]} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img, team_id: this.props.route.params.team_id })}>
									<Image style={styles.players_img} source={{ uri: default_img }} />
									<Text style={[styles.tc, styles.h4, styles.white, styles.up, styles.bg, styles.p2, { backgroundColor: color }]}>{val.teamId + ' ' + val.name} </Text>
								</TouchableOpacity>
							</View>
						} else {
							return <View key={key}>
								<TouchableOpacity style={[styles.pb1]} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img, team_id: this.props.route.params.team_id })}>
									<Image style={styles.players_img} source={{ uri: val.img }} />
									<Text style={[styles.tc, styles.h4, styles.white, styles.up, styles.bg, styles.p2, { backgroundColor: color }]}>{val.teamId + ' ' + val.name} </Text>
								</TouchableOpacity>
							</View >
						}
					})
					}
				</View >
			});
			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						<Text style={[styles.toptitle]}>Joukkue</Text>
						<View style={styles.main}>
							<Image style={styles.news_img} source={{ uri: team_img }} />
							{team}
						</View>
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
					/*partner: data.partners.img,*/
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
						/*partner: data.partners.img,*/
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
		let partner = this.state.partner;


		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			let info = <View>
				<Text style={[styles.border_bottom]}>Pelipaikka: {position}</Text>
				<Text style={styles.border_bottom}>Syntymäaika: {birthDay}</Text>
				<Text style={styles.border_bottom}>Syntymäpaikka: {birthPlace}</Text>
				<Text style={styles.border_bottom}>Pituus: {height}</Text>
				<Text style={styles.border_bottom}>Paino: {weight}</Text>
				<Text style={styles.border_bottom}>Kätisyys: {catches}</Text>
			</View >

			return <View style={styles.container}>
				<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
					<Text style={[styles.toptitle, { backgroundColor: color }]}>{'#' + number + ' ' + name} </Text>
					<View style={styles.main}>
						{this.props.route.params.profile_img != null ? <Image style={[styles.players_img]} source={{ uri: this.props.route.params.profile_img }} />
							: <Image style={[styles.players_img]} source={{ uri: default_img }} />}
						{info}
						{this.state.partner != null ? <Image style={[styles.partner_logo]} source={{ uri: partner }} />
							: null}
					</View>
				</ScrollView>
			</View>
		};

	}
}

export { Pelaajat, Pelaaja_profiili };



