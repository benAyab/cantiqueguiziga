import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    Button,
    ImageBackground,
    Modal,
    Pressable, 
    StyleSheet, 
    SafeAreaView, 
    Text, 
    View } from "react-native";

    
import { sign, decode } from "react-native-pure-jwt";

import storage from '../helpers/storage';

    const checkScreen = ({ navigation }) => {
        const [showActivity, setShowActivity] = useState(true);
        const [showModal, setShowModal] = useState(false);

        useEffect(() =>{
            if(storage.contains('license')){
                const l = storage.getString('license');
                console.log(l);
                //const license = JSON.parse(l);
              }else{
                console.log("Application non activée");
            }
        })

        if(showActivity){
            return(
                <SafeAreaView style={styles.container}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                      <View>
                        <ActivityIndicator size="large" animating={showActivity} />
                      </View>
                      <View>
                      <Modal
                        statusBarTranslucent={true}
                            animationType="slide"
                            transparent={false}
                            visible={showModal}
                        >
                        </Modal>
                      </View>
                <Button
                    title="Entrer"
                    color="#31bd56"
                    onPress={() => setShowModal(true)}
                />
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
                <Button
                    title="Entrer"
                    color="#31bd56"
                    onPress={() => setShowModal(true)}
                />
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
      export default checkScreen;