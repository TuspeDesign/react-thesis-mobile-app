import React from "react";
import { Text, View, ScrollView,Image,TouchableOpacity,Linking } from 'react-native';
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class Games extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			upcoming: null,
			past:null,
		};
	}
	componentDidMount() {
		fetch('https://sportti.org/sites/' + this.props.route.params.domain + '/games?year=2021')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					upcoming: data.games.upcoming,
					past:data.games.past,
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
			let upcoming = this.state.upcoming.map((val, key) => {
				return <View key={key}>
						<Text style={[styles.tc, styles.mt3, styles.mb3]}>{val.time.display}</Text>
					<View style={[styles.row, styles.jcc]}>
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamHome.logo }} />
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamVisit.logo}} />
					</View>
					<View style={[styles.mt3, styles.row, styles.jcc]}>
					<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - {val.teamVisit.title}</Text>
				</View></View>
			});
			this.state.past.reverse;
			let past = this.state.past.map((val, key) => {
				return <View key={key}>
						<Text style={[styles.tc, styles.mt3, styles.mb3]}>{val.time.display}</Text>
					<View style={[styles.row, styles.jcc]}>
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamHome.logo }} />
						<Image style={[styles.logo_top, styles.m2]} source={{ uri: val.teamVisit.logo}} />
					</View>

					<View style={[styles.mt3, styles.row, styles.jcc]}>
					<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - {val.teamVisit.title}</Text>
				</View>
				<TouchableOpacity style={[styles.delete, { backgroundColor: color }]} onPress={() => Linking.openURL(val.link)}><Text style={[styles.delete_h4, styles.up, styles.white]}>Otteluraportti</Text></TouchableOpacity></View>
			}).reverse();
			return (
				<View style={styles.container}>
					<ScrollView>
						<Text style={[styles.toptitle]}>Tulevat ottelut 2020-2021</Text>
						<View style={styles.main}>
							{upcoming}
						<Text style={[styles.toptitle]}>Menneet ottelut 2020-2021</Text>	
							{past}
						</View>
					</ScrollView>
				</View>
			);
		}
	}
}

export { Games };