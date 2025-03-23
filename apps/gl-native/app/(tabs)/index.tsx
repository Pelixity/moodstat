import type { Calendar as CalendarType } from '@/types/Calendar';
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useErrorStore from '@/store/ErrorStore';
import useService from '@/hooks/useService';
import { Toast } from '@/components/Toast';
import { Calendar } from '@/components/Calendar';
import { getDateComponents } from '@/utilities/date-time';

export default function HomeScreen() {
    const toastError = useErrorStore(state => state.toastError);
    const [today, setToday] = useState<Date>(new Date());
    const [calendarData, setCalendarData] = useState<CalendarType | null>(null);
    // TODO: display errors in a consistent way
    const [errors, setErrors] = useState(null);
    const localService = useService('LOCAL');
    const currentDateString = getDateComponents(today, ['month', 'year']);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // TODO: either replace this with something like useQuery or come up
    // with some caching mechanism and also query for the previous and next
    // month (prefetch)
    useFocusEffect(
        useCallback(() => {
            const fetchCalendar = async () => {
                const { data, error } = await localService.getMonthlyMoodSummary(currentMonth, currentYear);
                if (!error) {
                    setCalendarData(data);
                    setErrors(null);
                } else {
                    setErrors(error);
                }
            };
            fetchCalendar();
        }, [currentMonth, currentYear, localService]),
    );

    return (
        <SafeAreaView style={styles.page}>
            <View id="home-calendar" style={styles.container}>
                <Text style={styles.title}>{currentDateString}</Text>
                <Calendar
                    month={currentMonth}
                    year={currentYear}
                    calendarData={calendarData ?? {}}
                />
                {!!toastError && <Toast message={toastError} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flex: 1,
        width: '100%',
    },
    container: {
        display: 'flex',
        flex: 1,
        width: '100%',
        paddingTop: 24,
        paddingRight: 20,
        paddingBottom: 24,
        paddingLeft: 20,
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
});

