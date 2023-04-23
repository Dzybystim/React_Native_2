import { NavigationContainer } from "@react-navigation/native";
import { useState } from 'react';
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import {useRoute} from './router'

export default function App() {
  const [auth, setAuth] = useState(false)

  const routing = useRoute(auth, setAuth)

    return (<>  
     <NavigationContainer>
      {routing}
     </NavigationContainer> 
     </>
    );
  }

  