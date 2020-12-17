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
					return <View key={key} style={styles.mb3}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			let mainPartners = this.state.logos.map((val, key) => {
				if (val.type == 'Pääyhteistyökumppanit') {
					return <View key={key} style={styles.mb3, styles.parent}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			let partners = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyökumppanit') {
					return <View key={key} style={styles.mb3}>
						<TouchableOpacity onPress={() => { Linking.openURL(val.link) }} >
							<Image style={styles.logo} source={{ uri: val.img }} />
						</TouchableOpacity>
					</View>
				}
			});

			return (
				<View style={styles.content}>
					<View style={styles.container}>
						<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
							<Text style={[styles.toptitle]}>Yhteistyössä</Text>
							<Text style={[styles.tc, styles.h4, styles.mb3, styles.up, styles.mt3]}>Yhteistyöseura</Text>
							{mainTeam}
							<Text style={[styles.tc, styles.h4, styles.mb3, styles.up, styles.mt3]}>Pääyhteistyökumppanit</Text>
							{mainPartners}
							<Text style={[styles.tc, styles.h4, styles.mb3, styles.up, styles.mt3]}>Yhteistyökumppanit</Text>
							{partners}
						</ScrollView>
					</View>
				</View>

			);

		}
	}
}

export { Partners };


