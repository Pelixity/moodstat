import { Pressable, Text, type PressEvent } from 'react-native';
import styles from './styles';

type FormButtonProps = {
    buttonText: string;
    onSubmit: (event: PressEvent) => void;
    disabled?: boolean;
}

export default function FormButton({ buttonText, onSubmit, disabled }: FormButtonProps) {
    return (
        <Pressable
            onPress={onSubmit}
            disabled={disabled}
            style={styles.button}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
    );
}
