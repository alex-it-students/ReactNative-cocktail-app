import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {useEffect, useState} from "react";
import {useRoute, useNavigation} from "@react-navigation/native";
import {
    Ionicons
} from "@expo/vector-icons";

const Details =() => {
const route = useRoute();
const navigation = useNavigation();
const id = route.params.id
    const [cocktail, setCocktail] = useState(null);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchCocktail = async () => {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await response.json();
            console.log(data);

            const ingredients = Object.keys(data.drinks[0])
                .filter(key => key.includes('strIngredient'))
                .map(key => data.drinks[0][key]);
            const measures = Object.keys(data.drinks[0])
                .filter(key => key.includes('strMeasure'))
                .map(key => data.drinks[0][key]);

            const newIngredients = [];
            for (let i = 0; i < ingredients.length; i++) {
                if (ingredients[i] !== null) {
                    newIngredients.push({
                        measure: measures[i],
                        ingredient: ingredients[i]
                    });
                }
            }
            setRecipe(newIngredients);
            console.log('ici')
console.log(recipe && recipe)
            setCocktail(data.drinks[0]);
        };
        fetchCocktail().then().catch();
    }, [id]);

    const renderItem = ({ item }) => (
        <View style={styles.ingredientItem}>
            <Text style={styles.ingredientTitle}>{item.ingredient}</Text>
            <Text style={styles.ingredientMeasure}>{item.measure}</Text>
        </View>
    );

    return (
        <View style={styles.detailContainer}>
            {cocktail && (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: `${cocktail.strDrinkThumb}` }}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            paddingVertical: 20,
                        }}
                    >
                        {cocktail.strDrink}
                    </Text>

                    <FlatList
                        data={recipe}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.flatListContent}
                        ListHeaderComponent={
                            <>
                                <Text style={styles.ingredientTitle}>
                                    {cocktail.strCategory}
                                </Text>
                                <Text style={styles.title}>Ingredients</Text>
                            </>
                        }
                        ListFooterComponent={
                            <>
                                <Text style={styles.title}>Recipe</Text>
                                <Text>{cocktail.strInstructions}</Text>
                            </>
                        }
                    />
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    detailContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40%",
        paddingHorizontal: 10,
    },
    recipeContainer: {
        alignItems: "center",
        paddingTop: 10,
    },
    title: {
        paddingVertical: 15,
        fontWeight: "bold",
    },
    ingredientsContainer: {
        height: 150,
        width: "100%",
    },
    flatListContent: {
        flexGrow: 1,
    },
    ingredientItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 3,
    },
    ingredientTitle: {
        fontWeight: "bold",
    },
    ingredientMeasure: {
        marginLeft: 5,
    },
    backButton: {
        position: "absolute",
        top: 70,
        left: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        zIndex: 1,
    },
    backButtonText: {
        color: "white",
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default Details