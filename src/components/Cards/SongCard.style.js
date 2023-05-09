import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F725856E',
        padding: 15
    },
    iconContainer: {
        marginRight: 10,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50
    },
    textContainer: {
        flexDirection: 'column'
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    subText: {
        fontSize: 16,
        color: 'white' // Use a muted color for the sub-text
    }
});

export default styles;
