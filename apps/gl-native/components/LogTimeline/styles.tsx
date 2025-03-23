import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    errorItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        height: '100%',
    },
    errorText: {
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

