import {
    useEffect,
    useState
} from "react";
import {
    useNavigation
} from "@react-navigation/native";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import * as React
    from "react";
import Header
    from "./Header";

export default function Home(props) {

    const {styles} = props
    const [randomCocktail, setRandomCocktail] = useState([])
    const navigation = useNavigation();

    const addCocktail = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        setRandomCocktail(prevState => [...prevState, data.drinks]);
    }
    const moreCocktails = () => {
        for (let i = 1; i < 11; i++) {
            //on récupère un cocktail aléatoire
            addCocktail().then(r => console.log(r)).catch(e => console.log(e))
        }
    }

    useEffect(() => {
        for (let i = 1; i < 11; i++) {
            //on récupère un cocktail aléatoire
            addCocktail().then(r=> console.log(r)).catch(e=>console.log(e))
        }
    }, [])

    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%' }}>
                <Header/>
                <FlatList
                    style={{width:'100%'}}
                    data={randomCocktail}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Details', { id: item[0].idDrink });}}
                        >
                            <View style={styles.listContainer}>
                                <Image
                                    style={{ width: 60, height: 60 }}
                                    source={{ uri: `${item[0].strDrinkThumb}` }}
                                />
                                <Text style={{ paddingHorizontal: 10 }}>{item[0].strDrink}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    onEndReached={moreCocktails}
                    onEndReachedThreshold={1}
                />
            </View>
    );
}