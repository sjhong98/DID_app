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
        socket.emit('login', {email: "test", media: "mobile"});
    }, [])

    const onSuccess = (e:any) => {
        const test = "test 홍승재 eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Imlzc3VlciI6eyJuYW1lIjoiTWVkaWNhbCBSZWNvcmQgTWFuYWdlbWVudCBBc3NvY2lhdGlvbiIsImFkZHJlc3MiOiIweDNGZTdEQjQ3MDcyMDBlY0RlN2Q0Nzg4YjgwNWYyMjU2RTNiQzQ4NjcifSwidXNlckluZm8iOnsibmFtZSI6IiIsImVtYWlsIjoiIiwiYmlydGhkYXkiOiIiLCJwaG9uZU51bWJlciI6IiIsImlzRG9jdG9yIjpmYWxzZSwiYWRkcmVzcyI6IjB4NjFkNDc4MzA2YWU1Rjk1NmI2RWJGNTQzMzUxRDU3ODQ5MzhEMjExRSJ9LCJtZWRpY2FsUmVjb3JkcyI6IjRmNTNjZGExOGMyYmFhMGMwMzU0YmI1ZjlhM2VjYmU1ZWQxMmFiNGQ4ZTExYmE4NzNjMmYxMTE2MTIwMmI5NDUiLCJkb2N0b3JMaWNlbnNlIjpmYWxzZX19LCJzdWIiOnsiZGlkIjoiZGlkOmV0aHI6Z29lcmxpOjB4NjFkNDc4MzA2YWU1Rjk1NmI2RWJGNTQzMzUxRDU3ODQ5MzhEMjExRSIsImFkZHJlc3MiOiIweDYxZDQ3ODMwNmFlNUY5NTZiNkViRjU0MzM1MUQ1Nzg0OTM4RDIxMUUifSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4RTk0QTM2RjBENDFjNDhGZDZkMjQyRGY2QzhEZDgyQzI1NzU4YkE4MSJ9.GNZ6AUQoSdBkblvmDSgVazLenlhDjfX3LhCG3ikpI14grsOe3-yYyjUkyaxHAKOVezwo7ZDhck61Znc2WdqblgE"
        const splittedData = test.split(" ");
        socket.emit('qr-atos', {
                email: splittedData[0], 
                name: splittedData[1],
                jwt: splittedData[2]})
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

