import Feather from '@expo/vector-icons/Feather';

type IconProps = {
    name: string;
    size: number;
    color: string;
}

export default function Icon({ name, size, color }: IconProps) {
    return (
        <Feather name={name} size={size} color={color} />
    );
}

