import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, Image, TouchableHighlight, TouchableOpacity, Dimensions } from "react-native";
import { Audio } from 'expo-av';

function Game(props) {
  const [lines, setLines] = useState([]); 
  const [signs, setSigns] = useState([]); 
  const [fruits, setFruit] = useState([require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png')]);
  const [idxs, setIndex] = useState(['','','','']);
  const [modalVisible, setModalVisible] = useState(false);
  let [count, setCount] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  let refCopy = React.createRef();
  
  const products = [
    {index:0, apple: require('../img/fruits/apple_frame.png'), pear: require('../img/fruits/pear_frame.png'), lemon: require('../img/fruits/lemon_frame.png'), orange:require('../img/fruits/orange_frame.png'), kiwi: require('../img/fruits/pinapple_frame.png'), grape: require('../img/fruits/grape_frame.png')},
    {index:1, apple: require('../img/fruits/apple_frame.png'), pear: require('../img/fruits/pear_frame.png'), lemon: require('../img/fruits/lemon_frame.png'), orange:require('../img/fruits/orange_frame.png'), kiwi: require('../img/fruits/pinapple_frame.png'), grape: require('../img/fruits/grape_frame.png')},
    {index:2, apple: require('../img/fruits/apple_frame.png'), pear: require('../img/fruits/pear_frame.png'), lemon: require('../img/fruits/lemon_frame.png'), orange:require('../img/fruits/orange_frame.png'), kiwi: require('../img/fruits/pinapple_frame.png'), grape: require('../img/fruits/grape_frame.png')},
    {index:3, apple: require('../img/fruits/apple_frame.png'), pear: require('../img/fruits/pear_frame.png'), lemon: require('../img/fruits/lemon_frame.png'), orange:require('../img/fruits/orange_frame.png'), kiwi: require('../img/fruits/pinapple_frame.png'), grape: require('../img/fruits/grape_frame.png')}
  ];

  const res = products.map(function(item, index) {
    return (
      <View style={styles.sell} key={index}>
      <TouchableHighlight onPress={()=>{show(index, item.apple, 'apple')}}>
        <Image source={item.apple} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{show(index, item.pear, 'pear')}}>
        <Image source={item.pear} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{show(index, item.lemon, 'lemon')}}>
        <Image source={item.lemon} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{show(index, item.orange, 'orange')}}>
        <Image source={item.orange} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{show(index, item.kiwi, 'kiwi')}}>
        <Image source={item.kiwi} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      <TouchableHighlight onPress={()=>{show(index, item.grape, 'grape')}}>
        <Image source={item.grape} style={styles.img} key={item.index}/>
      </TouchableHighlight>
      </View>
    )
  });
  function show(index, item, word) {
    playSound1();
    let copy = Object.assign([], fruits);
    let copyIdxs = Object.assign([], idxs);
    copy[index] = item;
    copyIdxs[index] = word;
    setFruit(copy);
    setIndex(copyIdxs);
  }

  const result = fruits.map((element,index) => {
    return <View style={styles.sell} key={index}>
      <Image source={element} style={styles.img}/>
      </View>;
  });

  const randomArr = props.array;
  function score() {
    playSound1();
    console.log(randomArr);
    setCount(count + 1);
    let num1 = '0';
    let num2 = '0';
    const transformed = [];
    for (let i = 0; i<idxs.length; i++) {
      transformed.push(idxs[i]);
    }
    for (var i = 0; i < transformed.length; i++) {
      transformed.indexOf(randomArr[i]) !== -1 ? num2++ : null;
      transformed[i] === randomArr[i] ? num1++ : null;
    }
    const sum = num1+' / '+num2;
    setSigns([...signs, '', 'SCORE: ', sum, '']);
    setLines([...lines, fruits[0], fruits[1], fruits[2], fruits[3]]);
    setFruit([require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png')]);
    setIndex(['','','','']);  
    if (num1===4 && num2===4) {
      setTimeout(
        () => { setModalVisible(true), playSound2() }, 1000,
      );
    }
  }   
  const plusfruits = lines.map((element, index) => {
    return <View style={styles.sellPlusfruits} key={index}>
    <Image source={element} style={styles.img}/>
    <Text style={styles.text2}>{signs[index]}</Text>
    </View>;
	});

  function updateArr()  { 
    playSound1();
    props.original();
    setLines([]);
    setCount(0);
    setFruit([require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png')]);
    (shouldShow == false) ? setShouldShow(!shouldShow) : setShouldShow(true);
    setSigns([]);
  }
  function comeBack()  { 
    playSound1();
    setModalVisible(false);
    setShouldShow(!shouldShow);
  }
  function setModalUpdate()  { 
    playSound1();
    setModalVisible(false);
    props.original();
    setLines([]); 
    setCount(0);
    setFruit([require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png'),require('../img/fruits/frame.png')]);
    setSigns([]);
  }

  const [sound, setSound] = React.useState();  
  async function playSound1() {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/cowav.mp3')
    );
    setSound(sound);
    // console.log('Playing Sound');
    await sound.playAsync();}

  async function playSound2() {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/might.mp3')
    );
    setSound(sound);
    // console.log('Playing Sound');
    await sound.playAsync();}
  
    React.useEffect(() => {
      return sound
        ? () => {
            // console.log('Unloading Sound');
            sound.unloadAsync();}
        : undefined;
    }, [sound]);

  return (
    <>
   
      <Button title='Reset the game!' color="#999900" fontSize='33' onPress={updateArr}/>
      <View style={styles.tabl}>{plusfruits}</View>
      {shouldShow ? <View style={styles.tabl} ref={refCopy}>{result}</View> : null}
      {shouldShow ? <Button title="Try it!" color="#cc0000" onPress={score}/> : null}
      {shouldShow ? <View style={styles.tabl}>{res}</View> : null}

      {/* <View style={styles.container}> */}
      <Modal visible={modalVisible}>
      <View style={styles.mod}>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={comeBack}>
      <Image source={require('../img/buttons/Button_Return_to_Results.png')} style={styles.imgModalButton} />
      </TouchableOpacity>
      </View>
      <View style={styles.mod}><Image source={require('../img/icons8-kub.png')} style={{ width: 180, height: 180 }} /></View>
      <View style={styles.mod}>
      <Text style={styles.textMod}>{count<5 ? '1 PLACE!' :  count-4 +' PLACE!'}</Text>
      </View>
      <View style={styles.mod}>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={setModalUpdate}>
      <Image source={require('../img/buttons/Button_Start_Again.png')} style={styles.imgModalButton} />
      </TouchableOpacity>
      </View>
      </Modal>
      {/* </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   marginTop: -4,
  // },
  tabl: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: "wrap",
    marginLeft: 1,
    marginRight: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sell: {
    width: '24%',
    margin: 1,
    paddingLeft:8,
    paddingRight:8,
    textAlign: 'center'
  },
  sellPlusfruits: {
    width: '24%',
    height: Dimensions.get('window').height*0.15,
    paddingLeft:5,
    paddingRight:5,
    marginBottom:5,
    textAlign: 'center'
  },
  text: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold',
  },
  text2: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  mod: {
    flex: 1,
    backgroundColor: '#556B2F', 
    //#cdf12e - зеленый/темно-зеленый
  //  marginTop: 22,
    //padding: 15,
    fontSize: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMod: {
    fontSize: 30,
  },
  img: {
    flex: 1,
    width: "100%",
    height: Dimensions.get('window').height*0.12,
    resizeMode: 'contain',
},
button: {
  justifyContent: 'center',
  alignItems: "center",
  borderRadius: 2,
  width: '60%',
  height:'30%',
},
imgModalButton: {
    flex: 1,
    width: "100%",
    height: 150,
    resizeMode: 'contain',
}
});
export default Game;