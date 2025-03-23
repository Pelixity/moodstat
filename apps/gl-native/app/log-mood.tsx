import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoodForm } from '@/components/MoodForm';
import { DescriptionInput } from '@/components/DescriptionInput';
import { RatingInput } from '@/components/RatingInput';

export default function LogMood() {
    const [formData, setFormData] = useState<{ rating: string, description: string }>({
        rating: '',
        description: '',
    });
    const [formValidation, updateFormValidation] = useState<{ rating: boolean, description: boolean }>({
        rating: true,
        description: true,
    });

    const handleFormFieldChange = useCallback((fieldName: string) => {
        return (value: any, isValid: boolean) => {
            setFormData({ ...formData, [fieldName]: value });
            updateFormValidation({ ...formValidation, [fieldName]: isValid });
        }; 
    }, [formData, formValidation]);

    // TODO: this padding is so bad lol but I broke it when adding
    // tabs and I'm too lazy to properly fix it right now
    return (
        <SafeAreaView style={{ paddingBottom: 64 }}>
                <MoodForm style={styles.formContainer} data={formData} validation={formValidation}>
                    <RatingInput
                        onChange={handleFormFieldChange('rating')}
                        value={formData['rating']}
                        isValid={formValidation['rating']}
                    />
                    <DescriptionInput
                        onChange={handleFormFieldChange('description')}
                        value={formData['description']}
                        isValid={formValidation['description']}
                    />
                </MoodForm>
        </SafeAreaView>
    ); 
};


const styles = StyleSheet.create({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 24,
        height: '100%',
        justifyContent: 'space-evenly',
    },
});
