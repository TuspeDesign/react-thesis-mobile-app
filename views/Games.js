import React from "react";
import { Text, View, ScrollView } from 'react-native';
import { Loading } from './Loading';
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
			return (<Loading />);
		} else {
			let games = this.state.games.map((val, key) => {
				return <View key={key}>
					<Text style={[styles.tc, styles.mt3, styles.mb3]}>{val.time}</Text>
					<Text style={[styles.tc, styles.mb3]}>{val.teamHome.title} - {val.teamVist[0]}</Text>
				</View>
			});
			return (
				<View style={styles.container}>
					<ScrollView>
						<Text style={[styles.toptitle, { backgroundColor: color }]}>Ottelut 2020-2021</Text>
						<View style={styles.main}>
							{games}
						</View>
					</ScrollView>
				</View>
			);
		}
	}
}

export { Games };