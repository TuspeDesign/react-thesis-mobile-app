import React from "react";
import { Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import moment from "moment";
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class Etusivu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			partners: null,
			news: null,
			games: null,
			featured_id: null,
			featured_title: null,
			featured_img: null,
			nextGameTime: null,
			arena: null,
			nextHome: null,
			nextVisit: null,
			nextHomeLogo: null,
			nextVisitLogo: null,
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
					featured_id: data.featured.id,
					featured_title: data.featured.title,
					featured_img: data.featured.img,
					nextGameTime: data.games.next.time,
					arena: data.games.next.arena,
					nextHome: data.games.next.teamHome.title,
					nextVisit: data.games.next.teamVist[0],
					nextHomeLogo: data.games.next.teamHome.logo,
					nextVisitLogo: data.games.next.teamVist.logo,
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

			let featured = <View>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Sivu', { team_id: this.props.route.params.id, page_id: this.state.featured_id })}>
					<Image style={[styles.players_img, { marginTop: 0 }]} source={{ uri: default_img }} />
					<Text style={[styles.h4, styles.up, styles.abs, styles.white, styles.p2, { bottom: 20 }]}>{this.state.featured_title}</Text>
				</TouchableOpacity>
			</View>

			let nextGameTime = moment(this.state.nextGameTime * 1000).format('DD.MM.YYYY')
			let arena = this.state.arena;
			let nextHome = this.state.nextHome;
			let nextVisit = this.state.nextVisit;
			let nextHomeLogo = this.state.nextHomeLogo;
			let nextVisitLogo = this.state.nextVistLogo;

			let nextGame = <View style={[styles.box, { backgroundColor: color }]}>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc]}>Seuraava kotiottelu</Text>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc, styles.mt3]}>{nextGameTime}</Text>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc]}>{arena}</Text>
				<View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }]}>
					<Image style={[styles.logo_top, styles.m2]} source={{ uri: nextHomeLogo }} />
					<Image style={[styles.logo_top, styles.m2]} source={{ uri: nextVisitLogo }} />
				</View>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc, styles.mt3]}>{nextHome} - {nextVisit}</Text>
			</View>

			let news = this.state.news.map((val, key) => {
				let date = moment(val.date * 1000).format('DD.MM.YYYY')
				return <View key={key} style={styles.mb3}>
					<Image style={styles.news_img} source={{ uri: val.img }} />
					<TouchableOpacity style={[styles.h4]} onPress={() => this.props.navigation.navigate('Sivu', { team_id: this.props.route.params.id, page_id: val.id })}>
						<Text style={[styles.h4, styles.up]}>{val.title}</Text></TouchableOpacity>
					<Text>{date}</Text>
				</View>
			});

			let partners = this.state.partners.map((val, key) => {
				return <View key={key}>
					<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
						<Image style={styles.logo} source={{ uri: val.img }} />
					</TouchableOpacity>
				</View>

			});

			let games = this.state.games.map((val, key) => {
				var visitLogo = val.teamVist.logo.replace('.png', '');
				return <View key={key}>
					<Text style={[styles.tc, styles.mb3, styles.font, styles.bold, styles.mt3]}>{val.time}</Text>
					<View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamHome.logo }} />
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: visitLogo + val.teamVist[1] + ".png" }} />
					</View>
					<View style={[styles.mt3, { flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
						<Text style={[styles.tc, styles.mb3, styles.font]}>{val.teamHome.title} - </Text>
						<Text style={[styles.tc, styles.mb3, styles.font]}>{val.teamVist[0]}</Text>
					</View>
				</View >

			});

			return (
				<View style={styles.content}>
					<View style={[styles.container]}>
						<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
							<Text style={[styles.toptitle]}>{this.props.route.params.name}</Text>
							{featured}
							<View style={[styles.main]}>
								{nextGame}
								{news}
								<Text style={[styles.tc, styles.h4, styles.mt3, styles.mb3]}>Tulevat ottelut</Text>
								{games}
								<Text style={[styles.tc, styles.h4, styles.mt3, styles.mb3]}>Yhteistyökumppanit</Text>
								{partners}
							</View>
						</ScrollView>
					</View>
				</View>
			);
		}
	}
}

export { Etusivu };


