import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './qrViewStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setInfosSetting } from '../../redux/actions';

export default function QrView(): JSX.Element {
    const [jwt, setJwt] = useState("");
    const [qr, setQr] = useState("LOADING");
    const [timer, setTimer] = useState(15);
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();
    const dispatch = useDispatch();
    const [infos, setInfos] = useState([
        {title:'서울병원', isEnable: null, store: "seoul"}, 
        {title:'인천병원', isEnable: null, store: "incheon"}, 
        {title:'경기병원', isEnable: null, store: "gyeonggi"},
        {title:'충남병원', isEnable: null, store: "chungnam"},
        {title:'부산병원', isEnable: null, store: "busan"},
    ])

    // http://api.dmrs.space:5003/qr/link


    useEffect(() => {   // infos 업뎃 뒤에 axios
        dispatch(setInfosSetting(infos));

        axios.post("https://api.dmrs.space:5003/qr/link", {jwt:"다음 테스트"})
        .then(res => {
            console.log(res.data.link);
            setQr(res.data.link);
        })
        .catch(err => {
            console.log(err);
        })
    }, [infos])

    useEffect(() => {
        const fetchData = async () => {     // AsyncStorage 동기방식 작동
            let temp = [...infos];

            for(let i=0; i<5; i++) {
                await AsyncStorage.getItem(temp[i].store)
                .then(res => {
                    temp[i].isEnable = JSON.parse(res);
                })
            }
            setInfos(temp);
        }
        fetchData();
    }, [])

    useEffect(() => {
        setInterval(() => {
            setTimer(timer => timer-1);
        }, 1000);

        // setTimeout(() => {
        //     navigation.navigate("MainScreen", { screen: 'Lobby' });
        // }, 15000);       // 시간 지나면 리다이렉트
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