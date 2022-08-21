import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import { Socket } from 'socket.io-client';
import socketServices from './src/utils/socketService';


const App = () => {

    const [message, setmessage] = useState('')
    const [data, setData] = useState([])





    useEffect(() => {
        socketServices.initializesocket()
    }, [])


    useEffect(() => {
        socketServices.on('received_message', (msg) => {
            console.log('messgae received in app', msg)
            let cloneArry = [...data]
            setData(cloneArry.concat(msg))

        })
    }, [data])


    const sendMessage = () => {
        if (!!message) {
            socketServices.emit('send_message', message)
            setmessage('')
            return;

        }
        alert("Please Enter Your Message")
    }

    return (
        <SafeAreaView style={{ flex: 3 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.8 }}>
                        <TextInput
                            value={message}
                            placeholder='Enter Your Message'
                            style={styles.inputStyle}
                            onChangeText={text => setmessage(text)} />
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Button onPress={sendMessage} color="#000000" title='Send' />
                    </View>
                </View>
                {data.map((val, i) => {
                    return (
                        <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>{val}</Text>
                    )
                })}

            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 24
    },
    inputStyle: {
        height: 42,
        borderWidth: 3,
        borderRadius: 6,
        paddingHorizontal: 8
    },




});
export default App;