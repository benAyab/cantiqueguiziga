import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Button,
    ImageBackground,
    Pressable, 
    StyleSheet, 
    SafeAreaView, 
    Text, 
    View } from "react-native";

import storage from '../helpers/storage';
const image =  require("../assets/ancienpapier1.jpg");

    const CheckScreen = ({ navigation }) => {
        const [showActivity, setShowActivity] = useState(true);
        const [showModal, setShowModal] = useState(false);

        useEffect(() =>{
            if(storage.contains('license')){
                const l = storage.getString('license');
                console.log(l);
                //const license = JSON.parse(l);
              }else{
                if(showActivity){
                  setShowActivity(false);
                }
              }
        })

        if(showActivity){ 
            return(
                <SafeAreaView style={styles.container}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                      <View>
                        <ActivityIndicator size="large" animating={showActivity} />
                      </View>
                </ImageBackground>
            </SafeAreaView>
          );
        }else{
            return(
                <SafeAreaView style={styles.container}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

                      <View>
                        <Text style={styles.text}>
                            Votre Application n'est pas activée 
                            ou votre licence a expiré
                        </Text>
                      </View>

                      <View style={styles.section}>
                        <Text style={{fontSize: 20}}>Si vous avez une clé à jour, entrez la clé pour activer</Text>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('Activation')}>
                          <Text style={{fontSize: 22, fontFamily: "Baloo2-Regular"}} > Entrer une clé </Text> 
                        </Pressable>
                      </View>

                      <View style={styles.section}>
                        <Text style={{fontSize: 20}}>Si vous n'avez pas une clé à jour, vous pouvez obtenir</Text>
                        <Pressable style={styles.button} onPress={() => console.log("Je veux une clé")}>
                          <Text style={{fontSize: 22, fontFamily: "Baloo2-Regular"}}> Obtenir une clé</Text> 
                        </Pressable>
                      </View>
                </ImageBackground>
            </SafeAreaView>
          );
        }
      }

    const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        image: {
          flex: 1,
          justifyContent: "flex-start",
          paddingHorizontal: 16,
        },
        section: {
          alignItems: 'center',
          marginTop: 50
        },
        text: {
          padding: 10,
          color: "white",
          fontSize: 22,
          fontFamily: "Baloo2-Regular",
          fontWeight: "600",
          textAlign: "center",
          borderColor: '#fff',
          alignItems:'center',
          justifyContent:'center',
          marginTop: 20,
          marginBottom: 20,
          backgroundColor:'rgba(255,20,25,0.4)',
          borderRadius:25
        },
        button: {
          backgroundColor:'rgba(25,255,25,0.5)',
          borderRadius: 20,
          padding: 5,
          elevation: 5,
          borderWidth: 1,
          borderColor: 'rgba(205,255,205,0.4)'
        },
      });
      export default CheckScreen;