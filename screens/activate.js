import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    Button,
    ImageBackground,
    Modal,
    TextInput,
    Pressable, 
    StyleSheet, 
    SafeAreaView, 
    Text, 
    View } from "react-native";

    
import { sign, decode } from "react-native-pure-jwt";

import storage from '../helpers/storage';

const image =  require("../assets/ancienpapier1.jpg" );
const URL_LICENSE = 'http://192.168.162.127:3000';
const PATH = '/api/license/';



    const ActivateScreen = ({ navigation }) => {
        const [showActivity, setShowActivity] = useState(false);
        const [showModal, setShowModal] = useState(false);

        let licenseKey = "";
        useEffect(() =>{
            if(storage.contains('license')){
                const l = storage.getString('license');
                console.log(l);
                //const license = JSON.parse(l);
              }else{
                console.log("Application non activée");
                const l = getLicenseFromDB('S4828-87VZE-2VAH3-BABFA-1E38A-5BE68');
                console.log(l);
              }
        })

        const getLicenseFromDB = async(key) =>{
          let result = await fetch(URL_LICENSE+PATH+key);
          const license = await result.json();
          return license;
        }
      
        const getKeyFromUser = (txt) =>{ licenseKey = txt}

        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                  <View>
                    <ActivityIndicator size="large" animating={showActivity} />
                    <TextInput onChangeText={(txt) => getKeyFromUser(txt)} value={licenseKey}></TextInput>
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
      export default ActivateScreen;