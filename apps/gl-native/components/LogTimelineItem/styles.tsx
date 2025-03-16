import { StyleSheet } from 'react-native';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 16,
    },
    timeIndicator: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    time: {
        fontStyle: 'italic',
        opacity: 0.75,
    },
    detailsWrapper: {
        flex: 2,
        backgroundColor: 'rgb(255, 255, 255)',
        display: 'flex',
        gap: 12,
        paddingHorizontal: 8,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    mood: {
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: '50%',
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moodText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    description: {
        flex: 1,
    },
    noDescription: {
        fontStyle: 'italic',
        opacity: 0.5,
    },
};

export default StyleSheet.create(styles);
