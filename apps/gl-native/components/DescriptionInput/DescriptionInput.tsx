import type { InputError } from '@/types/Error';
import { useState, useCallback, StyleProp, ViewStyle, TextStyle } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { MAX_DESCRIPTION_LENGTH } from '@/constants/Validation';
import styles from './styles';

type DescriptionInputProps = {
    value: string | undefined;
    isValid: boolean;
    style?: StyleProp<ViewStyle | TextStyle>;
    onChange?: (value: string, isValid: boolean) => void;
}

const validateDescription = (descriptionValue: string): InputError | null => {
    if (descriptionValue.length > MAX_DESCRIPTION_LENGTH) {
        return { message: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.` };
    }
    return null;
};

export default function DescriptionInput({ value = '', isValid, style, onChange }: DescriptionInputProps) {
    const [error, setError] = useState<InputError | null>(null);
    const handleDescriptionChange = useCallback((descriptionValue: string) => {
        const validation = validateDescription(descriptionValue);
        const isNewValueValid = validation === null;
        setError(validation);
        onChange?.(descriptionValue, isNewValueValid);
    });

    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Add a Description</Text>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput
                    value={value}
                    placeholder="I'm feeling..."
                    placeholderTextColor="rgb(107, 114, 128)"
                    multiline
                    numberOfLines={6}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    inputType="text"
                    submitBehavior="blurAndSubmit"
                    returnKeyLabel="done"
                    onChangeText={handleDescriptionChange}
                    style={[styles.descriptionInput, style, { ...(!isValid && styles.error) }]}
                />
            </KeyboardAvoidingView>
            {!isValid ? <Text style={styles.errorText}>{error!.message}</Text> : null}
        </View>
    );
}
