import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from '.';
import styles from './Button.module.scss';

const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        onClick,
        type = 'primary',
        isActive = false,
        disabled = false,
        ...rest
    } = props;
    const classes = classNames(
        styles.button,
        { [styles.active]: isActive, [styles.disabled]: disabled },
        className, styles[type]
    );

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        !disabled && onClick(event);
    };

    return (
        <button className={classes} onClick={handleOnClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;
