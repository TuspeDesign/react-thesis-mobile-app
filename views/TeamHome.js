import React from "react";
import { Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import moment from "moment";
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class TeamHome extends React.Component {
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
		fetch('https://sportti.org/sites/' + this.props.route.params.domain + '/home')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					partners: data.partners,
					news: data.news,
					games: data.games.upcoming,
					featured_id: data.featured.id,
					featured_title: data.featured.title,
					featured_img: data.featured.img[0],
					nextGameTime: data.games.next.time.display,
					arena: data.games.next.arena,
					nextHome: data.games.next.teamHome.title,
					nextVisit: data.games.next.teamVisit.title,
					nextHomeLogo: data.games.next.teamHome.logo,
					nextVisitLogo: data.games.next.teamVisit.logo,
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
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Sivu', { domain: this.props.route.params.domain, page_id: this.state.featured_id })}>
					<Image style={[styles.players_img, { marginTop: 0 }]} source={{ uri: this.state.featured_img }} />
					<View style={[styles.main]}>
						<Text style={[styles.h4, styles.up]}>{this.state.featured_title}</Text>
					</View>
				</TouchableOpacity>
			</View>

			let nextGameTime = this.state.nextGameTime;
			let arena = this.state.arena;
			let nextHome = this.state.nextHome;
			let nextVisit = this.state.nextVisit;
			let nextHomeLogo = this.state.nextHomeLogo;
			let nextVisitLogo = this.state.nextVisitLogo;


			let nextGame = <View style={[styles.box, { backgroundColor: color }]}>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc]}>Seuraava kotiottelu</Text>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc, styles.mt3]}>{nextGameTime}</Text>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc]}>{arena}</Text>
				<View style={[styles.row, styles.jcc]}>
					<Image style={[styles.logo_top, styles.m2]} source={{ uri: nextHomeLogo }} />
					<Image style={[styles.logo_top, styles.m2]} source={{ uri: nextVisitLogo }} />
				</View>
				<Text style={[styles.h4, styles.up, styles.white, styles.tc, styles.mt3]}>{nextHome} - {nextVisit}</Text>
			</View>

			let news = this.state.news.map((val, key) => {
				let date = val.created.display;
				return <View key={key} style={styles.mb3}>
					<TouchableOpacity style={[styles.h4]} onPress={() => this.props.navigation.navigate('Sivu', { domain: this.props.route.params.domain, page_id: val.id })}>
						<Image style={styles.news_img} source={{ uri: val.img[0] }} />
						<Text style={[styles.h4, styles.up]}>{val.title}</Text>
						<Text>{date}</Text></TouchableOpacity>
				</View>
			});

			let games = this.state.games.map((val, key) => {
				return <View key={key}>
					<Text style={[styles.tc, styles.mb3, styles.mt3]}>{val.time.display}</Text>
					<View style={[styles.row, styles.jcc]}>
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamHome.logo }} />
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamVisit.logo}} />{/*Added url,teamname and .png to show visiting team logo*/}
					</View>
					<View style={[styles.mt3, styles.row, styles.jcc]}>
						<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - </Text>
						<Text style={[styles.tc, styles.mb3]}>{val.teamVisit.title}</Text>
					</View>
					<View style={styles.border}></View>
				</View >
			});

			let partners = this.state.partners.map((val, key) => {
				<View style={styles.border}></View>
				return <View key={key} style={styles.col6}>
					<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
						<Image style={styles.logo} source={{ uri: val.img }} />
					</TouchableOpacity>
				</View>

			});
			

			return (
				<View style={[styles.container]}>
					<ScrollView>
						{featured}
						<View style={[styles.main]}>
							{nextGame}
							{news}
							<TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={() => this.props.navigation.navigate('Uutiset', {domain: this.props.route.params.domain})}><Text style={[styles.button_h4, styles.up, styles.white]}>Uutisarkisto</Text></TouchableOpacity>
							<Text style={[styles.tc, styles.h4, styles.mt3, styles.mb3]}>Tulevia otteluita</Text>
							<View style={styles.box_border}>
								{games}
							</View>
							<View style={styles.row}>
								{partners}
							</View>
						</View>
					</ScrollView>
				</View>
			)
		}
	}
}

export { TeamHome };


