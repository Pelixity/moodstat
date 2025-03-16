import { StyleSheet } from 'react-native';

const styles = {
    day: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        maxWidth: '14.29%',
        padding: 6,
    },
    moodRatingContainer: {
        width: 44,
        height: 44,
        backgroundColor: 'rgb(52, 211, 153)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderRadius: 4,
    },
    moodRating: {
        fontWeight: 'bold',
        fontSize: 20, 
    },
    dayText: {
        color: 'rgb(115, 115, 115)',
        textAlign: 'center',
    },
    todayText: {
        fontWeight: 'bold',
        paddingHorizontal: 8,
        color: 'rgb(186, 230, 253)',
        borderRadius: '25%',
        backgroundColor: 'rgb(2, 133, 199)',
    },
    today: {
        color: 'rgb(2, 133, 199)',
        borderColor: 'rgb(2, 133, 199)',
        borderWidth: 2,
    },
};

export default StyleSheet.create(styles);
