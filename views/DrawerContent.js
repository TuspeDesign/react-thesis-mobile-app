import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../styles/Styles'
import { Feather } from '@expo/vector-icons';
import { Loading } from './Loading';

class DrawerContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			nav: null,
			openedID: null,
		};
	}

	componentDidMount() {
		fetch('https://sportti.org/sites/' + this.props.state.routes[0].params.domain + '/menu')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					nav: data.menu,
					openedID: null,
				})
			})
			.catch((error) => console.log(error))
		//Modifying header based on selected team data
		this.props.navigation.setOptions({
			headerLeft: () => (<Image style={styles.logo_top} source={{ uri: this.props.state.routes[0].params.logo }} />),
			headerStyle: { backgroundColor: this.props.state.routes[0].params.color },
			title: this.props.state.routes[0].params.name, headerTitleAlign: 'center', headerTitleStyle: { color: 'white' }
		})
	}
	// Check page template to move user to matching screen name
	async checkTemplate(id) {
		await fetch('https://sportti.org/sites/' + this.props.state.routes[0].params.domain + '/page?id=' + id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ temp: data.template });
			})
			.catch((error) => console.log(error))

		//Change first letter of temp variable to uppercase so it matches drawerscreen name
		let temp1 = this.state.temp;
		let temp = null;
		if (temp1 != null) {
			temp = temp1.charAt(0).toUpperCase() + temp1.slice(1);
		}

		if (temp == 'Sivu' || temp == 'Page' || temp == 'Yhteys' || temp == 'Tuote_aitio') {
			this.props.navigation.navigate('Sivu', { page_id: id, domain: this.props.state.routes[0].params.domain })
		} else if (temp) {
			this.props.navigation.navigate(temp, { page_id: id, domain: this.props.state.routes[0].params.domain })
		} else {
			this.props.navigation.navigate('Etusivu', { page_id: id, domain: this.props.state.routes[0].params.domain })
		}
	}



	render() {
		[global.color = this.props.state.routes[0].params.color] // Saved team main color to global variable so it can be used in styling;
		if (this.state.isLoading) {
			return (
				<View style={styles.container, styles.bg}>
					<TouchableOpacity onPress={() => { this.props.navigation.navigate('Poista tallennettu joukkue') }}>
						<Text style={[styles.up, styles.navlink]}>Valittu joukkue</Text>
					</TouchableOpacity>
					<Loading />
				</View>
			)
		}
		else {
			let navigation = this.state.nav.map((val, key) => {
				if (val.items) {
					return <View key={key} >
						{this.state.openedID == val.id ? <Feather style={[styles.dropdown]} name="minus" size={30} color="white" onPress={() => { this.setState({ openedID: null }) }}>
						</Feather> : <Feather style={[styles.dropdown]} name="plus" size={30} color="white" onPress={() => { this.setState({ openedID: val.id }) }}></Feather>}
						<View style={[styles.border]}></View>
						<TouchableOpacity style={{ width: 300 }} onPress={() => { this.checkTemplate(val.id); }}>
							<Text style={[styles.up, styles.navlinksub, styles.white]}>{val.title}</Text>
						</TouchableOpacity>
						{this.state.openedID == val.id ? val.items.map((val, key) => {
							return <View key={key} >
								<View style={[styles.border]}></View>
								<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
									<Text style={[styles.up, styles.navlink, styles.pl3, styles.white]}>{val.title}</Text>
								</TouchableOpacity>
							</View>
						}) : null}
					</View >
				} else {
					return <View key={key}>
						<View style={[styles.border]}></View>
						<TouchableOpacity onPress={() => { this.checkTemplate(val.id); }}>
							<Text style={[styles.up, styles.navlink, styles.white]}>{val.title}</Text>
						</TouchableOpacity>
					</View>
				}
			});
			return (
				<View style={{ backgroundColor: color }}>
					<ScrollView>
						<TouchableOpacity onPress={() => {this.props.navigation.navigate('Etusivu')}}>
							<Text style={[styles.up, styles.navlink, styles.white]}>Etusivu</Text>
						</TouchableOpacity>
						{navigation}
						<View style={[styles.border]}></View>
						<TouchableOpacity onPress={() => { this.props.navigation.navigate('Poista tallennettu joukkue') }}>
							<Text style={[styles.up, styles.navlink, styles.white]}>Valittu joukkue</Text>
						</TouchableOpacity>
					</ScrollView>
				</View >
			);
		}
	}
}

export { DrawerContent }