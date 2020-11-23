import React, { Component } from "react";
import { Text, View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { styles } from '../styles/Styles'

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
		}
	}
}

export { Basic };
