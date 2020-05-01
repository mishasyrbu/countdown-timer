import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '../Button';
import { TIMER_SPEED_MODE, SpeedControlsProps, SpeedModeType } from '.';
import styles from './SpeedControls.module.scss';

const SpeedControls = (props: SpeedControlsProps) => {
    const { className, onChange } = props;
    const classes = classNames(styles.speedControls, className);
    const [selectedMode, setSelectedMode] = useState<SpeedModeType>(TIMER_SPEED_MODE.X1);

    const onButtonClick = (mode: SpeedModeType) => () => {
        setSelectedMode(mode);
        onChange(mode.value);
    };

    return (
        <div className={classes}>
            {Object.values(TIMER_SPEED_MODE).map((mode) => (
                <Button
                    key={mode.name}
                    className={styles.button}
                    type="action"
                    onClick={onButtonClick(mode)}
                    isActive={selectedMode.name === mode.name}
                >
                    {mode.name}
                </Button>
            ))}
        </div>
    );
};

export default React.memo(SpeedControls);
