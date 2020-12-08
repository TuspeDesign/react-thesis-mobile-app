import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { styles } from '../styles/Styles'


class DrawerContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			items: [],

		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.state.routes[0].params.id + '/menu')
			.then((response) => response.json())
			.then((data) => {
				this.setState({ data: data });
				this.setState({ items: data[6].items });
			})
			.catch((error) => console.log(error))
	}

	async checkTemplate(id) {
		await fetch('https://api.sportti.org/sites/' + this.props.state.routes[0].params.id + '/' + id)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ temp: data.template });
			})
			.catch((error) => console.log(error))

		let temp = this.state.temp

		if (temp == 'sivu' || temp == 'page' || temp == 'yhteys' || temp == 'tuote_aitio') {
			this.props.navigation.navigate('Sivu', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'ottelut') {
			this.props.navigation.navigate('Ottelut', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'pelaajat') {
			this.props.navigation.navigate('Joukkue', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'kumppanit') {
			this.props.navigation.navigate('Yhteistyössä', { page_id: id, team_id: this.props.state.routes[0].params.id })
		} else if (temp == 'uutiset') {
			this.props.navigation.navigate('Uutiset', { page_id: id, team_id: this.props.state.routes[0].params.id })
		}
		else {
			this.props.navigation.navigate('Etusivu', { page_id: id, team_id: this.props.state.routes[0].params.id })
		}
	}



	render() {
		let data1 = this.state.data;
		let data2 = this.state.items;
		let newArray = [];

		newArray.push(...data1)
		if (data2 != null) {
			newArray.push(...data2)
		}

		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={newArray}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => { this.checkTemplate(item.id); }}>
							<Text style={[styles.up, styles.mt3, styles.pl3, styles.mb3]}>{item.title}</Text>
						</TouchableOpacity>
					)}
				/>
				<Button title='Poista tallennettu joukkue' onPress={() => this.props.navigation.navigate('Poista tallennettu joukkue')}></Button>
			</View >
		);
	}
};

export { DrawerContent }