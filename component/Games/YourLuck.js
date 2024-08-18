import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring,

} from 'react-native-reanimated';
import { View, Button, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import React, { useEffect, useState } from 'react'
import { baseColor, dark, light } from '../src/colors';
import { ImageBackground } from 'react-native';

const dWidth = Dimensions.get('window').width / 1.5

const YourLuck = ({ navigation }) => {
    var [randomWidth, setRandomWidth] = useState(10);
    var [randomHeight, setRandomHeight] = useState(10);
    const [boxWidth, setBoxWidth] = useState(0)
    const [boxHeight, setBoxHeigt] = useState(0)
    var [count, setCount] = useState(0);
    var [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');

    const [start, setStart] = useState(false);

    const handleStart = () => {
        setStart(true);
        const width = (Math.floor(Math.random() * 5) + 1) * 20;
        const height = (Math.floor(Math.random() * 5) + 1) * 20;
        setBoxWidth(width)
        setBoxHeigt(height)
        console.log("Độ dài: ", boxWidth, "\nChiều rộng: ", boxHeight);
        setGameOver(false);
        setMessage(null);
        setCount(0)
    }

    const handleRandom = () => {
        setCount(count + 1)
        const width = (Math.floor(Math.random() * 5) + 1) * 20;
        const height = (Math.floor(Math.random() * 5) + 1) * 20;
        setRandomWidth(width)
        console.log("W: ", randomWidth)
        setRandomHeight(height)
        console.log("H: ", randomHeight)

        if (randomWidth === boxWidth && randomHeight === boxHeight) {
            setGameOver(true);
            if (count >= 1 && count <= 10) {
                setMessage("May mắn vượt tầm vũ trụ")
            }
            else if (count > 10 && count <= 20) {
                setMessage("Có may mắn nhưng không đáng kể!")
            }
            else if (count > 20) {
                setMessage("Hơi xu nha bồ!")
            }
        }
    }

    const config = {
        duration: 200,
        easing: Easing.bezier(0.5, 0.5, 1, 1),
    };
    const randomStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(randomWidth, config),
            height: withTiming(randomHeight, config),
        };
    });


    return (
        <ImageBackground style={styles.container} source={require('../../assets/imageBackground.jpg')}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name='chevron-left' color={dark} size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Guess The Number</Text>
                </View>
                <View style={styles.headerRight}>
                    <Feather name='box' color={dark} size={30} />
                </View>
            </View>

            {(start === true && gameOver === false) && (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',

                }}>
                    <View style={{
                        position: 'absolute',
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        width: boxWidth,
                        height: boxHeight,
                        borderColor: '#d08159',
                        zIndex: 1,
                        borderRadius: 15,
                    }} />

                    <Animated.View style={[styles.box, randomStyle]} />
                </View>
            )}

            {!gameOver && (
                <View style={{
                    position: 'absolute',
                    padding: 15,
                    top: dWidth / 2,
                    backgroundColor: '#d08159',
                    borderRadius: 15,
                }}>
                    <Text style={{
                        color: light
                    }}>{count}</Text>
                </View>
            )}


            {gameOver === true && (
                <View style={styles.messageContainer}>
                    <View style={{
                        backgroundColor: '#d08159',
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderBottomWidth: .5,
                        borderBottomColor: '#eee',
                        width: '100%',
                        paddingVertical: 10,
                    }}>
                        <Text style={[styles.messageText, {
                            fontSize: 25,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: light
                        }]}>Kết quả!</Text>
                    </View>
                    <View style={{
                        paddingVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text>Lượt tạo hình:</Text>


                        <Text style={{ fontSize: 100, fontWeight: 'bold' }}>{count - 1}</Text>

                        {message !== null && (
                            <Text style={[styles.messageText, {
                                fontStyle: 'italic',
                                textAlign: 'center',
                                fontSize: 10,

                            }]}>{message}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.resetButotn}
                        onPress={handleStart}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}> Chơi lại </Text>
                    </TouchableOpacity>
                </View>
            )}

            {start === false && (
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 50,
                        marginBottom: 50,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#212121',
                        borderRadius: 15,
                    }}
                    onPress={handleStart}
                >
                    <Text style={{ color: '#fff' }}> Bắt đầu </Text>
                </TouchableOpacity>
            )}
            {start && (
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 50,
                        marginBottom: 50,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#212121',
                        borderRadius: 15,
                    }}
                    onPress={handleRandom}
                    disabled={gameOver === true}
                >
                    <Text style={{ color: '#fff' }}> Tạo hình </Text>
                </TouchableOpacity>
            )}


        </ImageBackground>
    )
}

export default YourLuck

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: light,
        justifyContent: 'center'
    },
    box: {
        position: 'absolute',
        backgroundColor: dark,
        borderRadius: 15,
        shadowColor: dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 8,
        elevation: 1,
    },
    headerContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        zIndex: 99,
    },
    headerLeft: {

    },
    headerCenter: {

    },
    headerTitle: {
        color: dark,
        fontWeight: 'bold',
        fontSize: 20
    },
    messageContainer: {
        width: dWidth,
        height: dWidth,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: light,
        borderRadius: 15,
        zIndex: 99,
        shadowColor: dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .1,
        shadowRadius: 8,
        elevation: 1,
    },
    resetButotn: {
        width: '100%',
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d08159',
        borderRadius: 15,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    messageText: {
        paddingHorizontal: 15,
        fontWeight: '500'
    }
})