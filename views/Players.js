import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Loading } from './Loading';
import moment from "moment";
import { styles } from '../styles/Styles'

class Players extends React.Component {
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
					team: data,
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
					<Text style={[styles.toptitle, styles.mt3]}>{val.title}</Text>
					{val.players.map((val, key) => {
						let number = val.teamId != null ? "#" + val.teamId : "";
						return <View key={key}>
							<TouchableOpacity style={[styles.pb1]} onPress={() => this.props.navigation.navigate('PelaajaProfiili', { profile_id: val.id, profile_img: val.img, team_id: this.props.route.params.team_id })}>
								<Image style={styles.players_img} source={{ uri: val.img }} />
								<Text style={[styles.tc, styles.h4, styles.white, styles.up, styles.bg, styles.p2, { backgroundColor: color }]}>{number + ' ' + val.name} </Text>
							</TouchableOpacity>
						</View>
					})}
				</View>
			});
			return (
				<View style={styles.container}>
					<ScrollView>
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

class PlayerProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			title: null,
			number: null,
			info: null,
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
					info: data.table,
					partner: data.partners,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	componentDidUpdate(prevProps) {
		if (this.props.route.params.profile_id !== prevProps.route.params.profile_id) {
			fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/' + this.props.route.params.profile_id)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						isLoading: false,
						title: data.title,
						number: data.teamId,
						info: data.table,
						partner: data.partners,
					})
				})
				.catch((error) => {
					console.log(error)
				});
		}
	}

	render() {
		let name = this.state.title;
		let number = this.state.number != null ? "#" + this.state.number : "";
		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			let info = this.state.info.map((val, key) => {
				return <View key={key}>
					{val.name == 'Syntymäaika' ? <Text style={styles.border_bottom}>{val.name}: {moment(val.value * 1000).format('DD.MM.YYYY')}</Text>
						: <Text style={styles.border_bottom}>{val.name}: {val.value}</Text>}
				</View>
			});

			let partner = this.state.partner != null ? this.state.partner.map((val, key) => {
				return <View key={key}>
					<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
						<Image style={styles.partner_logo} source={{ uri: val.img }} />
					</TouchableOpacity>
				</View>
			}) : null;

			return (
				<View style={styles.container} >
					<ScrollView>
						<Text style={[styles.toptitle]}>{number + ' ' + name} </Text>
						<View style={styles.main}>
							{this.props.route.params.profile_img != null ? <Image style={[styles.players_img]} source={{ uri: this.props.route.params.profile_img }} />
								: <Image style={[styles.players_img]} source={{ uri: default_img }} />}
							{info}
							{partner}
						</View>
					</ScrollView>
				</View>
			);
		};
	}
}

export { Players, PlayerProfile };



