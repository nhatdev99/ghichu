import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
const image = require('../../assets/imageBackground.jpg');


const Header = () => {
    const navigation = useNavigation()
    return (
        <ImageBackground style={styles.container} source={image}>

            <SafeAreaView style={styles.container}>
                <View style={styles.headerLeft} >
                    <Image source={require('../assets/icon.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
                </View>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerText}>
                        GHI CHÚ CỦA BẠN
                    </Text>
                </View>

            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerLeft: {
        borderRadius: 15,
    },
    headerCenter: {
        justifyContent: 'center',
        borderRadius: 15,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    headerRight: {
        justifyContent: 'center',
        borderRadius: 15,
    }
})

export default Header