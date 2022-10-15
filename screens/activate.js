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

import NetInfo from '@react-native-community/netinfo';

import storage from '../helpers/storage';

const image =  require("../assets/ancienpapier1.jpg");
const URL_LICENSE = 'http://192.168.201.127:3000';
const PATH = '/api/license/';



    const ActivateScreen = ({ navigation }) => {
        const [showActivity, setShowActivity] = useState(false);
        const [showModal, setShowModal] = useState(false);

        let licenseKey = "";
        useEffect( () =>{
          if(storage.contains('license')){
              const l = storage.getString('license');
                console.log(l);
                  //const license = JSON.parse(l);
             }else{
                
            }
        });

        const showAlert = (msg) =>{
          Alert.alert(
            "Infos",
            msg,
            [{
              text: "OK",
              onPress: () =>{
                if(setShowModal){
                  setShowModal(false);
                }
              }
            }],
            {
              cancelable: true,
              onDismiss: () =>{
                if(showModal){
                  setShowModal(false);
              }}
            }
          )
        }
        const startLicenseCheck = async() =>{
          try{
            const state = await NetInfo.fetch();
            console.log('Connection type: ', state.type);
            console.log('Is connected ? ', state.isConnected);
            console.log('Internet reachable ? ', state.isInternetReachable);

            showAlert('Internet reachable ? '+ state.isInternetReachable);

            const key = 'S4828-87VZE-2VAH3-BABFA-1E38A-5BE68';
            const l = await getLicenseFromDB(key);
            console.log(l);

          }catch(err){
            console.log();
          }

        }

        const getLicenseFromDB = async(key) =>{
          try{
            const result = await fetch(URL_LICENSE+PATH+key);
            const license = await result.json();
            return license;
          }catch(e){
            console.log(e);
          }
          
        }
      

        const getKeyFromUser = (txt) =>{ 
          licenseKey = txt;
          console.log(licenseKey);
        }

        const saveLicenseKey = (license) =>{
          
        }

        //Wether license is expired or not
        const checkExpirationLicense = (license) =>{
          let date = new  Date(license. activationdate);  
            if( (date.getTime()+365*24*3600*1000) <= Date.now()){
             console.log("votre licence est à jour");
            }
        }

        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
               
                <View style={styles.inputContainer}>
                  <TextInput 
                      style={styles.textinput} 
                      onChangeText={(txt) => getKeyFromUser(txt)}>
                    </TextInput>
                </View>

                <View>
                  <Button
                      title="Entrer"
                      color="#31bd56"
                      onPress={startLicenseCheck}
                  />
                </View>

                <View style={styles.centeredView}>
                  <Modal
                  transparent={false}
                    style={{padding: 15, margin: 20}}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                  >
                    <Text>Traitement encours...</Text>
                    <ActivityIndicator size="large"/>
                  </Modal>
                </View>

            </ImageBackground>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        centeredView:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20
        },
        image: {
          flex: 1,
          justifyContent: "flex-start",
          paddingHorizontal: 0,
        },
        textinput: {
          flex: 5,
          color:'black',
          height: 50,
          backgroundColor: "#dfe6e0",
          marginVertical: 1,
          borderBottomWidth: 1,
          paddingVertical: 5,
          paddingLeft: 10,
          fontSize: 20
      },
      inputContainer: {
        marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "flex-start",
          marginVertical: 30
      }
      });
      export default ActivateScreen;