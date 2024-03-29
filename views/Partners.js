import React from "react";
import { Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class Partners extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			logos: null,
		};
	}

	componentDidMount() {
		fetch('https://sportti.org/sites/' + this.props.route.params.domain +'/page?id='+ this.props.route.params.page_id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					logos: data.items,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	render() {
		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			//Categorize each partners logo into variable based on partner type
			let mainTeam = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyöseura') {
					return <View key={key} style={styles.col6}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.url) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img[0] }} />
						</TouchableOpacity>
					</View>
				}
			});

			let mainPartners = this.state.logos.map((val, key) => {
				if (val.type == 'Pääyhteistyökumppanit') {
					return <View key={key} style={styles.col6}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.url) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img[0] }} />
						</TouchableOpacity>
					</View>
				}
			});

			let partners = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyökumppanit') {
					return <View key={key} style={styles.col6}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.url) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img[0] }} />
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView>
						<Text style={[styles.toptitle]}>Yhteistyössä</Text>
						<View style={[styles.main]}>
							<View style={styles.row}>
								<Text style={[styles.h4, styles.mb3, styles.up, styles.mt3, styles.border_bottom]}>Yhteistyöseura</Text>
								{mainTeam}
								<Text style={[styles.h4, styles.mb3, styles.up, styles.mt3, styles.border_bottom]}>Pääyhteistyökumppanit</Text>
								{mainPartners}
								<Text style={[styles.h4, styles.mb3, styles.up, styles.mt3, styles.border_bottom]}>Yhteistyökumppanit</Text>
								{partners}
							</View>
						</View>
					</ScrollView>
				</View>
			);

		}
	}
}

export { Partners };


