import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './qrViewStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function QrView(): JSX.Element {
    const [jwt, setJwt] = useState(".");
    const [timer, setTimer] = useState(15);
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
        .then(res => {
            if(res !== null)
                setJwt(res);
        })
    }, [])

    useEffect(() => {
        setInterval(() => {
            setTimer(timer => timer-1);
        }, 1000);

        setTimeout(() => {
            navigation.navigate("MainScreen", { screen: 'Lobby' });
        }, 15000);
    }, []);

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
                <TouchableOpacity
                        onPress={() => navigation.navigate("MainScreen", { screen: 'Lobby' })}>
                    <Ionicons 
                    style={styles.arrowBack}
                      name="arrow-back" 
                      size={30} 
                      color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                
                
                <Text style={styles.timer} >{timer}초 남았습니다</Text>
                <QRCode
                    value={jwt}
                    size={150}
                />
            </View>
        </SafeAreaView>
    );
  }