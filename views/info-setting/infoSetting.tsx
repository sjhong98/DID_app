import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Switch, ScrollView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './infoSettingStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../App';

export default function InfoSetting(): JSX.Element {
    const navigation = useNavigation();
    const tempInfo = useSelector((state:RootState) => state.infosSetting);
    const [infos, setInfos] = useState([]);

    const toggleSwitch = (res:any) => {
        const temp = [...infos];
        const finding = temp.find((item => res===item.title));
        finding.isEnable = !finding.isEnable;
        setInfos(temp);
    }

    useEffect(() => {
        setInfos(tempInfo);
        console.log(tempInfo);
    }, [tempInfo]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>정보 제공 설정</Text>
            </View>
            <ScrollView style={styles.body}>
                { infos ? infos.map((item, index) => {
                    return(
                        <View key={index} style={styles.checkBox}>
                            <Text style={styles.infoText}>{item.title}</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{false: '#FFFFFF', true: '#3283E5'}}
                                thumbColor={'white'}
                                ios_backgroundColor="#CCC"
                                onValueChange={() => {toggleSwitch(item.title)}}
                                value={item.isEnable}
                            />
                        </View>
                    )
                }) : <Text>Loading</Text>
                }

            </ScrollView>
            <View style={styles.saveBtnContainer}>
                <TouchableOpacity 
                    style={styles.saveBtn}
                    onPress={() => {navigation.navigate('QrView')}}
                >
                    <Text style={styles.saveBtnFont}>저장</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={handleInit}
                >
                    <Text>InitAsyncStorage</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}