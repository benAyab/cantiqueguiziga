import React, { useState } from "react";

import {
    ActivityIndicator,
    Alert,
    Button,
    ImageBackground,
    Modal,
    TextInput,
    ToastAndroid,
    StyleSheet, 
    SafeAreaView, 
    Text, 
    View } from "react-native";

import NetInfo from '@react-native-community/netinfo';

//utilities
import storage from '../helpers/storage';
import { isExpired } from '../helpers/utilities';

//Const 
const image =  require("../assets/ancienpapier1.jpg");
//const LICENSE_URL = 'http://192.168.139.127:3000/api/license';
const LICENSE_URL =  'https://guiziga.alwaysdata.net/api/license'


const ActivateScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);

    let licenseKey = "";

    const startLicenseCheck = async() =>{
      if(licenseKey !== ""){
        try{
          const state = await NetInfo.fetch();
          //First check internet connection
          if(state.isInternetReachable){
            //Well done !
            //All stuffs here-->
            setShowModal(true);
            console.log("fetching license...");
            const l = await getLicenseFromDB(licenseKey);
            if(l && l.isEmpty){
              showAlert("Aucune licence associée à cette clé n'a été trouvée. Vérifiez et Réessayez");
              setShowModal(false);
            }else{
              console.log("License found. Checking status...");
              if(l.msg.isActive){
                console.log("License status: ENABLED. Checking validity...");
                if(isExpired(l.msg.expiredate)){
                  showAlert("Cette Licence a expiré");
                  setShowModal(false);
                }else{
                  console.log("License is not expired. Launching app...");
                  saveLicenseKey(l.msg);
                  navigation.reset({
                    index: 0,
                    routes: [
                      {name: "Home"}
                    ]
                  });
                }
              }else{
                console.log("License status: NOT ENABLED. Enabling...");
                const enableResponse = await enableLicense(l.msg.serial);
                if(!enableResponse){
                  showAlert("Echec d'activation de la clé");
                  setShowModal(false);
                }else{
                  console.log("License status changed to: ENABLED.");
                  console.log("License verification on server...");
                  const license = await getLicenseFromDB(l.msg.serial);
                  if(license && !license.isEmpty && license.msg.isActive){
                    console.log("License verified.");
                    console.log("Storing License...");
                    saveLicenseKey(license.msg);
                    console.log("All done");
                    setShowModal(false);
                    navigation.reset({
                      index: 0,
                      routes: [
                        {name: "Home"}
                      ]
                    });
                  }else{
                    console.log("License verifcation failed");
                    showAlert("Echec de vérification de la clé. Vérifiez votre connexion internet et réessayez");
                    setShowModal(false);
                  }
                }
              }
            }
          }else{
            //Otherwise nothing to do
            showAlert("Aucune connexion Internet pour continuer le traitement");
          }
        }catch(err){
          console.log(err);
          ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
      }
    }

    const enableLicense = async(serial) =>{
      try{
        const result = await fetch(`${LICENSE_URL}/${serial}`, {method: 'PUT'})
        if(result.ok){
          return true;
        }
        return false;
      }catch(e){
        console.log(e)
      }
    }

    const getLicenseFromDB = async(key) =>{
    try{
      const result = await fetch(`${LICENSE_URL}/${key}`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json', }
    });

      if(result.ok){
        const license = await result.json();
        return license;
      }
      return null;
    }catch(e){
      console.log(e);
      showAlert(e.message);
    } 
  }
      
  const getKeyFromUser = (txt) =>{ 
    licenseKey = txt;
    //console.log(licenseKey);
  }

  const saveLicenseKey = (license) =>{
    storage.set('license', JSON.stringify(license));
  }

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

  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}> 
        <View style={styles.inputContainer}>
          <TextInput 
              style={styles.textinput} 
              autoCapitalize="characters"
              autoFocus={true}
              maxLength={18}
              placeholder="Entrer la clé"
              returnKeyType="send"
              onEndEditing={startLicenseCheck}
              onChangeText={(txt) => getKeyFromUser(txt)}>
            </TextInput>
        </View>

        <View style={{marginHorizontal: 50, borderRadius: 20}}>
            <Button
                title="Activer"
                color="#31bd56"
                onPress={startLicenseCheck}
            />
        </View>
        <Modal
          transparent={true}
          style={{padding: 15, margin: 20}}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.centeredView}>
            <Text style={{color:"black" ,fontFamily: "Baloo2-Regular", fontSize: 20}}>Traitement encours...</Text>
            <ActivityIndicator size="large"/>
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
        centeredView:{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
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