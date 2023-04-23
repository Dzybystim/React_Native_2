import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function CreatePostsScreen({navigation}) {


    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
      })
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
    
      if (!fontsLoaded) {
        return null;
      }
      

    return (<>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>CreatePostsScreen</Text>
    </View>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})