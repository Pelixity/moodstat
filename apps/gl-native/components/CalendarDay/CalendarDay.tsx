import type { CalendarItem } from '@/types/Calendar';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { getHSLFromRating } from '@/utilities/colors';
import styles from './styles';

type CalendarDayProps = CalendarItem & {
    month: number;
    year: number;
}

export default function CalendarDay({ dayNumber, mood = {}, isToday = false, month, year }: CalendarDayProps) {
    const opacity = useSharedValue<number>(0);
    const { averageMood = 0 } = mood; 
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
    const summaryURL = `/summary?year=${year}&month=${month}&day=${dayNumber}`;

    useEffect(() => {
        opacity.value = withDelay(dayNumber * 25, withTiming(1));
    }, []);
    
    return (
        <Animated.View style={[styles.day, animatedStyle]}>
            <Link href={summaryURL} style={moodRatingContainerStyling}>
                <View style={moodRatingContainerStyling}>
                    {averageMood !== 0 && (<Text style={styles.moodRating}>{averageMood.toFixed(fixedAmount)}</Text>)}
                </View>
            </Link>
            <Text style={[styles.dayText, { ...(isToday && styles.todayText) }]}>{dayNumber}</Text>
        </Animated.View>
    );
}
