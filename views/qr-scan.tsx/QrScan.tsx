import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './QrScanStyle';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


export default function QrScan(): JSX.Element {
    const [link, setLink] = useState("");
    const [vpJwt, setVpJwt] = useState("");
    const [msg, setMsg] = useState("");
    const [did, setDid] = useState("");
    const patientJwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbHpjM1ZsY2lJNmV5SnVZVzFsSWpvaVRXVmthV05oYkNCU1pXTnZjbVFnVFdGdVlXZGxiV1Z1ZENCQmMzTnZZMmxoZEdsdmJpSXNJbUZrWkhKbGMzTWlPaUl3ZUROR1pUZEVRalEzTURjeU1EQmxZMFJsTjJRME56ZzRZamd3TldZeU1qVTJSVE5pUXpRNE5qY2lmU3dpZFhObGNrbHVabThpT25zaWJtRnRaU0k2SWlJc0ltVnRZV2xzSWpvaUlpd2lZbWx5ZEdoa1lYa2lPaUlpTENKd2FHOXVaVTUxYldKbGNpSTZJaUlzSW1selJHOWpkRzl5SWpwbVlXeHpaU3dpWVdSa2NtVnpjeUk2SWpCNE5qRmtORGM0TXpBMllXVTFSamsxTm1JMlJXSkdOVFF6TXpVeFJEVTNPRFE1TXpoRU1qRXhSU0o5TENKdFpXUnBZMkZzVW1WamIzSmtjeUk2SWpSbU5UTmpaR0V4T0dNeVltRmhNR013TXpVMFltSTFaamxoTTJWalltVTFaV1F4TW1GaU5HUTRaVEV4WW1FNE56TmpNbVl4TVRFMk1USXdNbUk1TkRVaUxDSmtiMk4wYjNKTWFXTmxibk5sSWpwbVlXeHpaWDE5TENKemRXSWlPbnNpWkdsa0lqb2laR2xrT21WMGFISTZaMjlsY214cE9qQjROakZrTkRjNE16QTJZV1UxUmprMU5tSTJSV0pHTlRRek16VXhSRFUzT0RRNU16aEVNakV4UlNJc0ltRmtaSEpsYzNNaU9pSXdlRFl4WkRRM09ETXdObUZsTlVZNU5UWmlOa1ZpUmpVME16TTFNVVExTnpnME9UTTRSREl4TVVVaWZTd2lhWE56SWpvaVpHbGtPbVYwYUhJNloyOWxjbXhwT2pCNFJUazBRVE0yUmpCRU5ERmpORGhHWkRaa01qUXlSR1kyUXpoRVpEZ3lRekkxTnpVNFlrRTRNU0o5LkdOWjZBVVFvU2RCa2Jsdm1EU2dWYXpMZW5saERqZlgzTGhDRzNpa3BJMTRncnNPZTMteVl5alVreWF4SEFLT1ZlendvN1pEaGNrNjFabmMyV2RxYmxnRSIsImV5SmhiR2NpT2lKRlV6STFOa3N0VWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSmRMQ0owZVhCbElqcGJJbFpsY21sbWFXRmliR1ZEY21Wa1pXNTBhV0ZzSWwwc0ltTnlaV1JsYm5ScFlXeFRkV0pxWldOMElqcDdJbWx6YzNWbGNpSTZleUp1WVcxbElqb2lUV1ZrYVdOaGJDQlNaV052Y21RZ1RXRnVZV2RsYldWdWRDQkJjM052WTJsaGRHbHZiaUlzSW1Ga1pISmxjM01pT2lJd2VETkdaVGRFUWpRM01EY3lNREJsWTBSbE4yUTBOemc0WWpnd05XWXlNalUyUlROaVF6UTROamNpZlN3aWFHOXpjR2wwWVd3aU9pTHNoSnpzbXJqcnM1SHNtNUFpTENKdFpXUnBZMkZzVW1WamIzSmtjeUk2VzExOWZTd2ljM1ZpSWpvaWUxd2laR2xrWENJNlhDSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3lRMEl4TnpWQk9UY3lNRE13TmpRelFqaGtNbVl4TmpsRk16VXhaVE01TXpjd01tRTRPRFpoWENJc1hDSmhaR1J5WlhOelhDSTZYQ0l3ZURKRFFqRTNOVUU1TnpJd016QTJORE5DT0dReVpqRTJPVVV6TlRGbE16a3pOekF5WVRnNE5tRmNJbjBpTENKcGMzTWlPaUprYVdRNlpYUm9janBuYjJWeWJHazZNSGc0TXpZeFlURTBNelJFUWpNNVF6STNZakF6TlRreVprSmxObUkzT1RZM01USTBNMkprT1RJNEluMC5vZk1aMm82U1ZvdmhMVlpOZUdrWDN2dEdZTEMzWkpGLTM2UlU1UVAtTkdoUHpJcDM3NHJvY3FnTmg1TmtlMVgtNkxKWmpCN2tjdklDdXVqaTRTWlNwZ0UiXX0sImlzcyI6ImRpZDpldGhyOmdvZXJsaToweGUxM0RiYmMyNDQ5QzM4ODg0Y0ExRTJjYTM5OGRCQzBCZDgwQTk0MjYifQ.pm0nEIipkXZRT7oHxlfro1skuCAtLNg7NHxYREuxdtocbVOFlYl4poSpAKN3qatHVz5wp-vPNqJ3ZHWtKJDakgE"

    useEffect(() => {
        AsyncStorage.getItem("did")
        .then(res => {
            setDid(res);
        })
    }, []);

    const onSuccess = () => {  
        axios.post('https://api.dmrs.space:5003/link/generate', {
            payload: vpJwt
        })
        .then(res => {
            console.log("qr로부터 받아온 link : ", res.data.link);
            setLink(res.data.link);
            
            axios.get(`${res.data.link}`)
            .then(res => {
                console.log("link로부터 받아온 vpJwt : ", res.data.payload)
                setVpJwt(res.data.payload);
                
                axios.post('https://api.dmrs.space:5001/user/record/vp', 
                {
                    vpJwt: res.data.payload,
                    did: did
                })
                .then(res => {
                    console.log("===== record/vp =====\n", res);    
                    setMsg("웹에서 확인하세요");
                })
                .catch(err => {
                    setLink("/record/vp ERROR");
                    console.log(err);
                })
            })
            setLink(res.data.link);
            
        })
        .catch(err => {
            setLink("/link/generate ERROR");
            console.log(err);
        })

    }

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>QR 스캔</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text>QrScan</Text>
                {
                    msg === "" ?
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.torch}
                    />
                    :
                    <Text>{msg}</Text>
                }
                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                />
                <TouchableOpacity onPress={onSuccess}>
                    <Text>Test</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

