export interface SpeedControlsProps {
    className?: string;
    onChange: (value: number) => void;
}

export interface SpeedModeType {
    name: string;
    value: number;
}