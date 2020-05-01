export interface CountdownDisplayProps {
    className?: string;
    isOn?: boolean;
    onPlayStop: () => void;
    initialTime: number | null;
    time: number;
}
