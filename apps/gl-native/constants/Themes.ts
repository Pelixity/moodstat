import { Platform } from 'react-native';
import { DefaultTheme as ReactNavigationDefault } from '@react-navigation/native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

// 'rgb(237, 227, 209)'
export const DefaultTheme = {
    dark: false,
    colors: {
        ...ReactNavigationDefault.colors,
        background: 'rgb(255, 251, 235)',
        primary: 'rgb(16, 185, 129)',
    },
    fonts: Platform.select({
        web: {
            regular: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '400',
            },
            medium: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '500',
            },
            bold: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '600',
            },
            heavy: {
                fontFamily: WEB_FONT_STACK,
                fontWeight: '700',
            },
        },
        ios: {
            regular: {
                fontFamily: 'System',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'System',
                fontWeight: '500',
            },
            bold: {
                fontFamily: 'System',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'System',
                fontWeight: '700',
            },
        },
        default: {
            regular: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            bold: {
                fontFamily: 'sans-serif',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'sans-serif',
                fontWeight: '700',
            },
        },
    }),
};
