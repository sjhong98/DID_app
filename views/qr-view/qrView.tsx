import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './qrViewStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function QrView(): JSX.Element {
    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    const [jwt, setJwt] = useState("");
    const [qr, setQr] = useState("LOADING");
    const [timer, setTimer] = useState(15);
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();

    // http://api.dmrs.space:5003/qr/link

    useEffect(() => {
        AsyncStorage.setItem("jwt", "TEST");
        AsyncStorage.getItem("jwt")
        .then(res => {
            setJwt(res);
        })
        // AsyncStㄴorage.getItem("name")
        // .then(res => {
        //     if(res !== null)
        //         setName(res);
        // })
        // AsyncStorage.getItem("email")
        // .then(res => {
        //     if(res !== null)
        //         setEmail(res);
        // })
        // const temp = jwt + " " + name + " " + email;
        
        axios.post("https://api.dmrs.space:5003/qr/link", {jwt:"다음 테스트"})
        .then(res => {
            console.log(res.data.link);
            setQr(res.data.link);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        setInterval(() => {
            setTimer(timer => timer-1);
        }, 1000);

        // setTimeout(() => {
        //     navigation.navigate("MainScreen", { screen: 'Lobby' });
        // }, 15000);
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
                    value={qr}
                    size={150}
                />
            </View>

            <TouchableOpacity 
                onPress={() => {navigation.navigate("InfoSetting")}}
                style={styles.setting}
            >
                <Ionicons 
                    name="list" 
                    size={30} 
                    color="black" 
                />
                <Text>정보 제공 설정</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  }