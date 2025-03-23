import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
    ReduceMotion,
} from 'react-native-reanimated';
import { clearToastError } from '@/store/ErrorStore/actions';
import styles from './styles';

type ToastProps = {
    message: string;
};

export default function Toast({ message }: ToastProps) {
    const initialY = 50;
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(initialY);
    const animationTiming = 2000;

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withSpring(translateY.value, {
                    mass: 1.5,
                    damping: 7.5,
                    stiffness: 50,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                    reduceMotion: ReduceMotion.System,
                }),
            }
        ],
    }));

    useEffect(() => {
        translateY.value = 0;
        opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
        setTimeout(() => {
            translateY.value = initialY;
            opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
        }, animationTiming);
        setTimeout(() => clearToastError(), animationTiming + 500);
    }, []);

    return (
        <Animated.View style={[styles.toast, { opacity }, animatedStyles]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
}

