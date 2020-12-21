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
	saveID = async (id, name, logo, color) => {
		try {
			const teamid = JSON.stringify(id)
			await AsyncStorage.setItem('id', teamid)
			await AsyncStorage.setItem('name', name)
			await AsyncStorage.setItem('logo', logo)
			await AsyncStorage.setItem('color', color)
		} catch (error) {
			console.log(error)
		}
	}

	getID = async () => {
		try {
			const teamid = await AsyncStorage.getItem('id')
			const name = await AsyncStorage.getItem('name')
			const logo = await AsyncStorage.getItem('logo')
			const color = await AsyncStorage.getItem('color')
			if (teamid !== null) {
				this.props.navigation.navigate('Header', { id: teamid, name: name, logo: logo, color: color })
			}
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount() {
		this.getID();
		fetch('https://api.sportti.org/sites')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					teams: data.teams,
					image_url: data.logo.url,
					image_format: data.logo.ext,

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

			let teams = this.state.teams.map((val, key) => {
				if (val.id != null) {
					return <View key={key}>
						<TouchableOpacity style={[styles.test, styles.mb3]} onPress={() => {
							this.saveID(val.id, val.name, url + val.img + "." + format, val.colors[0]);
							this.props.navigation.navigate('Header', { id: val.id, name: val.name, logo: url + val.img + "." + format, color: val.colors[0] })
						}}>
							<Image style={styles.logo} source={{ uri: url + val.img + "." + format }} />
							<Text style={[styles.tc, styles.h4, styles.home, styles.white, styles.up, styles.mb3]}>{val.name}</Text>
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						{teams}
					</ScrollView>
				</View>

			);

		}

	}

}

