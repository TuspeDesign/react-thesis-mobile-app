import React from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import moment from "moment";
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			news: null,
		};
	}

	componentDidMount() {
		fetch('https://sportti.org/sites/' + this.props.route.params.domain + '/news?year=2021')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					news: data.items[0].items,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	renderNewsItem = (itemData) =>
		<View style={styles.mb3, styles.main}>
			<TouchableOpacity style={styles.mb3} onPress={() => this.props.navigation.navigate('Sivu', { domain: this.props.route.params.domain, page_id: itemData.item.id })}>
				<Image style={styles.news_img} source={{ uri: itemData.item.img[0] }} />
				<Text style={[styles.h4, styles.up]}>{itemData.item.title}</Text>
				<Text>{itemData.item.created.display} | Uutiset</Text>
			</TouchableOpacity>
		</View>

	render() {
		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			return (
				<View style={styles.container}>
					<FlatList
						data={this.state.news}
						renderItem={item => this.renderNewsItem(item)}
						keyExtractor={item => item.id.toString()}
						ListHeaderComponent={<Text style={[styles.toptitle]}>Uutiset</Text>}
					/>
				</View>
			);
		}
	}
}

export { News }