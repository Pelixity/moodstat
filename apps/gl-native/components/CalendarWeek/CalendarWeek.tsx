import type { CalendarItem } from '@/types/CalendarItem';
import { View } from 'react-native';
import { CalendarDay } from '@/components/CalendarDay';
import styles from './styles';

type Props = {
    daysInWeek: CalendarItem[];
    isFirstWeek: boolean;
    month: number;
    year: number;
};

export default function CalendarWeek({ isFirstWeek, daysInWeek, month, year }: Props) {
    return (
        <View style={[styles.week, { justifyContent: !isFirstWeek ? 'flex-start' : 'flex-end' }]}> 
            {daysInWeek.map(day => (
                <CalendarDay
                    key={`day-${day.dayNumber}`}
                    dayNumber={day.dayNumber}
                    mood={day.mood}
                    isToday={day.isToday}
                    month={month}
                    year={year}
                />
            ))}
        </View>
    );
};
