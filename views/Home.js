import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Loading } from './Loading';
import { styles } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			teams: null,
			image_url: null,
			image_format: null,
		};
	}
	// Save selected team data to AsyncStorage so user doesn't have to select team each time
	saveData = async (domain, name, logo, color) => {
		try {
			await AsyncStorage.setItem('domain', domain)
			await AsyncStorage.setItem('name', name)
			await AsyncStorage.setItem('logo', logo)
			await AsyncStorage.setItem('color', color)
		} catch (error) {
			console.log(error)
		}
	}
	// Get selected team data from AsyncStorage to move user directly to selected team homescreen
	getData = async () => {
		try {
			const domain = await AsyncStorage.getItem('domain')
			const name = await AsyncStorage.getItem('name')
			const logo = await AsyncStorage.getItem('logo')
			const color = await AsyncStorage.getItem('color')
			if (domain !== null) {
				this.props.navigation.navigate('Header', { domain: domain, name: name, logo: logo, color: color })
			}
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount() {
		this.getData();
		fetch('https://sportti.org')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					teams: data.teams,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	render() {
		if (this.state.isLoading) {
			return (<Loading />);
		}
		else {
			const url = this.state.image_url
			const format = this.state.image_format
			// Show only teams that does have own id
			let teams = this.state.teams.map((val, key) => {
				if (val.id != null) {
					return <View key={key}>
						<TouchableOpacity style={[styles.test, styles.mb3]} onPress={() => {
							this.saveData(val.domain, val.name, url + val.img + "." + format, val.colors[0]);
							this.props.navigation.navigate('Header', { domain: val.domain, name: val.name, logo: url + val.img + "." + format, color: val.colors[0] })
						}}>
							<Image style={styles.logo} source={{ uri: url + val.img + "." + format }} />
							<Text style={[styles.tc, styles.h4, styles.home, styles.white, styles.up, styles.mb3]}>{val.name}</Text>
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView>
						{teams}
					</ScrollView>
				</View>

			);

		}

	}

}

