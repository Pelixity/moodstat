import type { MoodDetail } from '@/types/Mood';
import { View } from 'react-native';
import { LogTimelineItem } from '@/components/LogTimelineItem';

type LogTimelineProps = {
    items: MoodDetail[];
}

export default function LogTimeline({ items }: LogTimelineProps) {
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
