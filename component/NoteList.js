import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from './../AuthProvider';

const NoteList = () => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      </ScrollView>
      <Text style={styles.notiText}>Please <Text style={{ color: '#63b6ac' }}>create an account</Text> or <Text style={{ color: '#63b6ac' }}>sign-in</Text> to use <Text style={{ color: '#63b6ac' }}>Simple Note!</Text></Text>

      {user ? (
        <TouchableOpacity style={styles.buttonAdd}>
          <Feather name='plus' color={'#63b6ac'} size={25} />
        </TouchableOpacity>
      ) : null}


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notiText: {
    color: '#aaa',
    fontWeight: '500'
  },
  buttonAdd: {
    width: 55,
    height: 55,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: .3,
    elevation: 3
  }
})

export default NoteList