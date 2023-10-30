import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        flex: 1,
        justifyContent: "center",
    },

    headerText: {
        fontSize: 50,
        textAlign: "center",
    },

    contentContainer: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },

    timer: {
        fontSize: 20,
        marginBottom: 10,
    },
    
    arrowBack: {
        marginLeft: 10,
        top: -40,
        position: "absolute"
    }
})
