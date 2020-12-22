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
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/partners')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					logos: data,
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
			let mainTeam = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyöseura') {
					return <View key={key} style={{ flexBasis: '50%' }}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			let mainPartners = this.state.logos.map((val, key) => {
				if (val.type == 'Pääyhteistyökumppanit') {
					return <View key={key} style={{ flexBasis: '50%' }}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			let partners = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyökumppanit') {
					return <View key={key} style={{ flexBasis: '50%' }}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.partner_logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }}>
						<Text style={[styles.toptitle, { backgroundColor: color }]}>Yhteistyössä</Text>
						<View style={[styles.main]}>
							<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
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


