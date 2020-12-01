import React, { Component } from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';



class Basic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			title: null,
			body: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.id + '/' + this.props.route.params.page_id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					title: data.title,
					body: data.body,
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
			console.log(this.props.route.params.page_id)
			const regex = /(<([^>]+)>)/ig;
			let title = this.state.title
			if (this.state.body != null) {
				let body1 = this.state.body.replace(regex, '');
				let body = body1.replace(/&nbsp;/g, '');
				return (
					<View style={styles.container}>
						<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
							<Text style={[styles.h4, styles.mb3]}>{title}</Text>
							<Text style={[styles.mb3]}>{body}</Text>
						</ScrollView>
					</View>
				);
			} else {
				let body = 'Kaikkea tietoa ei löydy kyseiselle sivulle.'
				return (
					<View style={styles.container}>
						<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
							<Text style={[styles.h4, styles.mb3]}>{title}</Text>
							<Text style={[styles.mb3]}>{body}</Text>
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
				<TouchableOpacity style={[styles.delete]} onPress={() => this.removeValue()}><Text style={[styles.h4, styles.up, styles.white]}>Poista joukkue</Text></TouchableOpacity>
			</View >
		);
	}
}




export { Basic, Delete };
