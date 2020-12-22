import React from 'react';
import Home from './views/Home';
import { Etusivu } from './views/TeamHome';
import { DrawerContent } from './views/DrawerContent';
import { Basic, Delete } from './views/Basic';
import { Pelaajat, Pelaaja_profiili } from './views/Players';
import { Partners } from './views/Partners';
import { Games } from './views/Games';
import { News } from './views/News';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

[global.team_img = 'https://kiekko-vantaa.fi/site/assets/files/2398/untitled1-edit-edit.jpg']
[global.default_img = 'https://kiekko-vantaa.fi/site/assets/files/2398/lohi.png']

export default class App extends React.Component {

	createHomeStack = () => {
		return <Stack.Navigator>
			<Stack.Screen name="Valitse joukkue:" component={Home} options={{ headerTitleAlign: 'center', }} />
			<Stack.Screen name='Header' children={this.createDrawer} options={({ navigation }) => ({
				headerRight: () => (<TouchableOpacity style={{ paddingRight: 10 }}>
					<Feather name='menu' size={30} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} /></TouchableOpacity>)
			})} />
		</Stack.Navigator>
	}

	createDrawer = (props) => {
		return <Drawer.Navigator drawerStyle={{ backgroundColor: null, width: '100%' }} drawerPosition="right" drawerContent={props => <DrawerContent{...props} />}>
			<Drawer.Screen name='Etusivu' component={Etusivu} initialParams={{ id: props.route.params.id, name: props.route.params.name, logo: props.route.params.logo, color: props.route.params.color }} />
			<Drawer.Screen name='Pelaajat' component={Pelaajat} />
			<Drawer.Screen name='Pelaaja_Profiili' component={Pelaaja_profiili} initialParams={{ profile_img: props.route.params.profile_img }} />
			<Drawer.Screen name='Ottelut' component={Games} />
			<Drawer.Screen name='Kumppanit' component={Partners} />
			<Drawer.Screen name='Sivu' component={Basic} />
			<Drawer.Screen name='Uutiset' component={News} />
			<Drawer.Screen name='Poista tallennettu joukkue' component={Delete} />
		</Drawer.Navigator>
	}

	render() {
		return (
			<NavigationContainer>
				{ this.createHomeStack()}
			</NavigationContainer>
		);
	}
}












