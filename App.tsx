// import { StatusBar } from 'expo-status-bar';
// import { Pressable, StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ee08db',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Homepage from './Frontend/src/Screens/Homepage';
import CreateMediaGroupScreen from './Frontend/src/Screens/CreateMediaGroupScreen';
import MediaImport from './Frontend/src/Screens/MediaImport';
import QRGenerator from './Frontend/src/Screens/QRGenerator';
import QRScanner from './Frontend/src/Components/QRScanner';
import type { Media } from './Frontend/src/Components/MediaCard';

type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  CreateMediaGroup: undefined;
  MediaImport: undefined;
  QRGenerator: undefined;
  QRScanner: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Home'>>();

  return (
    <Homepage
      onGeneratePress={() => navigation.navigate('CreateMediaGroup')}
      onScanPress={() => navigation.navigate('QRScanner')}
    />
  );
}

function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}

export default function App() {
  const [importedMedia, setImportedMedia] = React.useState<Media[]>([]);
  const [mediaGroupName, setMediaGroupName] = React.useState('');

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#8448bd',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 8 },
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Stack.Navigator screenOptions={{ headerTintColor: '#8448bd' }}>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="CreateMediaGroup" options={{ title: '' }}>
                {({ navigation }) => (
                  <CreateMediaGroupScreen
                    importedMedia={importedMedia}
                    onImportPress={() => navigation.navigate('MediaImport')}
                    onNextPress={(name) => {
                      setMediaGroupName(name);
                      navigation.navigate('QRGenerator');
                    }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="MediaImport" options={{ title: '' }}>
                {({ navigation }) => (
                  <MediaImport
                    onCancel={() => navigation.goBack()}
                    onMediaSelected={(media) => {
                      setImportedMedia((currentMedia) => [...currentMedia, ...media]);
                      navigation.goBack();
                    }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="QRGenerator" options={{ title: 'QR Generator' }}>
                {({ navigation }) => (
                  <QRGenerator
                    groupName={mediaGroupName}
                    importedMedia={importedMedia}
                    onBack={() => navigation.goBack()}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="QRScanner" options={{ title: 'Scan QRCode' }}>
                {({ navigation }) => (
                  <QRScanner
                    onScanned={(groupId) => {
                      console.log('Scanned group id:', groupId);
                      navigation.popToTop();
                    }}
                    onBack={() => navigation.goBack()}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
