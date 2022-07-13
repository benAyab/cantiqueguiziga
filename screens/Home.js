import React from "react";
import {Button, Image, ImageBackground, StyleSheet, Pressable, Text, View } from "react-native";

const image =  require("../assets/ancienpapier1.jpg" );

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={{alignItems: "center", marginBottom: 40, marginTop: 10}}>
        <Image
          source={require("../assets/bible1.jpg")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>
        RECUEIL DE CANTIQUES EN LANGUE GUIZIGA
      </Text>
      <View style={{ borderBottomColor: "white", borderBottomWidth: 1, margin: 10}}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center", fontFamily: "CAMCA4"}}> 
            DIMIS NGI HUNUMA BUMBULVUÑ 
        </Text>
      </View>
      <Button
        title="Entrer"
        color="#31bd56"
        onPress={() => navigation.navigate('List')}
      />

      <View style={{position: "absolute", left: 2, bottom: 2}}>
        <Text style={{color: "white", fontFamily: "Baloo2-Regular"}} >cantiques_guiziga v1.0</Text>
      </View>

      <View style={{position: "absolute", right: 2, bottom: 2, backgroundColor: "#31bd56", borderWidth: 0, borderRadius: 5}}>
        <Pressable onPress={() => navigation.navigate('About')}>
          <Text style={{color: "white", fontFamily: "Baloo2-Regular", padding: 8}} >A propos</Text>
        </Pressable>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 150,
    height: 150,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  text: {
    padding: 10,
    color: "white",
    fontSize: 22,
    fontFamily: "Baloo2-Regular",
    fontWeight: "600",
    textAlign: "center",
    borderWidth:1,
    borderColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    backgroundColor:'rgba(255,255,255,0.2)',
    borderRadius:5
  }
});

export default HomeScreen;