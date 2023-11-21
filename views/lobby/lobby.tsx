import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
        Text,  
        View, 
        TouchableOpacity } from 'react-native';
import { styles } from './lobbyStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../App';


export default function Lobby(): JSX.Element {
    const [name, setName] = useState("");
    const [bir, setBir] = useState("");
    const [patientDid, setPatientDid] = useState("");
    const [vcs, setVcs] = useState([]);
    const infos = useSelector((state:RootState) => state.infosSetting);
    const navigation = useNavigation();

    const qr = () => {
        navigation.navigate("QrView");
    }

    useEffect(() => {
        AsyncStorage.getItem("name")
        .then(res => {
            if(res !== null)
                setName(res);
        })
        AsyncStorage.getItem("birthday")
        .then(res => {
            if(res !== null)
                setBir(res);
        })


    }, [])

    useEffect(() => {
        for(let i=0; i<infos.length; i++) {
            AsyncStorage.getItem(`${infos[i].store}`)
            .then(res => {
                if(res)
                    axios.post('https://api.dmrs.space:5001/user/issue/vc', {
                        did: patientDid,    // 로그인 시 did 정보 가져와야 함
                        hospital: `${infos[i].title}`
                    })
                    .then(res => {
                        let temp = [...vcs];
                        temp.push(res.data);     // 수정 필요
                        setVcs(temp);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        }
    }, [infos])

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>DID</Text>
            </View>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    onPress={qr}>
                    <View style={styles.card}>
                        <View style={styles.upperCard}>
                            <Text style={styles.cardTitle}>DID QR 코드</Text>
                        </View>
                        
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardText1}>이름</Text>
                                <Text style={styles.cardText2}>{name}</Text>
                                <Text style={styles.cardText1}>출생일</Text>
                                <Text style={styles.cardText2}>{bir}</Text>
                            </View>
                        
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}