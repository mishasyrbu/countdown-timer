import React, {useState} from 'react';
import classNames from 'classnames';

import Button from '../Button';
import { StartControlsProps } from '.';
import styles from './StartControls.module.scss';

const StartControls = (props: StartControlsProps) => {
    const { className, onStart } = props;
    const classes = classNames(styles.startControls, className);
    const [count, setCount] = useState<string>('');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, validity: { valid } } = event.target;

        if (valid) {
            setCount(value || '');
        }
    };

    const onStartClick = () => {
        if (count) {
            onStart(Number.parseFloat(count));
            setCount('');
        }
    };

    return (
        <div className={classes}>
            <span className={styles.title}>Countdown:</span>
            <input
                className={styles.input}
                placeholder="(Min)"
                type="text"
                pattern="[0-9]*"
                onChange={onInputChange}
                value={count}
            />
            <Button disabled={!count} onClick={onStartClick}>START</Button>
        </div>
    );
};

export default React.memo(StartControls);
