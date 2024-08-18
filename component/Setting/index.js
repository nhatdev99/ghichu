import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { auth } from '../../firebase/firebaseConfig';
import { baseColor, dark, light } from '../src/colors';
import { AuthContext } from './../../AuthProvider';


const Setting = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    let item = [
        {
            name: 'Account',
            icon: 'user',
            link: 'Signin'
        },
        {
            name: 'Games',
            icon: 'box',
            link: 'GameList'

        },
        {
            name: 'Privacy & Security',
            icon: 'lock',
            link: ''
        },
        {
            name: 'System',
            icon: 'git-pull-request',
            link: ''

        },
        {
            name: 'Storage',
            icon: 'database',
            link: ''

        },
        {
            name: 'Donate',
            icon: 'credit-card',
            link: ''

        },
        {
            name: 'Help & Support',
            icon: 'help-circle',
            link: ''

        },
    ]

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} >

                {item
                    .filter(i => !(i.name === 'Account' && user))
                    .map((i, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.itemContainer} activeOpacity={.6} onPress={() => navigation.navigate(i.link)}>
                            <View style={styles.itemleft}>
                                <Feather name={i.icon} color={dark} size={25} />
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.text}>{i.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                {user ? (<TouchableOpacity style={[styles.button]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Sign-out</Text>
                </TouchableOpacity>) : null}

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        flex: 1,

    },
    scrollContainer: {
    },
    text: {
        fontSize: 20,
        color: dark,
        fontWeight: '500'
    },
    itemContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    itemleft: {
        marginRight: 30,
    },
    itemRight: {
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    bageContainer: {
        borderRadius: 10,
        backgroundColor: baseColor,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itembage: {
        color: '#fff',
        fontSize: 10,
    },
    button: {
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
        borderWidth: .5,
        borderColor: baseColor

    },
    buttonText: {
        color: baseColor,
        fontWeight: '600'
    },
})
export default Setting