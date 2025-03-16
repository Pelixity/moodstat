import { useRef, useEffect, StyleProp, ViewStyle, TextStyle } from 'react';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { compareNumber } from '@/utilities/comparison';
// FIXME: there probably is a "cleaner" way to import these
// ex: move all of these to one json file that is structured
//      the same way as the EMOJI_ICON_MAP
import mood10 from '@/assets/images/emojis/10.json';
import mood8 from '@/assets/images/emojis/8.json';
import mood5 from '@/assets/images/emojis/5.json';
import mood4 from '@/assets/images/emojis/4.json';
import mood2 from '@/assets/images/emojis/2.json';
import unknownMood from '@/assets/images/emojis/unknown.json';
import errorIcon from '@/assets/images/emojis/error.json';

// TODO: make style prop correct type (i.e. record of view style props)
type AnimatedMoodIconProps = {
    rating: number;
    width: number;
    height: number;
    relatedInputHasError?: boolean;
    style?: StyleProp<ViewStyle | TextStyle>;
}

const EMOJI_ICON_MAP = {
    2: {
        emoji: mood2,
    },
    3: {
        emoji: mood4,
    },
    5: {
        emoji: mood5,
    },
    6: {
        emoji: mood8,
    },
    9: {
        emoji: mood10,
    },
};

function getIconFromRating(rating: number) {
    if (Number.isNaN(rating) || rating === 0) {
        return { emoji: unknownMood };
    }

    const moodThresholds = Object.keys(EMOJI_ICON_MAP).map(key => Number(key));
    moodThresholds.sort(compareNumber);
    let index = 0;
    while (index + 1 < moodThresholds.length && moodThresholds[index + 1] <= rating) {
        index++;
    }

    const matchingIconKey = moodThresholds[index].toString();
    return EMOJI_ICON_MAP[matchingIconKey];
}

export default function AnimatedMoodIcon(
    { rating, width, height, relatedInputHasError = false, style = {} }: AnimatedMoodIconProps
) {
    const { colors } = useTheme();
    const lottieRef = useRef<LottieView>(null); 
    const iconData = getIconFromRating(rating);
    const icon = !relatedInputHasError ? iconData.emoji : errorIcon; 

    useEffect(() => {
        lottieRef.current?.play();
    }, [icon]);

    return (
        <LottieView
            autoPlay
            loop={false}
            source={icon}
            style={[style, { width, height, backgroundColor: colors.background }]}
        />
    );
}
