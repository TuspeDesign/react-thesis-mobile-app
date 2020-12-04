import React from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { styles } from '../styles/Styles'


class Pelaajat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			goalies: null,
			defense: null,
			forwards: null,

		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/players')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					goalies: data[2].players,
					defense: data[1].players,
					forwards: data[0].players,
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
			let goalies = this.state.goalies.map((val, key) => {
				if (val.img == null) {
					return <View key={key} style={styles.item, styles.mt3}>
						<Image style={styles.logo} source={{ uri: this.props.route.params.logo }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img, data: '1' })} />
					</View>
				} else {
					return <View key={key} style={styles.item}>
						<Image style={styles.logo} source={{ uri: val.img }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img })} />
					</View>
				}
			});

			let defense = this.state.defense.map((val, key) => {
				if (val.img == null) {
					return <View key={key} style={styles.item, styles.mt3}>
						<Image style={styles.logo} source={{ uri: this.props.route.params.logo }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img })} />
					</View>
				} else {
					return <View key={key} style={styles.item}>
						<Image style={styles.logo} source={{ uri: val.img }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img })} />
					</View>
				}
			});

			let forwards = this.state.forwards.map((val, key) => {
				if (val.img == null) {
					return <View key={key} style={styles.item, styles.mt3}>
						<Image style={styles.logo} source={{ uri: this.props.route.params.logo }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img })} />
					</View>
				} else {
					return <View key={key} style={styles.item}>
						<Image style={styles.logo} source={{ uri: val.img }} />
						<Button style={[styles.tc, styles.mb3]} title={val.teamId + ' ' + val.name} onPress={() => this.props.navigation.navigate('Pelaaja_Profiili', { profile_id: val.id, profile_img: val.img })} />
					</View>
				}
			});


			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} >
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Maalivahdit</Text>
						{goalies}
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Puolustajat</Text>
						{defense}
						<Text style={[styles.tc, styles.h4, styles.mb3]}>Hyökkääjät</Text>
						{forwards}
					</ScrollView>
				</View >

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
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.id + '/' + this.props.route.params.profile_id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					title: data.title,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.route.params.profile_id !== prevProps.route.params.profile_id) {
			fetch('https://api.sportti.org/sites/' + this.props.route.params.id + '/' + this.props.route.params.profile_id)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						isLoading: false,
						title: data.title,
					})
				})
				.catch((error) => {
					console.log(error)
				});
		}
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
			if (this.props.route.params.profile_img == null) {
				return <View style={styles.container}>
					<Image style={styles.logo} source={{ uri: this.props.route.params.logo }} />
					<Button style={[styles.tc, styles.mb3]} title={this.state.title} />
				</View>
			} else {
				return <View style={styles.container}>
					<Image style={styles.logo} source={{ uri: this.props.route.params.profile_img }} />
					<Button style={[styles.tc, styles.mb3]} title={this.state.title} />
				</View>
			}
		};

	}
}

export { Pelaajat, Pelaaja_profiili };



