import React, { ButtonHTMLAttributes } from 'react';

type ButtonType = 'primary' | 'action';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType;
    className?: string;
    children: string | Node;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isActive?: boolean;
    disabled?: boolean;
}
