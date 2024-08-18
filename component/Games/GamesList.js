import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dark, light } from '../src/colors'
import GuesImage from '../../assets/GuesTheNumber.png'
import GuesImage2 from '../../assets/GuesTheNumber2.png'
import Feather from 'react-native-vector-icons/Feather'
import YourLuck from './YourLuck'
const dimensions = Dimensions.get('window').width;
const dWidth = dimensions - 50;
const image = require('../../assets/imageBackground.jpg');
const yourluck = require('../../assets/YouLuck.png')

const GamesList = ({ navigation }) => {



    return (
        // <ImageBackground style={styles.container} source={image}>
        //     <ImageBackground style={styles.headerContainer} source={image}>
        //         <View style={styles.headerLeft}>
        //             <TouchableOpacity onPress={() => navigation.goBack()}>
        //                 <Feather name='chevron-left' color={dark} size={30} />
        //             </TouchableOpacity>
        //         </View>
        //         <View style={styles.headerCenter}>
        //             <Text style={styles.headerTitle}>Game List</Text>
        //         </View>
        //         <View style={styles.headerRight}>
        //             <Feather name='box' color={dark} size={30} />
        //         </View>
        //     </ImageBackground>
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{
                paddingTop: 120,
            }}>
                {/* <ImageBackground source={image} style={styles.itemBackground}
                        borderRadius={15}
                    > */}
                <TouchableOpacity style={styles.itemContainer} activeOpacity={.8} onPress={() => navigation.navigate('GuesTheNumber')}>
                    <View style={styles.imageContainer}>
                        <Image source={GuesImage} style={styles.image} resizeMode='cover' />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>Gues The Number</Text>
                    </View>
                </TouchableOpacity>
                {/* </ImageBackground> */}

                {/* <ImageBackground source={image} style={styles.itemBackground}
                        borderRadius={15}
                    > */}
                <TouchableOpacity style={styles.itemContainer} activeOpacity={.8} onPress={() => navigation.navigate('YourLuck')}>
                    <View style={styles.imageContainer}>
                        <Image source={yourluck} style={styles.image} resizeMode='contain' />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.text}>Your Luck</Text>
                    </View>
                </TouchableOpacity>
                {/* </ImageBackground> */}

            </ScrollView>
        </SafeAreaView>
        // </ImageBackground>

    )
}

export default GamesList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light,
    },
    itemBackground: {
        shadowColor: dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 8,
        elevation: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: light,
        marginHorizontal: 15,
        marginBottom: 10,
        shadowColor: '#aaa',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .4,
        shadowRadius: 8,
        elevation: 1,
    },
    imageContainer: {
        flex: 1,
        position: 'relative'
    },
    image: {
        aspectRatio: 2,
        width: '100%',
        height: undefined,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'contain'
    },
    titleContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    text: {
        color: dark,
        fontWeight: 'bold',
        fontSize: 20
    },
    headerContainer: {
        position: 'absolute',
        top: 30,
        height: 100,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        zIndex: 99,
        shadowColor: dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 3,
        elevation: 1,
        backgroundColor: light
    },
    headerLeft: {

    },
    headerCenter: {

    },
    headerTitle: {
        color: dark,
        fontWeight: 'bold',
        fontSize: 20
    }
})