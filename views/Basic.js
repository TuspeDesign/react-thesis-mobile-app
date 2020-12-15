import React from "react";
import { Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
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
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="blue" />
					<Text style={[styles.tc, styles.h4]}>Ladataan...</Text>
				</View>
			)
		} else {
			let content = this.state.body;
			let title = this.state.title;
			if (this.state.img != null) {
				let images = this.state.img.map((val, key) => {
					return <View key={key}>
						<Image style={styles.news_img} source={{ uri: val[0][0] }} />
					</View>
				});

				return (
					<ScrollView style={[styles.container_news]}>
						<Text style={[styles.tc, styles.h4, styles.mb3]}>{title}</Text>
						{images}
						<HTML source={{ html: content }} />
					</ScrollView>

				);
			} else if (this.state.body != null) {
				return (
					<ScrollView style={[styles.container_news]}>
						<Text style={[styles.tc, styles.h4, styles.mb3]}>{title}</Text>
						<HTML source={{ html: content }} />
					</ScrollView>
				);
			} else {
				let body = 'Kaikkea tietoa ei löydy kyseiselle sivulle.'
				return (
					<View style={styles.container}>
						<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
							<Text style={[styles.mt3]}>{body}</Text>
						</ScrollView>
					</View>
				);
			}


		}
	}
}

class Delete extends React.Component {

	removeValue = async () => {
		try {
			await AsyncStorage.removeItem('id')
			alert('Valittu joukkue poistettu onnistuneesti. Ohjelma käynnistyy seuraavan kerran valitse joukkue -sivulta')
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={[styles.delete]} onPress={() => this.removeValue()}><Text style={[styles.delete_h4, styles.up, styles.white]}>Poista joukkue</Text></TouchableOpacity>
			</View >
		);
	}
}

export { Basic, Delete };
