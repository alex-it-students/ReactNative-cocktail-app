import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import React, {
    useState,
    useEffect
}
    from "react";
import {
    Picker
} from "@react-native-picker/picker";
import {
    useNavigation
} from "@react-navigation/native";

export default function Cocktails() {

    const [categories,setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Cocktail");
    const [cocktails, setCocktails] = useState([]);
    const navigation = useNavigation()

    const fetchCategories = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        data && await setCategories(data.drinks);
    }

    const fetchCocktails = async (category) => {
        const cat = category.split(' ').join('_')
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const data = await response.json();
        console.log(cat)
        setCocktails(data.drinks);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Details', { id: item.idDrink });
            }}
            style={styles.item}
        >
            <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
            <Text>{item.strDrink}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        fetchCategories();
        if (selectedCategory) {
            fetchCocktails(selectedCategory);
        }
    }, [selectedCategory])


return (
    <View style={styles.container}>
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
                <Picker.Item label="Select a category" value={null} />
                {categories.length > 0 && categories.map(category => (
                    <Picker.Item key={category.strCategory} label={category.strCategory} value={category.strCategory} />
                ))}
            </Picker>
        </View>
        <FlatList
            style={{width:'100%'}}
            data={cocktails}
            renderItem={renderItem}
            keyExtractor={item => item.idDrink}
            contentContainerStyle={styles.listContainer}
        />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    listContainer: {
        flexGrow: 1
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:1
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});