import {
    Text,
    View
} from "react-native";
import * as React
    from "react";
import {
    useEffect,
    useState
} from "react";

export default function Details({id}) {

    const [cocktail, setCocktail] = useState()
    useEffect(() => {
        const cocktail = async () => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data =  await response.json();

            await setCocktail(data.drinks);
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
            <Text>{cocktail[0].strDrink}</Text>
        </View>
    );
}