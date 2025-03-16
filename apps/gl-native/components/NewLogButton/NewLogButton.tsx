import { StyleProp, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import { Icon } from '@/components/Icon';
import styles from './styles';

type NewLogButtonProps = {
    style?: StyleProp<ViewStyle>;
}

export default function NewLogButton({ style }: NewLogButtonProps) {
    return (
        <Link href="/log-mood" style={[styles.logButton, style]}>
            <Icon name="plus" size={36} color="rgb(186, 230, 253)" />
        </Link>
    ); 
}
