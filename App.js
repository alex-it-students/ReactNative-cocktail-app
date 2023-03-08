import * as React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import UserInfo
    from "./Components/UserInfo";
import Cocktails
    from "./Components/Cocktails";
import {
    useEffect,
    useState
} from "react";
import Details
    from "./Components/Details";

function HomeScreen() {

    const [randomCocktail, setRandomCocktail] = useState([])
    useEffect(() => {

        const addCocktail = (data) => {
            setRandomCocktail(prevState => [...prevState, data]);
        }
        const cocktails = async () => {
            const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await response.json();

            await addCocktail(data.drinks);
            return data.drinks;
        }

        for (let i = 1; i < 11; i++) {
            //on récupère un cocktail aléatoire
            cocktails().then(r=> console.log(r)).catch(e=>console.log(e))
        }
    }, [])

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
            data={randomCocktail}
            renderItem={ ({item}) =>

                <View
                style={styles.listContainer}>
                    <Image
                        style={{width: 60, height:60}}
                        source={{uri: `${item[0].strDrinkThumb}`}}
                    />
                    <Text
                        style={{paddingHorizontal:10}}>
                        {item[0].strDrink}
                    </Text>
                </View>
        }
        />
      </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
          <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cocktails" component={CocktailsScreen} />
          <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

function UserScreen() {
    return (
        <UserInfo/>
    );
}
function CocktailsScreen() {
    return (
        <Cocktails/>
    );
}
function DetailScreen() {
    return (
        <Details/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    listContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        width:'100%'
    }
})

