import { useState, useCallback, useEffect  } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,  
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions} from 'react-native';
    import { useFonts } from 'expo-font';
    import * as SplashScreen from 'expo-splash-screen';
   
    SplashScreen.preventAutoHideAsync();


  const initialState ={
    login: "",
    email: "",
    password: "",
  }

 

export default function RegistrationScreen() {

const [keyboardView, setKeyboardView] = useState(false)
const [userInfo, setUserInfo] = useState(initialState)
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
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



const keyboardDismiss = () => {
  setKeyboardView(false);
  Keyboard.dismiss();
}

const submitForm = () => {
  setKeyboardView(false);
  Keyboard.dismiss();
  console.log(userInfo);
  setUserInfo(initialState);
}


    return (
      <TouchableWithoutFeedback onPress={() => keyboardDismiss()}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground 
        style={styles.imageFon}
        source={ require("../image/photo-bg.jpg")}>
      <KeyboardAvoidingView>
      {/* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}
        <View style={{...styles.whiteFon, paddingBottom: keyboardView ? 32 : 78}}>
        <View style={{...styles.form, width: dimen}}>
          <View style={styles.imageLogoView}>
             <Image 
             style={styles.imageLogo}
             source={ require("../image/avatar.png")}
             />
          </View>
          <View style={styles.containerTextRegister}>
            <Text style={styles.textRegister}>Регистрация</Text>
          </View>
        <View style={styles.containerInputLogin}>
        <TextInput style={styles.input} 
        textAlign={"left"} 
        onFocus={() => setKeyboardView(true)}
        onChangeText={(value) => setUserInfo((prevState) => ({...prevState, login: value}))}
        value={userInfo.login}
        placeholder='Логин'/>
        </View>
        <View style={styles.containerInputEmail}>
        <TextInput style={styles.input} 
        textAlign={"left"} 
        onFocus={() => setKeyboardView(true)}
        onChangeText={(value) => setUserInfo((prevState) => ({...prevState, email: value}))}
        value={userInfo.email}
        placeholder='Адрес электронной почты'/>
        </View>
        <View style={styles.containerInputPassword}>
        <TextInput style={styles.input} 
        textAlign={"left"} 
        secureTextEntry={true} 
        onFocus={() => setKeyboardView(true)}
        onChangeText={(value) => setUserInfo((prevState) => ({...prevState, password: value}))}
        value={userInfo.password}
        placeholder='Пароль'/>
        </View>
        <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={0.8}  style={styles.buttonForm} onPress={() => submitForm()}>
                  <Text style={styles.buttonFormText}>Зарегистрироваться</Text>
                </TouchableOpacity>
        </View>
        {keyboardView=== false ?
        <>
              <View >
                <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
              </View>
        </>
        :
        null
      }
        </View> 
        </View>
        </KeyboardAvoidingView>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',

    },
    imageFon: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "center",
        
    },
    input: {
      borderWidth: 1,
      borderColor: "#E8E8E8",
      height: 50,
      borderRadius: 8,
      color: "#212121",
      backgroundColor: "#F6F6F6",
      fontSize: 16,
      fontFamily: "Roboto-Regular",
      paddingLeft: 16,
    },
    imageLogo: {
        flex: 1,
        resizeMode: "cover",

    },
    imageLogoView: {
      width: 120,
      height: 120,
      borderRadius: 16,
      marginBottom: 32,
      marginHorizontal: 120,
      marginTop: -60,
    },
    form: {
      // marginHorizontal: 32,

    },
    whiteFon: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingLeft: 16,
      paddingRight: 16,
    },
    textRegister: {
      fontWeight: 500,
      fontSize: 30,
      textAlign: 'center',
      fontFamily: "Roboto-Medium",
    },
    containerTextRegister: {
     marginBottom: 33,
    },
    containerInputLogin: {
      marginBottom: 16,
    },
    containerInputEmail: {
      marginBottom: 16,
    },
    containerInputPassword: {
      marginBottom: 43,
    },
    buttonForm: {
      backgroundColor: '#FF6C00',
      borderRadius: 100,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonFormText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: "Roboto-Regular",
    },
    buttonView: {
      marginBottom: 16,
    },
    bottomText: {
      color: '#1B4371',
      textAlign: 'center', 
      fontFamily: "Roboto-Regular",
    },

  });