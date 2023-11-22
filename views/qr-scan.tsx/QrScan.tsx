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

    const onSuccess = (e:any) => {
        const test = "test 홍승재 eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwiaG9zcGl0YWwiOiLshJzsmrjrs5Hsm5AiLCJtZWRpY2FsUmVjb3JkcyI6W119fSwic3ViIjoie1wiZGlkXCI6XCJkaWQ6ZXRocjpnb2VybGk6MHgyQ0IxNzVBOTcyMDMwNjQzQjhkMmYxNjlFMzUxZTM5MzcwMmE4ODZhXCIsXCJhZGRyZXNzXCI6XCIweDJDQjE3NUE5NzIwMzA2NDNCOGQyZjE2OUUzNTFlMzkzNzAyYTg4NmFcIn0iLCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHg1ZEQ3MDU2MUQ0MjRFNDQxYzYwODIyMDJENkU2NDE2RjdmZkMwMTA5In0._4F0xGeyckEI_sG1uDhL3n2kekpxnQgCTN7lf2jAtQQsYZGbc5rVjtySV4IUubVvv7Qbr9GgL5Lt4Njk3cS75wA"
        const splittedData = test.split(" ");
        console.log(splittedData[2]);
        axios.post('https://api.dmrs.space:5003/link/generate', {
            payload: splittedData[2]
        })
        .then(res => {
            console.log("===== QRSCAN =====\n", res.data.link);
        })
        .catch(err => {
            console.log("===== QRSCAN ERROR =====\n", err);
        })
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

