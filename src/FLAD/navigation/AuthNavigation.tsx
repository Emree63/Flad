import Navigation from './Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartNavigation from './StartNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ChangeMode, getRefreshToken } from '../redux/thunk/authThunk';
import * as Location from 'expo-location';
import SpotifyService from '../services/spotify/spotify.service';
import { getCurrentUserMusic } from '../redux/thunk/spotThunk';
import Music from '../Model/Music';

export default function AuthNavigation() {
  //@ts-ignore
  const tokenProcesed: boolean = useSelector(state => state.userReducer.loading);
  //@ts-ignore
  const isLogin: boolean = useSelector(state => state.userReducer.isLogedIn);
  //@ts-ignore
  const currentMusic: Music = useSelector(state => state.appReducer.userCurrentMusic);

  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  const [location, setLocation] = useState<Location.LocationObject>();
  const [setErrorMsg] = useState('');

  async function prepare() {
    //@ts-ignore
    await dispatch(getRefreshToken())
    if (tokenProcesed && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }

  async function ChangeDarkMode() {
    try {
      const currentValue = await AsyncStorage.getItem('dark');
      if (currentValue !== null) {
        const newValue = JSON.stringify(JSON.parse(currentValue));
        dispatch(ChangeMode(JSON.parse(newValue)))
      }
    } catch (error) {
      console.log(`Une erreur s'est produite lors de la mise à jour de la valeur booléenne pour la clé 'dark': `, error);
    }
  }

  useEffect(() => {
    ChangeDarkMode();
    prepare();
  }, [appIsReady, tokenProcesed]);
  useEffect(() => {

    const sendLocationUpdate = async () => {
      try {
        //@ts-ignore
        await dispatch(getCurrentUserMusic(theService))
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status == 'granted') {
          console.log(appIsReady)
          if (true) {// should app is ready 
            const locationresp = await Location.getCurrentPositionAsync({});
            setLocation(locationresp);
            // send location to server
            console.log(locationresp);
            console.log(location);
            const body: Record<string, string | boolean | number | (string | boolean | number)[]> = {
              longitude: locationresp.coords.longitude,
              latitude: locationresp.coords.latitude,
              currentMusic: currentMusic.id
            }
          }
        }
        else {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(sendLocationUpdate, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (tokenProcesed == false) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={() => setAppIsReady(true)}>
      {isLogin ? (
        <Navigation />
      ) :
        <Navigation />
      }
    </SafeAreaProvider>
  )
}

const theService = new SpotifyService('BQC0rAGJvxTt4-24P-nda6qP9iXYCql2eApnUAoEbZZkKemJ11cU3Nx-I_tKVX0FwEgFbIbSIuaVvxOapRVJq2z1Htyy3XQ5jIYNsrhrnp3KTCfppamAjxgDTf6khBrNGTxe6CNKBsMhc5IRnphey5Td2zJPvGMwnFFfMQdCtVAVsCNK7kPKlCAaf_kRMAoPn30Qk4RD45XmwtZIwQg7X0J4beGuHSiBf0MRjhsnFEW89GxVm8YuIVwgrDbF3izfPR0AlqS4IMJT5m4pEA72lYEwp1JnSDVsafILzmksaqG-11H3WAsWIENrOIu_j7qNgbvYwmUWXOrYmeWBkQ');

