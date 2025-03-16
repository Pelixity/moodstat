import { StyleSheet } from 'react-native';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    weekHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 8,
    },
    weekDayLabel: {
        flex: 1,
        textAlign: 'center',
    },
};

export default StyleSheet.create(styles);
