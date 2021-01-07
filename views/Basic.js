import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Loading } from './Loading';
import { styles } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTML from "react-native-render-html";

class Basic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			title: null,
			body: null,
			img: null,
		};
	}

	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/' + this.props.route.params.page_id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					title: data.title,
					body: data.body,
					img: data.img,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.route.params.page_id !== prevProps.route.params.page_id) {
			fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/' + this.props.route.params.page_id)
				.then((response) => response.json())
				.then((data) => {
					this.setState({
						isLoading: false,
						title: data.title,
						body: data.body,
						img: data.img,
					})
				})
				.catch((error) => {
					console.log(error)
				});
		}
	}

	render() {
		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			let title = this.state.title;
			let images = this.state.img != null ? this.state.img.map((val, key) => {
				return <View key={key}>
					<Image style={styles.news_img} source={{ uri: val[0][0] }} />
				</View>
			}) : null;
			let content = this.state.body != null ? this.state.body : "Tietoja ei ole saatavilla.";

			return (
				<View style={styles.container}>
					<ScrollView>
						<Text style={[styles.toptitle]}>{title}</Text>
						<View style={[styles.main]}>
							{images}
							<HTML source={{ html: content }} />
						</View>
					</ScrollView>
				</View>
			);
		}
	}
}

class Delete extends React.Component {

	removeValue = async () => {
		try {
			await AsyncStorage.removeItem('id')
			Alert.alert('Ilmoitus', 'Valittu joukkue poistettu onnistuneesti. Ohjelma käynnistyy seuraavan kerran valitse joukkue -sivulta', [{ text: 'OK' }]);
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={[styles.h4, styles.tc, styles.mt3, styles.mb3]}>Poista valittu joukkue laitteen muistista. Poiston jälkeen ohjelma käynnistyy valitse joukkue -sivulta.</Text>
				<TouchableOpacity style={[styles.delete, styles.mt3]} onPress={() => this.removeValue()}><Text style={[styles.delete_h4, styles.up, styles.white]}>Poista valittu joukkue</Text></TouchableOpacity>
			</View>
		);
	}
}

export { Basic, Delete };
