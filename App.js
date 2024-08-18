import { DefaultTheme, NavigationContainer, useNavigation, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home';
import Setting from './component/Setting';
import { Image, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Signup from './component/Signup';
import Signin from './component/Signin';
import { createContext, useEffect, useState } from 'react';
import { auth, db } from './firebase/firebaseConfig';
import { dark, light } from './component/src/colors';
import GamesList from './component/Games/GamesList';
import GuesTheNumber from './component/Games/GuesTheNumber';
import AuthProvider from './AuthProvider';
import YourLuck from './component/Games/YourLuck';

const image = require('./assets/imageBackground.jpg')
const Stack = createNativeStackNavigator()

export const AuthContext = createContext();


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Người dùng đã đăng nhập
        const userDoc = await db.collection('user').doc(authUser.uid).get();
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          name: userDoc.data().name,
        });
      } else {
        // Người dùng đã đăng xuất
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: 'rgba(255,255,255,.8)',
            },
            headerTranslucent: Platform.OS === 'ios',
            headerTransparent: true,
            headerTintColor: dark,
            headerShadowVisible: false,
            headerBackButtonMenuEnabled: true,
            // headerBlurEffect: 'systemUltraThinMaterialLight',
            // statusBarTranslucent: true
          }}>
          <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
            headerShown: true,
            headerTitle: !user ? 'Your note' : "Hi, " + user.name,
            headerLeft: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Setting') }} style={styles.headerRight} activeOpacity={.7}>
                <IonIcons name='menu-outline' color={dark} size={30} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.headerLeft} >
                <Image source={require('./assets/icon.png')} style={{ width: 50, height: 50, borderRadius: 15 }} />
              </View>
            )
          })} />
          <Stack.Screen name="Setting" component={Setting} options={{
            title: 'Menu',
            headerBackTitle: 'Home'
          }} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name='GameList' component={GamesList} options={{
            title: 'Game List',

          }} />
          <Stack.Screen name='GuesTheNumber' component={GuesTheNumber} options={{
            headerShown: false,

          }} />
          <Stack.Screen name='YourLuck' component={YourLuck} options={{
            headerShown: false,

          }} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
export default App