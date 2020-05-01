import React from 'react';
import classNames from 'classnames';

import { CountdownDisplayProps } from '.';
import styles from './CountdownDisplay.module.scss';

const CountdownDisplay = (props: CountdownDisplayProps) => {
    const { className, isOn = false, onPlayStop, value } = props;
    const classes = classNames(styles.countdownDisplay, className);
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    const onPlayPauseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        value > 0 && onPlayStop();
    };

    return (
        <div className={classes}>
            <i className={styles.messageInfo}>More than halfway there!</i>
            <div className={styles.countdown}>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <button className={styles.playPause} onClick={onPlayPauseClick}>
                <div className={isOn ? styles.pause : styles.play} />
            </button>
        </div>
    );
};

export default CountdownDisplay;
