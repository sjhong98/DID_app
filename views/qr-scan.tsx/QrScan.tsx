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

        setMsg("");
    }, []);

    const onSuccess = () => {  
        let temp = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbHpjM1ZsY2lJNmV5SnVZVzFsSWpvaVRXVmthV05oYkNCU1pXTnZjbVFnVFdGdVlXZGxiV1Z1ZENCQmMzTnZZMmxoZEdsdmJpSXNJbUZrWkhKbGMzTWlPaUl3ZUROR1pUZEVRalEzTURjeU1EQmxZMFJsTjJRME56ZzRZamd3TldZeU1qVTJSVE5pUXpRNE5qY2lmU3dpZFhObGNrbHVabThpT25zaWJtRnRaU0k2SXUyWm1PeWVrQ0lzSW1WdFlXbHNJam9pYzJWdkxXMXBibk5sYjJ0QVpHRjFiUzV1WlhRaUxDSmlhWEowYUdSaGVTSTZJakF3TURFd01TSXNJbkJvYjI1bFRuVnRZbVZ5SWpvaU1ERXdMVE00TWprdE1UQXlNaUlzSW1selJHOWpkRzl5SWpwMGNuVmxMQ0poWkdSeVpYTnpJam9pTUhneVEwSXhOelZCT1RjeU1ETXdOalF6UWpoa01tWXhOamxGTXpVeFpUTTVNemN3TW1FNE9EWmhJbjBzSW0xbFpHbGpZV3hTWldOdmNtUnpJam9pTkdZMU0yTmtZVEU0WXpKaVlXRXdZekF6TlRSaVlqVm1PV0V6WldOaVpUVmxaREV5WVdJMFpEaGxNVEZpWVRnM00yTXlaakV4TVRZeE1qQXlZamswTlNJc0ltUnZZM1J2Y2t4cFkyVnVjMlVpT21aaGJITmxmWDBzSW5OMVlpSTZleUprYVdRaU9pSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3lRMEl4TnpWQk9UY3lNRE13TmpRelFqaGtNbVl4TmpsRk16VXhaVE01TXpjd01tRTRPRFpoSWl3aVlXUmtjbVZ6Y3lJNklqQjRNa05DTVRjMVFUazNNakF6TURZME0wSTRaREptTVRZNVJUTTFNV1V6T1RNM01ESmhPRGcyWVNKOUxDSnBjM01pT2lKa2FXUTZaWFJvY2pwbmIyVnliR2s2TUhnelpUY3dNemt5T1dNMll6UXhZakF3Wm1KaE0wRkNNelUxUm1NMU9VVXpORUUzTVRRM01URkdJbjAuc1pyTWExck96YkRKRG1xQ3hFcDE1bEpvRjQwbURRZGZWODNQY1Nfbldoa1Npcy1HV0NabzFaaGpWLUtjRDlsbzFNdGp1dFJwdnRLUGlNQmYwYkpKTndBIiwiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbHpjM1ZsY2lJNmV5SnVZVzFsSWpvaVRXVmthV05oYkNCU1pXTnZjbVFnVFdGdVlXZGxiV1Z1ZENCQmMzTnZZMmxoZEdsdmJpSXNJbUZrWkhKbGMzTWlPaUl3ZUROR1pUZEVRalEzTURjeU1EQmxZMFJsTjJRME56ZzRZamd3TldZeU1qVTJSVE5pUXpRNE5qY2lmU3dpYUc5emNHbDBZV3dpT2lMc2hKenNtcmpyczVIc201QWlMQ0p0WldScFkyRnNVbVZqYjNKa2N5STZXM3NpYUc5emNHbDBZV3dpT2lMc2hKenNtcmpyczVIc201QWlMQ0prYmlJNkl1MlpqZXV3bGV5Q3JDSXNJbVIySWpvaU1qQXlNeTh4TVM4eU5TSXNJbWhwSWpvaTdKV1VJaXdpY0dnaU9pTHJzTEh0bUlqcnM1RWlMQ0p0WlNJNkl1MlZyZXlEbmV5Z25DSXNJbUZzSWpvaTZyQ1I2ckNCNjZXWUlpd2laR2tpT2lMc2dxenJwNTBpTENKMGNpSTZJdXV6dGVxMXJPdTJpT3F3Z0NJc0ltRmpJam9pN0pXSTdZT0E2cm1kN0lxMTY0dUk2NHVrSW4wc2V5Sm9iM053YVhSaGJDSTZJdXlFbk95YXVPdXprZXlia0NJc0ltUnVJam9pNnJDVjY3Q1Y3SUtzSWl3aVpIWWlPaUl5TURJekx6RXhMekk0SWl3aWFHa2lPaUxzbFpRaUxDSndhQ0k2SXUyZHJPcTNnT3VDbk95NW1PdXprU0lzSW0xbElqb2k3Wld0N0lPZDdLQ2NJaXdpWVd3aU9pTHFzSkhxc0lIcnBaZ2lMQ0prYVNJNkl1eUNyT3VublNJc0luUnlJam9pNjdPMTZyV3M2N2FJNnJDQUlpd2lZV01pT2lMc2xZanRnNERxdVozc2lyWHJpNGpyaTZRaWZWMTlmU3dpYzNWaUlqcDdJbVJwWkNJNkltUnBaRHBsZEdoeU9tZHZaWEpzYVRvd2VESkRRakUzTlVFNU56SXdNekEyTkROQ09HUXlaakUyT1VVek5URmxNemt6TnpBeVlUZzRObUVpTENKaFpHUnlaWE56SWpvaU1IZ3lRMEl4TnpWQk9UY3lNRE13TmpRelFqaGtNbVl4TmpsRk16VXhaVE01TXpjd01tRTRPRFpoSW4wc0ltbHpjeUk2SW1ScFpEcGxkR2h5T21kdlpYSnNhVG93ZUVVM05UZGtOVGhoTlVVMk5tSTNNalZCTUdJME5UaENOVFkwUldSaVl6VXdSVGs1TWpBNU5Ea2lmUS4teWhiOEJublBSdGZLVGhSNmhya0VFWWRpNkVTY1VNMUtzTHZPVHczVnI0bWRUYjF3NFBhQzEzR2JmdnQxNy0tMUhtTVdCbTk2RWdPZTFTd1l2cUJqQUEiLCJleUpoYkdjaU9pSkZVekkxTmtzdFVpSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0pkTENKMGVYQmxJanBiSWxabGNtbG1hV0ZpYkdWRGNtVmtaVzUwYVdGc0lsMHNJbU55WldSbGJuUnBZV3hUZFdKcVpXTjBJanA3SW1semMzVmxjaUk2ZXlKdVlXMWxJam9pVFdWa2FXTmhiQ0JTWldOdmNtUWdUV0Z1WVdkbGJXVnVkQ0JCYzNOdlkybGhkR2x2YmlJc0ltRmtaSEpsYzNNaU9pSXdlRE5HWlRkRVFqUTNNRGN5TURCbFkwUmxOMlEwTnpnNFlqZ3dOV1l5TWpVMlJUTmlRelE0TmpjaWZTd2lhRzl6Y0dsMFlXd2lPaUxzbmJqc3NwenJzNUhzbTVBaUxDSnRaV1JwWTJGc1VtVmpiM0prY3lJNlczc2lhRzl6Y0dsMFlXd2lPaUxzbmJqc3NwenJzNUhzbTVBaUxDSmtiaUk2SXV5WXBPdXdsZXlDckNJc0ltUjJJam9pTWpBeU15OHhNUzh5TUNJc0ltaHBJam9pNnJDUTZyaXdJaXdpY0dnaU9pTHJqNFhxc0pBaUxDSnRaU0k2SXVxd2tPcTRzT3lWdlNJc0ltRnNJam9pN0plRzdKMk1JaXdpWkdraU9pTHNsNGJzbll3aUxDSjBjaUk2SXUyUGtPeW5pTzJabUNJc0ltRmpJam9pTS15ZHZDRHFzcjNxczd3ZzdadUVJT3VDdE95YmtDSjlYWDE5TENKemRXSWlPbnNpWkdsa0lqb2laR2xrT21WMGFISTZaMjlsY214cE9qQjRNa05DTVRjMVFUazNNakF6TURZME0wSTRaREptTVRZNVJUTTFNV1V6T1RNM01ESmhPRGcyWVNJc0ltRmtaSEpsYzNNaU9pSXdlREpEUWpFM05VRTVOekl3TXpBMk5ETkNPR1F5WmpFMk9VVXpOVEZsTXprek56QXlZVGc0Tm1FaWZTd2lhWE56SWpvaVpHbGtPbVYwYUhJNloyOWxjbXhwT2pCNFF6Qm1NV1UxTmpsbFEwWTNORFExUlRnME5UY3hOa0kxT0RRMVJrSkZPVUUwUmpBelJETm1OaUo5LlI3MDVpTlNLck40RjJfQ1puNkcyQ2tsakZ5ZXZGNldMOFFZTmlIMkZGbmM3aDR3SFdpOEVPb2N5OUpQUG9rWFNYQ2VCTnp5Tm4xeHB6RElPOFlSTFVBRSJdfSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4YTQ3RTNlQTYxYjI0MWFlZTJCYkEwYWEzOTBDOGI2QzEzRTZlMThFMCJ9.ACMv-RBHRsp5O0OTQc6Wh1Sqy1OOFjXGvjwQfgVOl9FlQ1cX3AU4RG_dwQKn9j1zYG0DrzvGfURkScng29WNRAE";
        
        axios.post('https://api.dmrs.space:5003/link/generate', {
            payload: temp
        })
        .then(res => {
            console.log("qr로부터 받아온 link : ", res.data.link);
            
            axios.get(`${res.data.link}`)
            .then(res => {
                console.log("link로부터 받아온 vpJwt : ", res.data.payload)
                
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
                {
                    msg === "" ?
                    <View>
                        <QRCodeScanner
                            onRead={onSuccess}
                            flashMode={RNCamera.Constants.FlashMode.torch}
                        />
                        <TouchableOpacity onPress={onSuccess}>
                            <Text>Test</Text>
                        </TouchableOpacity>
                    </ View>
                    :
                    <Text style={styles.text}>{msg}</Text>
                }
            </View>
        </SafeAreaView>
    )

}

