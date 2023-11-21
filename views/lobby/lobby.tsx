import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, 
        Text,  
        View, 
        TouchableOpacity } from 'react-native';
import { styles } from './lobbyStyle';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../App';
import { setJwt } from '../../redux/actions';


export default function Lobby(): JSX.Element {
    const [name, setName] = useState("");
    const [bir, setBir] = useState("");
    const [patientDid, setPatientDid] = useState("");
    const [vcs, setVcs] = useState([]);
    const [did, setDid] = useState({});
    const infos = useSelector((state:RootState) => state.infosSetting);
    const navigation = useNavigation();
    const dispatch = useDispatch();

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
        AsyncStorage.getItem("did")
        .then(res => {
            setDid(res);
        })
    }, [])

    useEffect(() => {
        let temp = [...vcs];
        console.log("===== issue/vc =====");
        for(let i=0; i<infos.length; i++) {
            AsyncStorage.getItem(`${infos[i].store}`)
            .then(res => {
                if(JSON.parse(res)){
                    console.log(infos[i].title)
                    axios.post('https://api.dmrs.space:5001/user/issue/vc', {
                        did: did,  
                        hospital: `${infos[i].title}`
                    })
                    .then(res => {
                        console.log(res);
                        temp.push(res.data);     // 수정 필요
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
        }
        setVcs(temp);
    }, [infos, did])

    useEffect(() => {
        console.log("===== issue/vp =====", vcs);
        axios.post('https://api.dmrs.space:5001/user/issue/vp', {
            vcJwts: vcs
        })
        .then(res => {
            console.log(res);
            dispatch(setJwt(res.data));  // 수정 필요
        })
    }, [vcs]);

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