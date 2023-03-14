import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";


const UserInfo = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/header-background.jpg")}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>User Info</Text>
                </View>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.infoTitle}>Name:</Text>
                <Text style={styles.infoText}>John Doe</Text>
                <Text style={styles.infoTitle}>Email:</Text>
                <Text style={styles.infoText}>johndoe@mail.com</Text>
                <Text style={styles.infoTitle}>Address:</Text>
                <Text style={styles.infoText}>78 route de Paris, 69260 Charbonnières, France</Text>
                <Text style={styles.infoTitle}>Phone:</Text>
                <Text style={styles.infoText}>04 50 50 38 49</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    imageBackground: {
        width: "100%",
        height: 350,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 15,
    },
});

export default UserInfo;
