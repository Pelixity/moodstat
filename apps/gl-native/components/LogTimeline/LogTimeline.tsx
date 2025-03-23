import type { MoodDetail } from '@/types/Mood';
import { View, Text } from 'react-native';
import { LogTimelineItem } from '@/components/LogTimelineItem';
import { Icon } from '@/components/Icon';
import { isEmptyArray } from '@/utilities/collection';
import styles from './styles';

type LogTimelineProps = {
    items: MoodDetail[];
}

export default function LogTimeline({ items }: LogTimelineProps) {
    if (isEmptyArray(items)) {
        return (
            <View style={styles.errorItem}>
                <Icon size={24} color="black" name="frown" />
                <Text style={styles.errorText}>
                    No Logs were made for this day
                </Text>
            </View>
        );
    }

    return (
        <View>
            {items.map(item => (
                <LogTimelineItem
                    key={`log-item-${item.id}`}
                    id={item.id}
                    mood={item.mood}
                    description={item.description}
                    color={item.color}
                    createdAt={item.created_at}
                />
            ))}
        </View>
    );
}
