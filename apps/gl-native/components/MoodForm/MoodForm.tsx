import { useState, PropsWithChildren, StyleProp, ViewStyle, TextStyle } from 'react';
import { View, type PressEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { MoodResponse, type CreateMoodResponse } from '@/services/local';
import { FormButton } from '@/components/FormButton';
import useService from '@/hooks/useService';
import styles from './styles';

type MoodFormProps = {
    style: StyleProp<ViewStyle | TextStyle>;
    data: Record<string, number | string | undefined>;
    validation: Record<string | boolean>;
}

export default function MoodForm({ children, style, data, validation }: PropsWithChildren<MoodFormProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<MoodResponse<CreateMoodResponse> | null>(null);
    const router = useRouter();
    const localService = useService('LOCAL');
    const isFormDisabled = Object.values(validation).some(formInvalid => !formInvalid); 

    const handleFormSubmit = async (event: PressEvent) => {
        event.preventDefault();
        if (isFormDisabled) {
            return;
        }
        setIsLoading(true);
        const response = await localService.createMoodRating(Number(data.rating), data.description);
        setResponse(response);
        setIsLoading(false);
        if (!response.error) {
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
