import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';

const Header = () => {
    return (
        <ImageBackground
            source={require('../assets/header-background.jpg')}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>cocktail-app</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 350,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default Header;






