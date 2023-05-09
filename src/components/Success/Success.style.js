import { StyleSheet } from 'react-native';
import { horizontalPaddingValue, verticalPaddingValue } from '../../constants/Spacing';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    gradient: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: horizontalPaddingValue,
        paddingVertical: verticalPaddingValue
    },
    image: {
        marginTop: '40%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default styles;
