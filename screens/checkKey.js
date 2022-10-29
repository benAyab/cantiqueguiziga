import React, { useEffect, useState } from "react";

import {
  Button,  
  ImageBackground,
  Modal,
  Pressable, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View } from "react-native";

import { isExpired } from '../helpers/utilities';
import storage from '../helpers/storage';
const image =  require("../assets/ancienpapier1.jpg");


    const CheckScreen = ({ navigation }) => {
      const [showModal, setShowModal] = useState(false);
      
        useEffect(() =>{
            if(storage.contains('license')){
                const l = storage.getString('license');
                console.log(l);
                const license = JSON.parse(l);
                if( !isExpired(license.expiredate) ){
                  navigation.replace("Home");
                }else{
                  showAlert("Cette Clé de Licence a expiré");
                }
            }
        })

        const showAlert = (msg) =>{
          Alert.alert(
            "Infos",
            msg,
            [{
              text: "OK",
              onPress: () =>{}
            }],
            {
              cancelable: true,
              onDismiss: () =>{}
            }
          )
        }
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
                    <Pressable style={styles.button} onPress={() => setShowModal(true)}>
                      <Text style={{fontSize: 22, fontFamily: "Baloo2-Regular"}}> Obtenir une clé</Text> 
                    </Pressable>
                  </View>
                  <Modal
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                  >
                   <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", padding: 10, borderRadius: 25}}>
                      <Text style={{fontWeight: "900", fontSize: 24, color: "white"}}>
                         Pour obtenir une clé d'activation, contactez:
                        </Text>
                      <Text style={{fontWeight: "400", fontFamily: "Baloo2-Regular", fontSize: 24, color: "white"}}>
                         M. BIMKE André
                      </Text>
                      <Text style={{fontWeight: "100", fontFamily: "Baloo2-Regular", fontSize: 18, color: "white"}}>
                         Tel: +237 699-82-78-29
                      </Text>
                      <View style={{marginHorizontal: 50, borderRadius: 20}}>
                        <Button
                          title="OK"
                          color="#31bd56"
                          onPress={() => setShowModal(false)}
                        />
                      </View>
                  </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
        );
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
          backgroundColor:'rgba(255,20,25,0.6)',
          borderRadius:25
        },
        button: {
          backgroundColor:'rgba(70,219,106,0.8)',
          borderRadius: 10,
          padding: 5,
          borderWidth: 1,
          borderColor: 'rgba(75,219,205,0.4)'
        },
      });
      export default CheckScreen;