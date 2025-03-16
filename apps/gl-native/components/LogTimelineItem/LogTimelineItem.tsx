import type { MoodDetail } from '@/types/Mood';
import { View, Text } from 'react-native';
import { getHSLFromRating } from '@/utilities/colors';
import styles from './styles';

type LogTimelineItemProps = Omit<MoodDetail, 'created_at'> & {
    createdAt: number;
}

export default function LogTimelineItem({ id, color, mood, description, createdAt}: LogTimelineItemProps) {
    // TODO: extract this to helper (refactor)
    const time = new Date(createdAt * 1000);
    const hours = time.getHours() % 12 !== 0 ? time.getHours() % 12 : 12;
    const minutes = time.getMinutes() > 9 ? `${time.getMinutes()}` : `0${time.getMinutes()}` ; 
    const amPM = time.getHours() >= 12 ? 'pm' : 'am';
    const isDescriptionProvided = !!description.length;
    return (
        <View style={styles.container}>
            <View style={styles.detailsWrapper}>
                <View style={[styles.mood, { backgroundColor: getHSLFromRating(mood) }]}>
                    <Text style={styles.moodText}>{mood}</Text>
                </View>
                <Text
                    style={[styles.description, !isDescriptionProvided && styles.noDescription]}
                >
                    {isDescriptionProvided ? description : 'No description'}
                </Text>
            </View>
            <View style={styles.timeIndicator}>
                <Text style={styles.time}>{`${hours}:${minutes}${amPM}`}</Text>
            </View>
        </View>
    );
};
