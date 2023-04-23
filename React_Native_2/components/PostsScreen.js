import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCallback, useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const posts = [
    {
        id: "1",
        title: "Лес",
        image: '../image/forest.png',
        geolocation: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
        id: "2",
        title: "Закат",
        image: '../image/sunset.png',
        geolocation: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
        id: "3",
        title: "Зака",
        image: '../image/sunset.png',
        geolocation: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
        id: "4",
        title: "Закатn",
        image: '../image/sunset.png',
        geolocation: "Ivano-Frankivs'k Region, Ukraine",
    },
    {
        id: "5",
        title: "Закатnj",
        image: '../image/sunset.png',
        geolocation: "Ivano-Frankivs'k Region, Ukraine",
    }
]

const Item = ({id, title, geolocation, sizeWidth, image}) => (

    <View >
        <Image style={{...styles.fotoPost, width: sizeWidth}} resizeMode={'cover'} source={require('../image/sunset.png')}/>
        <View style={styles.captionPhoto}>
        <Text style={styles.textPostTitle}>{title}</Text>
        <View style={styles.messageAndMapView}>
            <View style={styles.messageView}>
              <Feather name="message-circle" size={18} color="#BDBDBD" style={styles.iconMessageCircle}/>
              <Text style={styles.messageNumber}>0</Text>
            </View>
            <View style={styles.mapView}>
               <Feather name="map-pin" size={18} color="#BDBDBD" style={styles.iconMap} />   
               <Text>{geolocation}</Text>
            </View>
        </View>
        </View>
    </View>
  );



export default function PostsScreen({navigation}) {

    const [dimen, setDimen] = useState(Dimensions.get('window').width-16*2)

    useEffect(() => {
        const onChange = () => {
          const width = Dimensions.get('window').width-16*2;
          setDimen(width);
        };
      
        Dimensions.addEventListener('change', onChange);
      
        return () => {
          Dimensions.removeEventListener('change', onChange)
        };
      
      }, [])

    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
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
         <View style={{...styles.userInformView, width: dimen}}>
         <View style={styles.imageLogoView}>
         <Image 
          style={styles.imageLogo}
          source={ require("../image/avatar.png")}
          resizeMode={'cover'}/>
         </View>
          <View>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
        <SafeAreaView style={{...styles.containerSafe, width: dimen}}>
        <FlatList 
        style={styles.postView}

        data={posts}

        renderItem={ ({item}) => <Item 
        title={item.title} 
        geolocation={item.geolocation} 
        sizeWidth={dimen} 
        image={item.image}/>}

        keyExtractor={item => item.id}
        />

        
        {/* <View  style={styles.postView}>
        <Image source={require('../image/forest.webp')}/>
        <Text>Лес</Text>
        <Text>Ivano-Frankivs'k Region, Ukraine</Text>
      </View> */}
       {/* {posts.map(({id, title, image, geolocation}) => {
      console.log(id)
      return <View key={id} style={styles.postView}>
        <Image source={require('../image/forest.png')}/>
        <Text>{title}</Text>
        <Text>{geolocation}</Text>
      </View>
      })}  */}
      </SafeAreaView>
    </View>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    containerSafe: {
        flex: 6,
        marginHorizontal: 16,
    },
    imageLogoView: {
        marginRight: 8,
        width: 60,
        height: 60,
      },
      imageLogo: {
        flex: 1,
        width: 60,
        height: 60,
        borderRadius: 16,
    },
    userInformView: {
        flex: 1, 
        flexDirection: "row",
        marginHorizontal: 16,
        marginTop: 32,
    },
    userName: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
    },
    userEmail: {
        fontFamily: "Roboto-Medium",
        fontSize: 11,
    },
    postView: {
        marginTop: 0,    
    },
    fotoPost: {
        marginTop: 32,
        height: 240,
        borderRadius: 8,
    },
    captionPhoto: {
        marginTop: 8,
    },
    textPostTitle: {
        fontSize: 16,
        fontFamily: "Roboto-Medium",
        marginBottom: 10,
    },
    messageView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    mapView: {
        flex: 3,
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    messageAndMapView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    iconMessageCircle: {
        marginRight: 8,
    },
    iconMap: {
        marginRight: 8, 
    },
    messageNumber: {
        color: "#BDBDBD"
    }
})