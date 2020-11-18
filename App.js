import React from 'react';
import Home from './views/Home';
import { Etusivu } from './views/TeamHome'
import { Basic } from './views/Basic'
import { Pelaajat } from './views/Players'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { View, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default class App extends React.Component {

	createHomeStack = () => {

		return <Stack.Navigator>
			<Stack.Screen name="Valitse joukkue:" component={Home} options={{ headerTitleAlign: 'center', }} />
			<Stack.Screen name='Joensuun Kiekko-Pojat' children={this.createDrawer} />
			<Stack.Screen name='Kiekko-Vantaa' children={this.createDrawer} options={({ navigation }) => ({
				headerLeft: () => (
					<TouchableOpacity style={{ paddingLeft: 10 }}>
						<Button title='menu' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
					</TouchableOpacity>
				), headerTitleAlign: 'center', headerStyle: { backgroundColor: '#035e96' }, headerTitleStyle: { color: 'white' },
			})} />
			<Stack.Screen name='RoKi Hockey' children={this.createDrawer} />
			<Stack.Screen name='Kurra' children={this.createDrawer} />
			<Stack.Screen name='Käpylän Pallo' children={this.createDrawer} />
			<Stack.Screen name='Pallokerho Keski-Uusimaa' children={this.createDrawer} />
		</Stack.Navigator>


	}



	createDrawer = (props) => {
		return <Drawer.Navigator>
			<Drawer.Screen name='Etusivu' component={Etusivu} initialParams={{ id: props.route.params.id, page_id: '1' }} />
			<Drawer.Screen name='Joukkue' component={Pelaajat} initialParams={{ id: props.route.params.id, page_id: '2398' }} />
			<Drawer.Screen name='Liput' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2400' }} />
			<Drawer.Screen name='Fanit' component={Basic} initialParams={{ id: props.route.params.id, page_id: '2408' }} />
		</Drawer.Navigator>
	}



	render() {
		return (
			<NavigationContainer>
				{this.createHomeStack()}
			</NavigationContainer>

		);
	}
}










