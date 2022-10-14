import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  FlatList, 
  Pressable, 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View } from "react-native";
  
import RNPickerSelect from 'react-native-picker-select';
import original_cantiques from "../assets/helper";

const image =  require("../assets/ancienpapier1.jpg" );

const copy_original_cantiques = JSON.parse(JSON.stringify(original_cantiques));

const Item = ({ title, num }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{num} - {title}</Text>
    </View>
);

const compareTitle = (a, b) =>{
  return a.title > b.title? 1: b.title > a.title ? -1:0;
}

const compareValue = (a, b) =>{
  return a.num - b.num;
}

const ListScreen = ({ navigation }) =>{

  let [cantiques, setCantique] = useState(copy_original_cantiques)

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate({params: {title: item.title, number: item.num}, name: "Detail"})}>
            <Item title={item.title} num ={item.num} />
        </Pressable>
    );

    const sortListBy = (props) =>{
      if(props === "num"){
        cantiques.sort(compareValue);
        setCantique(cantiques);
      }
      else if(props === "title"){
        cantiques.sort(compareTitle);
        setCantique(cantiques)
      }
      else{
        cantiques.sort(compareTitle).reverse();
        setCantique(cantiques)
      }
    }
    return(
        <View style={styles.container}>
              <RNPickerSelect
                placeholder={{label: "Afficher par", value: null}}
                useNativeAndroidPickerStyle={true}
                fixAndroidTouchableBug={true}
                onValueChange={(value) => sortListBy(value)}
                items={[
                    {key: "123", label: 'numéro[1-2-3...]', value: 'num' },
                    {key: "124", label: 'titre[A - Z]', value: 'title' },
                    {key: "125", label: 'titre[Z - A]', value: 'title-r' }
                ]}
              />
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView>  
            <FlatList
                data={cantiques}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            </SafeAreaView>
        </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    color: "#2d3030",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "CAMCA4"
  },
});

export default ListScreen;