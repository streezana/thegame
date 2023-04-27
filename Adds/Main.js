import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Play from "./Play";
import { TabScreen } from "./Tab";
import Home from "./Home";
const Stack = createNativeStackNavigator();

export default function MainPage() {
  return (
<NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="TabNav" component={TabScreen} options={{headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Play" component={Play} />
    </Stack.Navigator>
 </NavigationContainer>
  );
}