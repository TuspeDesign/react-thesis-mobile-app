import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Image, Button } from 'react-native';
import Home from './views/Home';
import { Kiekkopojat, Kiekkovantaa, Roki, Kurra, Kapulanpallo, Pallokerhokeskiuusimaa } from './views/TeamHome'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default class App extends React.Component {

	createHomeStack = () =>
		<Stack.Navigator>
			<Stack.Screen name="Valitse joukkue:" component={Home} />
			<Stack.Screen name='Joensuun Kiekko-Pojat' component={Kiekkopojat} />
			<Stack.Screen name='Kiekko-Vantaa' component={Kiekkovantaa} />
			<Stack.Screen name='RoKi Hockey' component={Roki} />
			<Stack.Screen name='Kurra' component={Kurra} />
			<Stack.Screen name='Käpylän Pallo' component={Kapulanpallo} />
			<Stack.Screen name='Pallokerho Keski-Uusimaa' component={Pallokerhokeskiuusimaa} />
		</Stack.Navigator>

	createDrawer = () =>
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={Home} />
		</Drawer.Navigator>



	render() {
		return (
			<NavigationContainer>
				{this.createHomeStack()}
			</NavigationContainer>

		);
	}
}









