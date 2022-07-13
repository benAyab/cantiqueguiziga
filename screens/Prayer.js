import React from "react";
import { ImageBackground, FlatList, Pressable, StyleSheet, SafeAreaView, Text, View } from "react-native";

const image =  require("../assets/ancienpapier1.jpg" );

const PryerScreen = () => (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{position: "absolute", top: 20, borderBottomColor: "white", borderBottomWidth: 1}}>
            <Text style={styles.text}> RECUEIL DE CANTIQUES EN LANGUE GUIZIGA </Text>
        </View>

        <View style={{position: "absolute", left: 2, bottom: 2}}>
          <Text style={{color: "white", fontStyle: "italic"}} >cantiques_guiziga v1.0</Text>
        </View>
        <View style={{ alignItems: "center", padding: 10, borderWidth:1, borderColor: '#fff', borderRadius: 5}}>
          <Text style={{fontWeight: "900", fontSize: 20, color: "white"}}> Développé par:</Text>
          <Text style={{fontWeight: "400", fontFamily: "Baloo2-Regular", fontSize: 20, color: "white"}}> Victor GUIGABE (developer)</Text>
          <Text style={{fontWeight: "100", fontFamily: "Baloo2-Regular", fontSize: 14, color: "white"}}> Tel: +237 698 530 658</Text>

          <Text style={{fontWeight: "400", fontFamily: "Baloo2-Regular", fontSize: 20, color: "white"}}> SAMDALLE Amaria (Lead developer)</Text>
          <Text style={{fontWeight: "100", fontFamily: "Baloo2-Regular", fontSize: 14, color: "white"}}> Tel: +237 695 306 978</Text>
        </View>
        
      </ImageBackground>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
      },
      text: {
        padding: 7,
        color: "white",
        fontSize: 22,
        fontFamily: "Baloo2-Regular",
        fontWeight: "600",
        textAlign: "center",
        borderWidth:0,
        borderColor: '#fff',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 20,
      }
  });

  export default PryerScreen;