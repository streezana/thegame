import React from "react";
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Play from "./Play";
import HomeScreen from "./Home";

const Tab = createBottomTabNavigator();

const TabScreen = () => {
    return (
        <Tab.Navigator screenOptions={
            {
              "tabBarShowLabel": false,
              headerShown: false,
              "tabBarStyle": [
                {
                  "display": "flex",
                  elevation: 0,
                  backgroundColor: '#2D3200',
                  height:50
                },
                null
              ]
            }}
            >
              <Tab.Screen name='HomeScreen' component={HomeScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <View style={{alignItems: 'center', justifyContent: 'center', top:2}}>
                    <Image source={require('../img/home.png')} resizeMode='contain' style={{width: 20, height: 20, tintColor: focused ? '#fff' : '#ACACAC'}} />
      
                    <Text style={{color: focused ? '#fff' : '#ACACAC', fontSize:14}}>
                      Home
                    </Text>
                  </View>
                ),
                }}
              />

              <Tab.Screen name='Play' component={Play}
                              options={{
                                tabBarIcon: ({focused}) => (
                                  <View style={{alignItems: 'center', justifyContent: 'center', top:2}}>
                                    <Image source={require('../img/harvest.png')} resizeMode='contain' style={{width: 20, height: 20, tintColor: focused ? '#fff' : '#ACACAC'}} />
                      
                                    <Text style={{color: focused ? '#fff' : '#ACACAC', fontSize:14}}>
                                    Play
                                    </Text>
                                  </View>
                                ),
                                }}
              />
            </Tab.Navigator>
      );
    }
export {TabScreen};