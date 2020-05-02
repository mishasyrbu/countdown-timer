export interface AppProps {

}

export interface AppState {
    isOn?: boolean;
    initialTime?: number | null; // in seconds
    time: number; // in seconds
    speed?: number;
}
