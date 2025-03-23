import { MoodDetail } from '@/types/Mood';
import { useState, PropsWithChildren } from 'react';
import { View, GestureResponderEvent, StyleProp, ViewStyle, TextStyle  } from 'react-native';
import { useRouter } from 'expo-router';
import { FormButton } from '@/components/FormButton';
import useService from '@/hooks/useService';
import styles from './styles';

type MoodFormProps = {
    style: StyleProp<ViewStyle | TextStyle>;
    data: Record<string, number | string | undefined>;
    validation: Record<string, boolean>;
}

export default function MoodForm({ children, style, data, validation }: PropsWithChildren<MoodFormProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<MoodDetail | null>(null);
    const router = useRouter();
    const localService = useService('LOCAL');
    const isFormDisabled = Object.values(validation).some(formInvalid => !formInvalid); 

    const handleFormSubmit = async (event: GestureResponderEvent) => {
        event.preventDefault();
        if (isFormDisabled) {
            return;
        }
        setIsLoading(true);
        const { data: responseData, error } = await localService.createMoodRating(Number(data.rating), data.description);
        setResponse(responseData);
        setIsLoading(false);
        if (!error) {
            router.back();
        }
    };

    return (
        <View style={[styles.container, style]}>
            {children}
            <FormButton onSubmit={handleFormSubmit} buttonText="Log Mood" disabled={isFormDisabled || isLoading} />
        </View>
    );
}
