import React, { Component } from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { styles } from '../styles/Styles'

class Pelaajat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			forwards: null,
			goalies: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.id + '/players')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					forwards: data[0].players,
					goalies: data[2].players,
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
					<Text style={[styles.tc, styles.h4]}>ID: {this.props.route.params.id}</Text>
				</View>
			)
		} else {
			let forwards = this.state.forwards.map((val, key) => {
				return <View key={key} style={styles.item}>
					<Text style={[styles.tc, styles.mb3]}>{val.name}</Text>
					<Image style={styles.logo} source={{ uri: val.img }} />
				</View>
			});
			let goalies = this.state.goalies.map((val, key) => {
				return <View key={key} style={styles.item}>
					<Button style={[styles.tc, styles.mb3]} title={val.name} />
					<Image style={styles.logo} source={{ uri: val.img }} />
				</View>
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} >
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Maalivahdit</Text>
						{goalies}
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Hyökkääjät</Text>
						{forwards}
					</ScrollView>
				</View>

			);

		}
	}
}
export { Pelaajat };



