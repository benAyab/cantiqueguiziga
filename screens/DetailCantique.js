import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View, ScrollView, Slider } from "react-native";

import cantiques from "../assets/helper";

const image =  require("../assets/ancienpapier2.jpg");
const initFontS = 17;

const DetailScreen = ({route, navigation }) => { 
  const [myFontSize, setFontSize] = useState(initFontS);

  return (
    <View style={styles.container}
  //  onScrollBeginDrag={e => touchX = e.nativeEvent.contentOffset.x}
  //  onScrollEndDrag={e => console.log(e.nativeEvent.contentOffset.x - touchX) }
  >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
           <Slider value={17} minimumValue={15} maximumValue={26} step={1} onValueChange={(val) => setFontSize(val)} ></Slider>
        </View>
        <ScrollView style={styles.scrlView}>
          <Text style={[styles.text, {fontSize: myFontSize}]}>{cantiques[route.params.number-1].content}</Text>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  },
  scrlView: {
    flex: 1, 
    height: Dimensions.get("window").height, 
    width: Dimensions.get("window").width
  },
  text: {
    fontWeight: "500",
    fontFamily: "CAMCA4",
    padding: 7,
    lineHeight: 30,
    color: "white",
    textAlign: "center"
  }
});

export default DetailScreen;