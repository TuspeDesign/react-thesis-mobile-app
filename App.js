import React from 'react';
import Home from './views/Home';
import { Etusivu } from './views/TeamHome'
import { Basic } from './views/Basic'
import { Pelaajat } from './views/Players'
import { Pelaaja_profiili } from './views/Players'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles/Styles'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const kiekkovantaa = 'https://kiekko-vantaa.fi/site/assets/files/1/kiekko-vantaa.png';
const roki = 'https://www.rokihockey.fi/files/logos/roki.png';
const joensuunkiekkopojat = 'https://joensuunkiekkopojat.fi/site/assets/files/1/jokipojat.png';

export default class App extends React.Component {

	createHomeStack = () => {
		return <Stack.Navigator>
			<Stack.Screen name="Valitse joukkue:" component={Home} options={{ headerTitleAlign: 'center', }} />
			<Stack.Screen name='Joensuun Kiekko-Pojat' children={this.createDrawer} options={({ navigation }) => ({
				headerRight: () => (
					<TouchableOpacity style={{ paddingRight: 10 }}>
						<Feather name='menu' size={30} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
					</TouchableOpacity>
				), headerLeft: () => (
					<Image style={styles.logo_top} source={{ uri: joensuunkiekkopojat }} />
				), headerTitleAlign: 'center', headerStyle: { backgroundColor: '#c90123' }, headerTitleStyle: { color: 'white' },
			})} />
			<Stack.Screen name='Kiekko-Vantaa' children={this.createDrawer} options={({ navigation }) => ({
				headerRight: () => (
					<TouchableOpacity style={{ paddingRight: 10 }}>
						<Feather name='menu' size={30} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
					</TouchableOpacity>
				), headerLeft: () => (
					<Image style={styles.logo_top} source={{ uri: kiekkovantaa }} />
				), headerTitleAlign: 'center', headerStyle: { backgroundColor: '#035e96' }, headerTitleStyle: { color: 'white' },
			})} />
			<Stack.Screen name='RoKi Hockey' children={this.createDrawer} options={({ navigation }) => ({
				headerRight: () => (
					<TouchableOpacity style={{ paddingRight: 10 }}>
						<Feather name='menu' size={30} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
					</TouchableOpacity>
				), headerLeft: () => (

					<Image style={styles.logo_top} source={{ uri: roki }} />

				), headerTitleAlign: 'center', headerStyle: { backgroundColor: '#000d37' }, headerTitleStyle: { color: 'white' },
			})} />
			<Stack.Screen name='Kurra' children={this.createDrawer} />
			<Stack.Screen name='Käpylän Pallo' children={this.createDrawer} />
			<Stack.Screen name='Pallokerho Keski-Uusimaa' children={this.createDrawer} />
		</Stack.Navigator>
	}

	createDrawer = (props) => {
		return <Drawer.Navigator drawerPosition="right">
			<Drawer.Screen name='Etusivu' component={Etusivu} initialParams={{ id: props.route.params.id, page_id: '1' }} />
			<Drawer.Screen name='Joukkue' component={Pelaajat} initialParams={{ id: props.route.params.id, page_id: '2398', logo: kiekkovantaa }} />
			<Drawer.Screen name='Pelaaja_Profiili' component={Pelaaja_profiili} initialParams={{ id: props.route.params.id, profile_img: props.route.params.profile_img, logo: kiekkovantaa }} />
			<Drawer.Screen name='Ottelut' component={Basic} initialParams={{ id: props.route.params.id }} />
			<Drawer.Screen name='Liput' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2400' }} />
			<Drawer.Screen name='Fanit' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2408' }} />
			<Drawer.Screen name='Seura' component={Basic} initialParams={{ id: props.route.params.id }} />
			<Drawer.Screen name='Jäädytetyt pelinumerot ja ennätykset' component={Basic} initialParams={{ id: props.route.params.id, page_id: '11385' }} />
			<Drawer.Screen name='Media' component={Basic} initialParams={{ id: props.route.params.id, page_id: '11386' }} />
			<Drawer.Screen name='Historia' component={Basic} initialParams={{ id: props.route.params.id, page_id: '11390' }} />
			<Drawer.Screen name='Trio-Areena' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2410' }} />
			<Drawer.Screen name='Yhteistyössä' component={Basic} initialParams={{ id: props.route.params.id }} />
			<Drawer.Screen name='Yhteystiedot' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2406' }} />
			<Drawer.Screen name='Aitio' component={Basic} initialParams={{ id: props.route.params.id, page_id: '10178' }} />
			<Drawer.Screen name='A-nuoret' component={Basic} initialParams={{ id: props.route.params.id }} />
		</Drawer.Navigator>
	}




	render() {
		return (
			<NavigationContainer >
				{this.createHomeStack()}
			</NavigationContainer>
		);
	}
}










