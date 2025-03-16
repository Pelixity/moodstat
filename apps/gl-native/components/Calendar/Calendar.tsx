import { View, Text } from 'react-native';
import { CalendarWeek } from '@/components/CalendarWeek';
import { createCalendarStructure } from '@/utilities/date-time';
import { WEEK_DAY_ABBREVIATIONS } from '@/constants/DateTime';
import styles from './styles';

type Props = {
    month: number;
    year: number;
    calendarData: Calendar;
}

export default function MoodCalendar({ month, year, calendarData }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.weekHeader}>
                {WEEK_DAY_ABBREVIATIONS.map(dayLabel => (
                    <Text key={`daylabel-${dayLabel}`} style={styles.weekDayLabel}>
                        {dayLabel}
                    </Text>
                ))}
            </View>
            {Object.values(calendarData).map((week, index) => (
                <CalendarWeek 
                    key={`week-${year}-${month}-${index}`} 
                    daysInWeek={week} 
                    isFirstWeek={index === 0}
                    month={month}
                    year={year}
                />
            ))}
        </View>
    );
}

