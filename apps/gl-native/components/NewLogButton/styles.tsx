import { StyleSheet } from 'react-native';

const styles = {
    logButton: {
        flex: 0,
        display: 'flex',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(2, 133, 199)',
        borderRadius: '50%',
        shadowColor: 'rgb(12, 74, 110)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.75,
    },
};

export default StyleSheet.create(styles);
