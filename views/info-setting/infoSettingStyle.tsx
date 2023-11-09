import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        display: 'flex',
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 30,
    },

    body: {
        display: 'flex',
        flex: 6,
    },

    checkBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    infoText: {
        marginLeft: 40,
        fontSize: 20
    },

    switch: {
        marginRight: 40
    }
})
