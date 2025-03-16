import { StyleSheet } from 'react-native';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        marginBottom: 16,
    },
    ratingLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'start',
        marginBottom: 24,
    },
    ratingInput: {
        borderRadius: 8,
        fontSize: 64,
        backgroundColor: 'rgb(231, 229, 228)',
        alignSelf: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        shadowColor: 'rgb(31, 41, 55)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        width: '40%',
        maxWidth: '200',
        borderWidth: 2,
        borderColor: 'rgb(168, 162, 158)',
    },
    error: {
        borderColor: 'rgb(239, 68, 68)',
    },
    errorText: {
        color: 'rgb(239, 68, 68)',
    },
};

export default StyleSheet.create(styles);
