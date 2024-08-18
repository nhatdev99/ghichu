import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NoteList from '../NoteList';
import Setting from '../Setting';
import { dark, light } from '../src/colors';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container} >
            <NoteList />
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: light,
    }
})

export default Home