import { StyleSheet } from 'react-native';

const styles = {
    descriptionContainer: {
        width: '100%',
        height: 'auto',
        maxHeight: '35%',
        paddingBottom: 12,
        gap: 12,
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionInput: {
        height: '100%',
        overflow: 'auto',
        padding: 12,
        fontSize: 18,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgb(168, 162, 158)',
        backgroundColor: 'rgb(231, 229, 228)',
        shadowRadius: 4,
    },
    error: {
        borderColor: 'rgb(239, 68, 68)',
    },
    errorText: {
        color: 'rgb(239, 68, 68)',
    },
};

export default StyleSheet.create(styles);
