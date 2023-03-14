import {
    ImageBackground,
    Text,
    View
} from "react-native";
import * as React
    from "react";

export default function UserInfo(props) {
    const {styles} = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%' }}>
            <ImageBackground
                source={require('../assets/header-background.jpg')}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>cocktail-app</Text>
                </View>
            </ImageBackground>
        </View>
    );
}