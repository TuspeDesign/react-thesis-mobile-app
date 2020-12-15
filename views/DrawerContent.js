import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { styles } from '../styles/Styles'
import { Feather } from '@expo/vector-icons';

class DrawerContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			nav: null,
			open: false,
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

		let temp1 = this.state.temp;
		let temp = null;

		if (temp1 != null) {
			temp = temp1.charAt(0).toUpperCase() + temp1.slice(1);
		}

		if (temp == 'Sivu' || temp == 'Page' || temp == 'Yhteys' || temp == 'Tuote_aitio') {
			this.props.navigation.navigate('Sivu', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp) {
			this.props.navigation.navigate(temp, { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else {
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
						{this.state.open == false ? <Feather style={[styles.up, styles.navtest]} name="plus" size={25} color="black" onPress={() => { this.setState({ open: true }); }}>
						</Feather> : <Feather style={[styles.up, styles.navtest]} name="minus" size={25} color="black" onPress={() => { this.setState({ open: false }); }}>
							</Feather>}
						<TouchableOpacity style={[styles.navlink]} onPress={() => { this.checkTemplate(val.id); }}>
							<Text style={[styles.up]}>{val.title}</Text>
						</TouchableOpacity>
						{val.items.map((val, key) => {
							if (this.state.open) {
								return <View key={key} >
									<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
										<Text style={[styles.up, styles.navlink, styles.pl3]}>{val.title}</Text>
									</TouchableOpacity>
								</View>
							}
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