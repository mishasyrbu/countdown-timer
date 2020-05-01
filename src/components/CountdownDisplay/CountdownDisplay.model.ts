export interface CountdownDisplayProps {
    className?: string;
    isOn?: boolean;
    onPlayStop: () => void;
    value: number;
}
