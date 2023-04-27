import React, { useState } from 'react';
import {StyleSheet, SafeAreaView, Text, ScrollView, ImageBackground, View} from "react-native";
import Game from './Game';

export default function Play() {
    const randArr = function() {
    let array = ['apple', 'pear', 'lemon', 'orange', 'kiwi', 'grape'];
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }
      array.shift();
      array.pop();
    return array;
}
const [notes, setNotes] = useState(randArr());

function showDesc() {
  setNotes(randArr().map(item => item)); 
}
const result = notes.map(item => {
  return <View style={styles.sell}><Text style={styles.text} key={item}>{item} </Text></View>;
});

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../img/textures/tekstura_text.jpg')} style={{resizeMode: "repeat", flex: 1,}}>
    <ScrollView>
      <Game array={notes} original={showDesc}/>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  //  marginTop: 4,
  },
  tabl: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    backgroundColor: '#cdf12e',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});