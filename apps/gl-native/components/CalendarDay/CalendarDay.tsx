import type { CalendarItem } from '@/types/Calendar';
import { useEffect, useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import { useRouter, type RelativePathString } from 'expo-router';
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { setToastError } from '@/store/ErrorStore/actions';
import { getHSLFromRating } from '@/utilities/colors';
import styles from './styles';

type CalendarDayProps = CalendarItem & {
    month: number;
    year: number;
}

export default function CalendarDay({ dayNumber, mood = { averageMood: 0 }, isToday = false, month, year }: CalendarDayProps) {
    const router = useRouter();
    const opacity = useSharedValue<number>(0);
    const { averageMood } = mood; 
    const wasMoodLogged = averageMood !== 0;
    const fixedAmount = averageMood !== 10 ? 1 : 0;
    const hslColor = getHSLFromRating(averageMood);
    const moodRatingContainerStyling = [
        styles.moodRatingContainer,
        {
            backgroundColor: wasMoodLogged ? hslColor : 'rgb(115, 115, 115)',
            opacity: wasMoodLogged ? 1 : 0.25,
        },
    ];
    const animatedStyle = { opacity };
    const summaryURL = `./summary?year=${year}&month=${month}&day=${dayNumber}` as RelativePathString;

    useEffect(() => {
        opacity.value = withDelay(dayNumber * 25, withTiming(1));
    }, []);

    const handleOnPress = useCallback(() => {
        const currentTime = new Date();
        if (year >= currentTime.getFullYear() && month >= currentTime.getMonth()) {
            if (currentTime.getMonth() > month || dayNumber > currentTime.getDate()) {
                setToastError('That day is in the future');
                return;
            }
        };
        router.push(summaryURL);
    }, [router]);
    
    return (
        <Animated.View style={[styles.day, animatedStyle]}>
            <Pressable onPress={handleOnPress} style={moodRatingContainerStyling}>
                {averageMood !== 0 && (
                    <Text style={styles.moodRating}>{averageMood.toFixed(fixedAmount)}</Text>
                )}
            </Pressable>
            <Text style={[styles.dayText, { ...(isToday && styles.todayText) }]}>{dayNumber}</Text>
        </Animated.View>
    );
}
