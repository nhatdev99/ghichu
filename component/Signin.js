import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../firebase/firebaseConfig';
import { CommonActions } from '@react-navigation/native';
import { baseColor, dark, light } from './src/colors';
import { AuthContext } from '../AuthProvider';

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            setLoading(true)
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            const userDoc = await db.collection('user').doc(user.uid).get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                setLoading(false)
                setUser({
                    uid: user.uid,
                    email: user.email,
                    name: userData.name,
                });

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            } else {
                setError("User data not found");
            }
        } catch (error) {
            setError('Login error, from ' + error.message);
            console.log("Login error: ", error.message)
            setLoading(false)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{
                paddingTop: 150
            }}>
                <View style={[styles.button, { backgroundColor: light }]}>
                    <Text style={[styles.warningText, { color: 'red' }]}>{error}</Text>
                </View>
                <View style={styles.itemcontainer}>
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput
                        style={styles.inputText}
                        inputMode='email'
                        placeholder="exam: exam@email.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.itemcontainer}>
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                        style={styles.inputText}
                        inputMode='text'
                        placeholder="yourpassword"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: dark }]}
                    onPress={handleLogin}
                >
                    {loading ? (
                        <ActivityIndicator color={baseColor} size={'small'} />
                    ) : (
                        <Text style={[styles.buttonText, { color: light }]}>Sign-in</Text>
                    )}

                </TouchableOpacity>
                <View style={[styles.button, { backgroundColor: light }]}>
                    <Text style={styles.warningText}>Create an account?</Text>
                </View>
                <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Sign-up</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light
    },
    itemcontainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    labelText: {
        color: dark,
        paddingHorizontal: 20,
        fontWeight: '500'
    },
    inputText: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9f9',
        borderRadius: 15,
        fontSize: 20,
        color: baseColor,
    },
    button: {
        backgroundColor: baseColor,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 15
    },
    buttonText: {
        color: light,
        fontWeight: '600'
    },
    warningText: {
        color: baseColor
    }

})

export default Signin