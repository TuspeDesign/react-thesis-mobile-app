import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { styles } from '../styles/Styles'


class DrawerContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			nav: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.state.routes[0].params.id + '/menu')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					nav: data,
				})
			})
			.catch((error) => console.log(error))
	}

	async checkTemplate(id) {
		await fetch('https://api.sportti.org/sites/' + this.props.state.routes[0].params.id + '/' + id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ temp: data.template });
			})
			.catch((error) => console.log(error))

		let temp = this.state.temp

		if (temp == 'sivu' || temp == 'page' || temp == 'yhteys' || temp == 'tuote_aitio') {
			this.props.navigation.navigate('Sivu', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'ottelut') {
			this.props.navigation.navigate('Ottelut', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'pelaajat') {
			this.props.navigation.navigate('Joukkue', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'kumppanit') {
			this.props.navigation.navigate('Yhteistyössä', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'uutiset') {
			this.props.navigation.navigate('Uutiset', { page_id: id, team_id: this.props.state.routes[0].params.id })
		}
		else {
			this.props.navigation.navigate('Etusivu', { page_id: id, team_id: this.props.state.routes[0].params.id })
		}
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<TouchableOpacity onPress={() => { this.props.navigation.navigate('Poista tallennettu joukkue') }}>
						<Text style={[styles.up, styles.navlink]}>Poista valittu joukkue</Text>
					</TouchableOpacity>
					<ActivityIndicator size="large" color="blue" />
				</View>
			)
		} else {
			let navigation = this.state.nav.map((val, key) => {
				if (val.items) {
					return <View key={key} >
						<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
							<Text style={[styles.up, styles.navlink]}>{val.title}</Text>
						</TouchableOpacity>
						{val.items.map((val, key) => {
							return <View key={key} >
								<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
									<Text style={[styles.up, styles.navlink]}>{val.title}</Text>
								</TouchableOpacity>
							</View>
						})}
					</View >
				} else {
					return <View key={key}>
						<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
							<Text style={[styles.up, styles.navlink]}>{val.title}</Text>
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						{navigation}
						<TouchableOpacity onPress={() => { this.props.navigation.navigate('Poista tallennettu joukkue') }}>
							<Text style={[styles.up, styles.navlink]}>Poista valittu joukkue</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			);
		}
	}
}

export { DrawerContent }