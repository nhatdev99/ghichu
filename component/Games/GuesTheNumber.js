import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { baseColor, dark, light } from '../src/colors';

const GuesTheNumber = ({navigation}) => {
    const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 100) + 1);
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState([]);

    const handleGuess = () => {
        const guess = parseInt(userGuess);
        if (isNaN(guess)) {
            Alert.alert('Lỗi nhập', 'Vui lòng nhập số từ 1 đến 100');
            return;
        }

        if (guess < 1 || guess > 100) {
            Alert.alert('Lỗi', 'Chỉ được nhập từ 1 đến 100');
            return;
        }

        setAttempts(attempts + 1);
        setGuesses([...guesses, guess]);

        if (guess === numberToGuess) {
            setMessage('Chúc mừng! Bạn đã đoán đúng!');
            Alert.alert('Chúc mừng', `Bạn đã đoán đúng!\nĐáp án là [${numberToGuess}].`)
            setGameOver(true);
        } else if (attempts + 1 === 5) {
            setMessage(`Hết lượt chơi! Đáp án là [${numberToGuess}].`);
            Alert.alert('Hết lượt chơi', `Đáp án là [${numberToGuess}].`)
            setGameOver(true);
        } else if (guess < numberToGuess) {
            setMessage('Hơi thấp, cao hơn đi!');
        } else {
            setMessage('Hơi cao, thấp xuống tí!');
        }

        setUserGuess('');
    };

    const handleReset = () => {
        setNumberToGuess(Math.floor(Math.random() * 100) + 1);
        setUserGuess('');
        setMessage('');
        setAttempts(0);
        setGameOver(false);
        setGuesses([]);
    };

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
            <View style={{
                width: '90%',
                marginTop: 100
            }}>
                <View style={{
                    borderRadius: 15,
                    backgroundColor: dark,
                    shadowColor: dark,
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 8,
                    elevation: 1,
                }}>
                    <Text style={styles.attempts}>Lượt chơi: {attempts} / 5</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập số bạn muốn đoán"
                        keyboardType="number-pad"
                        value={userGuess}
                        onChangeText={setUserGuess}
                        editable={!gameOver} // Disable input if game is over
                    />
                </View>
                {/* <FlatList
                    data={guesses}
                    renderItem={({ item }) => <Text style={styles.guess}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<Text style={styles.guessListTitle}>Your guesses:</Text>}
                /> */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleGuess} disabled={gameOver} >
                        <Text style={styles.buttonText}>Đoán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: dark }]} onPress={handleReset} >
                        <Text style={styles.buttonText}>Chơi lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                paddingHorizontal: 10,
                backgroundColor: dark,
                borderRadius: 10,
                marginBottom: 10,
            }}>
                {message !== '' && <Text style={styles.message}>{message}</Text>}
            </View>
            <ScrollView contentContainerStyle={styles.scrollView} horizontal>
                {guesses.map((guess, index) => (
                    <View
                        key={index}
                        style={styles.guesContainer}>
                        <Text key={index} style={styles.guess}>{guess}</Text>
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: light,
    },
    input: {
        height: 60,
        backgroundColor: '#f5f5f5',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingHorizontal: 10,
    },
    message: {
        fontSize: 18,
        color: light,
        marginVertical: 5,
    },
    attempts: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: light,
        fontWeight: '600',

    },
    button: {
        backgroundColor: '#d08159',
        padding: 20,
        marginVertical: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%'
    },
    buttonText: {
        color: light,
        fontWeight: '500'
    },
    scrollView: {
        marginHorizontal: 20,
        marginVertical: 20,
        flex: 1,
        justifyContent: 'flex-start'
    },
    guess: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        color: light
    },
    guesContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d08159',
        borderRadius: 15,
        marginRight: 5,
    },
    guessListTitle: {
        fontSize: 40,
        fontWeight: '700',
        marginVertical: 10,
        textAlign: 'center',
        color: '#d08159'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }
});

export default GuesTheNumber;
