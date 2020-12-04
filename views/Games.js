import React from "react";
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { styles } from '../styles/Styles'

class Games extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			games: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/games')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					games: data.games,
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
			let games = this.state.games.map((val, key) => {
				return <View key={key} style={styles.item, styles.mb3}>
					<Text style={[styles.tc, styles.mt3, styles.mb3]}>{val.time}</Text>
					<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - {val.teamVist[0]}</Text>
				</View>
			});
			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						<Text style={[styles.tc, styles.mt3, styles.mb3, styles.h4]}>Ottelut</Text>
						{games}
					</ScrollView>
				</View>
			);
		}
	}
}

export { Games };