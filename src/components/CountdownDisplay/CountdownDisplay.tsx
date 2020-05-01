import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import { CountdownDisplayProps } from '.';
import styles from './CountdownDisplay.module.scss';

const CountdownDisplay = (props: CountdownDisplayProps) => {
    const { className, isOn = false, onPlayStop, initialTime, time } = props;
    const [isFirstRun, setIsFirstRun] = useState<boolean>(true);
    const classes = classNames(styles.countdownDisplay, className);
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    const onPlayPauseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        time > 0 && onPlayStop();
    };

    const renderInfoBox = () => {
        const timesUp = time === 0;
        const lessThanHalfLeft = !timesUp && initialTime && initialTime / 2 > time;
        const classes = classNames(styles.messageInfo, {
            [styles.redText]: !timesUp && time <= 20,
            [styles.blink]: !timesUp && time <= 10,
        });

        return (
            <div className={classes}>
                {!isFirstRun && lessThanHalfLeft && <i>More than halfway there!</i>}
                {!isFirstRun && timesUp && <i>Time’s up!</i>}
            </div>
        );
    };

    useEffect(() => {
        if (time && isFirstRun) {
            setIsFirstRun(false);
        }
    }, [time, isFirstRun]);

    return (
        <div className={classes}>
            {renderInfoBox()}
            <div className={styles.countdown}>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            {!!time && (
                <button className={styles.playPause} onClick={onPlayPauseClick}>
                    <div className={isOn ? styles.pause : styles.play} />
                </button>
            )}
        </div>
    );
};

export default CountdownDisplay;
