import {
    Text,
    View
} from "react-native";
import React, {
    useState,
    useEffect
}
    from "react";

export default function Cocktails() {

    const [categories,setCategories] = useState()

    const getCategoryList = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        data && await setCategories(data);
        console.log('category list')
        console.log(data)
    }

    const getListByCategory = async (category) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        data && await setCategories(data);
    }

    useEffect(() => {

        getCategoryList()
            .then(r => console.log(r))
            .catch(e => console.log(e))
    }, [])

return (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Text>hello</Text>

    </View>
);
}