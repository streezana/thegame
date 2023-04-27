import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from "react-native";
import { Audio } from 'expo-av';

export default function Home({navigation}) {
  const [sound, setSound] = React.useState();
  async function playSound1() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/cowav.mp3')
    );
    setSound(sound);
    await sound.playAsync();}
  
    React.useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync();}
        : undefined;
    }, [sound]);

  return (
    <View style={[styles.container, { flexDirection: "column" }]}>
 <ImageBackground source={require('../img/textures/tekstura_text.jpg')} style={{resizeMode: "repeat", flex: 1,}}>

        <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button2} onPress={() => {playSound1(), navigation.navigate('Play')}}>
        <Image source={require('../img/buttons/Button_orange_Play.png')} style={styles.img} />
          </TouchableOpacity>
        </View> 

      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button2} onPress={playSound1}>
        <Image source={require('../img/buttons/Button_blue_Video.png')} style={styles.img} />
          </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#556B2F', 
    flex: 1,
    justifyContent: 'center',
    //marginTop: 4,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    margin:40,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#eaf123",
    padding: 30
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  button2: {
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 3,
    width: '50%',
    height:'24%',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 5,
    borderColor: 'green',
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  img: {
    flex: 1,
    width: "100%",
    height: 150,
    resizeMode: 'contain',
},
imgBack: {
  flex: 1,
  resizeMode: "repeat",
  height: 100,
  width: 100
},
sell222: {
  width: '24%',
  margin: 1,
  paddingLeft:8,
  paddingRight:8,
  textAlign: 'center'
},
img2222: {
  flex: 1,
  width: "100%",
  height: Dimensions.get('window').height*0.12,
  resizeMode: 'contain',
}
});
