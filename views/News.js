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
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/news')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					news: data,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	renderNewsItem = (itemData) =>
		<View style={styles.mb3, styles.main}>
			<TouchableOpacity style={styles.mb3} onPress={() => this.props.navigation.navigate('Sivu', { team_id: this.props.route.params.team_id, page_id: itemData.item.id })}>
				<Image style={styles.news_img} source={{ uri: itemData.item.img }} />
				<Text style={[styles.h4, styles.up]}>{itemData.item.title}</Text>
				<Text>{moment(itemData.item.date * 1000).format('DD.MM.YYYY')} | Uutiset</Text>
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