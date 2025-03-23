import { MoodResponse } from '@/services/local';
import type { MoodDetail } from '@/types/Mood';
import { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import useService from '@/hooks/useService';
import { LogTimeline } from '@/components/LogTimeline';
import { isEmptyArray } from '@/utilities/collection';
import { isNullish } from '@/utilities/nullish';
import { getDateComponents } from '@/utilities/date-time';

export default function SummaryScreen() {
    const localService = useService('LOCAL');
    const [response, setResponse] = useState<MoodResponse<MoodDetail[]> | null>(null);
    const { day, month, year } = useLocalSearchParams();
    const dayToUse = useMemo(() => {
        if (isNullish(day) || isNullish(month) || isNullish(year)) {
            return new Date();
        }
        const dayNumber = Number(day);
        const monthNumber = Number(month);
        const yearNumber = Number(year)
        return new Date(yearNumber, monthNumber, dayNumber);
    }, [day, month, year]);

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

    // TODO: handle errors in data fetching
    if (response?.error) {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.pageTitle}>
                        {getDateComponents(dayToUse, ['month', 'day'])}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.pageTitle}>{getDateComponents(dayToUse, ['month', 'day'])}</Text>
                <ScrollView style={styles.logTimelineWrapper} contentContainerStyle={!response?.data?.length && { alignItems: 'center', height: '80%' }} scrollEnabled={!!response?.data?.length}>
                    <LogTimeline items={response?.data ?? []} />
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
