import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './QrScanStyle';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import io from 'socket.io-client';


export default function QrScan(): JSX.Element {
    const socket = io.connect('http://localhost:3001', {
        cors: { origin: '*' },
        reconnection: true, // 자동 재연결 활성화
        reconnectionAttempts: 10, // 최대 재연결 시도 횟수
        reconnectionDelay: 500, // 재연결 시도 간격
    });

    useEffect(() => {
        // AsyncStorage.getItem('email')
        // .then(res => {
        //     socket.emit('login', email);
        // })
        socket.emit('login', {email: "test", media: "mobile"});
    }, [])

    const onSuccess = (e:any) => {
        socket.emit('qr-atos', {email: "test", jwt: "jwtTest"})
    }

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.header}>
                <Text style={styles.headerText}>QR 스캔</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text>QrScan</Text>
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

