import type { InputError } from '@/types/Error';
import { useState, useCallback } from 'react';
import { TextInput, View, Text } from 'react-native';
import { AnimatedMoodIcon } from '@/components/AnimatedMoodIcon';
import { isEmptyObject } from '@/utilities/collection';
import styles from './styles';

type RatingProps = {
    value: string;
    isValid: boolean;
    onChange?: (value: number, isValid: boolean) => void;
};

function validateRating(rating: number): InputError | null {
    if (Number.isNaN(rating)) {
        return { message: 'Rating needs to be a number.' };
    }
    if (rating < 1 || rating > 10) {
        return { message: 'Rating needs to be between 1 - 10.' }; 
    }
    return null;
}

export default function RatingInput({ value, isValid, onChange }: RatingProps) {
    const [error, setError] = useState<InputError | null>(null);
    const valueAsNumber = Number(value); 

    const handleRatingChange = useCallback((rating: string): void => {
        const ratingAsNumber = Number(rating);
        const validation = validateRating(ratingAsNumber);
        const isNewInputValid = validation === null; 
        setError(validation);
        onChange?.(rating, isNewInputValid);
    }, [value, onChange]);

    return (
        <View style={[styles.container, { marginBottom: isValid ? 29 : 0 }]} >
            <Text style={styles.ratingLabel}>Rate how you feel right now</Text>
            <AnimatedMoodIcon 
                height={96}
                width={96}
                rating={valueAsNumber}
                relatedInputHasError={!isValid}
                style={{ backgroundColor: 'rgb(237, 227, 209)' }}
            />
            <TextInput
                value={value}
                placeholder="10.0"
                placeholderTextColor="#a3a3a3"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleRatingChange}
                textAlign="center"
                autoCorrect={false}
                style={[styles.ratingInput, { ...(!isValid && styles.error) }]}
            />
            {!isValid ? <Text style={styles.errorText}>{error!.message}</Text> : null}
        </View>
    );
}

