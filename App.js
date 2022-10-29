import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen  from './screens/Home';
import ListScreen from './screens/ListCantique';
import DetailScreen from  './screens/DetailCantique';
import PrayerScreen from './screens/Prayer';
import ActivateScreen from './screens/activate';
import CheckScreen from './screens/checkKey';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="CheckKey"
          component={CheckScreen}
          options={{
            title: 'Cantique Guiziga',
            headerStyle: {
              backgroundColor: '#31bd56',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen
          name="Activation"
          component={ActivateScreen}
          options={{
            title: 'Activation',
            headerStyle: {
              backgroundColor: '#31bd56',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'Cantique Guiziga',
            headerStyle: {
              backgroundColor: '#31bd56',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } 
          }} 
        />
        <Stack.Screen
          name='About'
          component={PrayerScreen}
          options={{ 
            title: 'A propos',
            headerStyle: {
              backgroundColor: '#31bd56',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } 
          }}
        />
        <Stack.Screen 
            name="List" 
            component={ListScreen}
            options={{ 
              title: 'Cantique Guiziga',
              headerStyle: {
                backgroundColor: '#31bd56',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: "Baloo2-Regular"
              }
            }} 
          />
        <Stack.Screen 
            name="Detail"  
            component={DetailScreen}
            options={({ route }) => (
              { 
                title: route.params.number +" - "+ route.params.title,
                headerStyle: {
                  backgroundColor: '#31bd56',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: "CAMCA4"
                }
               }
              )}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
