import React, {Component} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
//To import icons in expo
import Icon from '@expo/vector-icons/Ionicons';

import {
  createSwitchNavigator, 
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator} from 'react-navigation;'

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}

class WelcomeScreen extends Component {
  render(){
    return (
      <View style={styles.container}>
        {/* <Text>WelcomeScreen</Text> */}
        <Button title='Login' onPress={()=>this.props.navigation.navigate('Dashboard')}/>
        <Button title='Sign Up' onPress={()=>alert('button pressed')}/>
      </View>
    );
  }
}

class DashboardScreen extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

//below creating tabs 3 screens

class Feed extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

class Settings extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

// here we created tabs buts its header is not changing so for that we need 
// to keep dashboardtabnaigator inside the stack navigator

const DashboardStackNavigator = createStackNavigator({
  // passing the tabnavigator which we point to the dashboardTabNavigator

DashboardTabNavigator: DashboardTabNavigator
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:(
        <Icon name="md-menu" size={30} style={{paddingLeft: 10}}
        onPress={()=>navigation.openDrawer()}/>
      )
    }
  }
});




// To have Tabs in dashboard screen

const DashboardTabNavigator = createBottomTabNavigator({
  //createtab screens
  Feed,
  Profile, 
  Settings
},{
  //among 3 tabs header is common so we wraps tabnavigator inside stack navigator
  navigationOptions:({navigation})=>{
    //this navigation arg specifies current screen
    const {routeName} = navigation.state.routes[navigation.state.index]
    //above line will give us the index of active tab screen
    return{
      headerTitle: routeName
    }

  }
})

//To have side nav
const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    // screen:DashboardScreen

    // below instead of just passing now dashboardscreen we are passing dashboards tab scrrens combo
    // screen: DashboardTabNavigator

    // now instead of passing tab navigator here pass stack navigator

    screen: DashboardStackNavigator
  }
})

//To have screen changes shifting

const AppSwitchNavigator = createSwitchNavigator({
  welcome:{screen:WelcomeScreen},
  // Dashboard:{screen:DashboardScreen}
  Dashboard:{ screen: AppDrawerNavigator}
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
