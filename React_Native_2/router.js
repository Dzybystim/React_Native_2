import React from "react";
import { StyleSheet, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//icons import


import RegistrationScreen from './components/RegistrationScreen'
import LoginScreen from './components/LoginScreen'
import Home from './components/Home'
import PostsScreen from './components/PostsScreen'
import ProfileScreen from './components/ProfileScreen'
import CreatePostsScreen from './components/CreatePostsScreen'

const AuthStack = createStackNavigator()
const MainTab = createBottomTabNavigator()




export const useRoute = (auth, setAuth) => {

    const WrappedRegistration = function(props){
        return (<RegistrationScreen setAuth={setAuth} auth={auth} {...props}/>)
    }

    const WrappedLogin = function(props){
        return (<LoginScreen setAuth={setAuth} auth={auth} {...props}/>)
    }

    if(auth === false){
    return <AuthStack.Navigator initialRouteName="Registration" screenOptions={{headerShown: false}}>
     <AuthStack.Screen  name="Registration" component={WrappedRegistration}/>
     <AuthStack.Screen  name="Login" component={WrappedLogin}/>
   </AuthStack.Navigator>
    }
  
    return  <MainTab.Navigator 
    initialRouteName="Posts" 
    screenOptions={{
        tabBarShowLabel: false,
        
        tabBarActiveTintColor: '#FFFFFF',
        }} 
    backBehavior={{firstRoute: true}}
    >
    <MainTab.Screen options={{
        headerTitle: 'Публикации',
        headerTitleAlign: "center",
        headerRight: (props) => (<Feather {...props} 
            name="log-out" 
            size={24} 
            style={styles.logOutIcon} 
            onPress={() => setAuth(false)}
            />), 
        tabBarIcon: ({focused, size, color}) => (
        <View style={{...styles.iconBottomView, backgroundColor: focused ? '#FF6C00' : '#FFFFFF'}}>
          <Ionicons name="grid-outline" size={size} color={color} />
        </View>),
        
    }} name="Posts" component={PostsScreen}/>
    <MainTab.Screen options={{
        headerTitle: 'Создать публикацию',
        headerTitleAlign: "center",
        tabBarIcon: ({focused, size, color}) => (
        <View style={{...styles.iconBottomView, backgroundColor: focused ? '#FF6C00' : '#FFFFFF'}}>
        <AntDesign name="plus" size={size} color={color} />
        </View>)
    }} name="Create" component={CreatePostsScreen}/>
    <MainTab.Screen options={{
        tabBarIcon: ({focused, size, color}) => (
        <View style={{...styles.iconBottomView, backgroundColor: focused ? '#FF6C00' : '#FFFFFF'}}>
        <Feather name="user" size={size} color={color} />
        </View>)
    }} name="Profile" component={ProfileScreen}/>
  </MainTab.Navigator>
  }

  const styles = StyleSheet.create({
    logOutIcon: {
        color: "#BDBDBD",
        marginRight: 10,    
    },
    iconBottomView: {
        
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
    }
  })

