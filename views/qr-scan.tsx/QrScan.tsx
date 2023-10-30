import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { Image, 
        SafeAreaView, 
        ScrollView, 
        StatusBar, 
        StyleSheet, 
        Text, 
        useColorScheme, 
        View, 
        TouchableOpacity } from 'react-native';
import { styles } from './QrScanStyle';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


export default function QrScan(): JSX.Element {
    const navigation = useNavigation();
cd
    const onSuccess = (e:any) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
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
            </View>
        </SafeAreaView>
    )

}

