import { forwardRef, Ref } from 'react';
import { Pressable } from 'react-native';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { Icon } from '@/components/Icon';

type TabButtonProps = TabTriggerSlotProps & {
    iconName: string;
    iconSize: number;
}

const TabButton = forwardRef(
    ({ iconName, iconSize, isFocused, ...props }: TabButtonProps, ref: Ref<typeof Icon>) => (
        <Pressable
            {...props}
            ref={ref}
        >
            <Icon
                name={iconName}
                size={iconSize}
                color={isFocused ? 'rgb(3, 133, 199)' : 'black'}
            />
        </Pressable>
    )
);

export default TabButton;
