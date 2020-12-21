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
			let content = this.state.body;
			let title = this.state.title;
			if (this.state.img != null) {
				let images = this.state.img.map((val, key) => {
					return <View key={key}>
						<Image style={styles.news_img} source={{ uri: val[0][0] }} />
					</View>
				});

				return (
					<View style={styles.content}>
						<View style={styles.container}>
							<ScrollView showsVerticalScrollIndicator={false} >
								<Text style={[styles.toptitle]}>{title}</Text>
								<View style={[styles.main]}>
									{images}
									<HTML source={{ html: content }} />
								</View>
							</ScrollView>
						</View>
					</View>
				);
			} else if (this.state.body != null) {
				return (
					<View style={styles.content}>
						<View style={styles.container}>
							<ScrollView showsVerticalScrollIndicator={false}>
								<Text style={[styles.toptitle]}>{title}</Text>
								<View style={[styles.main]}>
									<HTML source={{ html: content }} />
								</View>
							</ScrollView>
						</View>
					</View>
				);
			} else {
				let body = ''
				return (
					<View style={styles.content}>
						<View style={styles.container}>
							<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
								<Text style={[styles.toptitle]}>{title}</Text>
								<View style={styles.main}>
									<Text style={[styles.mt3], [styles.font]}>{body}</Text>
								</View>
							</ScrollView>
						</View>
					</View >
				);
			}


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
			<View style={styles.content}>
				<View style={styles.container}>
					<Text style={[styles.toptitle]}>Poista valittu joukkue laitteen muistista. Poiston jälkeen ohjelma käynnistyy valitse joukkue -sivulta.</Text>
					<TouchableOpacity style={[styles.delete, styles.mt3]} onPress={() => this.removeValue()}><Text style={[styles.delete_h4, styles.up, styles.white]}>Poista valittu joukkue</Text></TouchableOpacity>
				</View >
			</View>

		);
	}
}

export { Basic, Delete };
