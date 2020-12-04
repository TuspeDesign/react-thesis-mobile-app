import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
			.catch((error) => console.error(error))
	}

	render() {
		let data1 = this.state.data;
		let data2 = this.state.items;
		let data3 = [{ title: 'Poista tallennettu joukkue' }];
		let newArray = [];

		newArray.push(...data1)
		if (data2 != null) {
			newArray.push(...data2)
		}
		newArray.push(...data3)
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={newArray}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => this.props.navigation.navigate(item.title, { team_id: this.props.state.routes[0].params.id, page_id: item.id })} >
							<Text style={[styles.up, styles.mt3, styles.pl3, styles.mb3]}>{item.title}</Text>
						</TouchableOpacity>
					)}
				/>

			</View >
		);
	}
};

export { DrawerContent }