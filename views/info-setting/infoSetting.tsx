import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Switch, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './infoSettingStyle';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { setInfosSetting } from '../../redux/actions';
import { RootState } from '../App';
import { useDispatch } from 'react-redux';

export default function InfoSetting(): JSX.Element {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tempInfo = useSelector((state:RootState) => state.infosSetting);
    const [infos, setInfos] = useState([]);

    const toggleSwitch = (res:String, store:String) => {
        const temp = [...infos];
        const finding = temp.find((item => res===item.title));
        finding.isEnable = !finding.isEnable;
        AsyncStorage.setItem(`${store}`, JSON.stringify(finding.isEnable));
        setInfos(temp);
    }

    useEffect(() => {
        setInfos(tempInfo);
        console.log("at infoSetting : ", tempInfo);
    }, [tempInfo]);

    const handleSave = () => {
        dispatch(setInfosSetting(infos));
        navigation.navigate('QrView')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>정보 제공 설정</Text>
            </View>
            <ScrollView style={styles.body}>
                <View style={styles.checkBox}>
                    <Text style={styles.infoText}>신원정보</Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{false: '#FFFFFF', true: '#3283E5'}}
                        thumbColor={'white'}
                        ios_backgroundColor="#CCC"
                        value={true}
                    />
                </View>
                { infos ? infos.map((item, index) => {
                    return(
                        <View key={index} style={styles.checkBox}>
                            <Text style={styles.infoText}>{item.title}</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{false: '#FFFFFF', true: '#3283E5'}}
                                thumbColor={'white'}
                                ios_backgroundColor="#CCC"
                                onValueChange={() => {toggleSwitch(item.title, item.store)}}
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
                    onPress={handleSave}
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