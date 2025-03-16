import { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import useService from '@/hooks/useService';
import { LogTimeline } from '@/components/LogTimeline';
import { getDateComponents } from '@/utilities/date-time';

export default function SummaryScreen() {
    const localService = useService('LOCAL');
    const [response, setResponse] = useState({ data: {}, error: undefined });
    const { day, month, year } = useLocalSearchParams();
    // TODO: there's gonna be a bug for january since its index is 0
    const dayToUse = useMemo(() => 
        !day || !month || !year ? new Date() : new Date(year, month, day),
    [day, month, year]);

    // TODO: either replace this with something like useQuery or come up
    // with some caching mechanism and also query for the previous and next
    // month (prefetch)
    useFocusEffect(
        useCallback(() => {
            const fetchLogsForDay = async () => {
                const response = await localService.getMoodRatingForDay(dayToUse);
                setResponse(response);
            };
            fetchLogsForDay();
        }, [dayToUse]),
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.pageTitle}>{getDateComponents(dayToUse, ['month', 'day'])}</Text>
                <ScrollView style={styles.logTimelineWrapper}>
                    <LogTimeline items={response.data.logsForDay ?? []} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    logTimelineWrapper: {
        height: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    pageTitle: {
        paddingHorizontal: 24,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});
