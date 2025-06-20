import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import styles from './ToggleButtonGroupField.module.css';

/**
 * @param {{
 *   name: string,
 *   control: any,
 *   options: Array<{ id: number|string, label: string }>,
 *   className?: string
 * }} props
 */
function ToggleButtonGroupField({ type='radio', name, control, options, className = '' }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ToggleButtonGroup
                    type={type}
                    name={field.name}
                    value={field.value || []}
                    onChange={field.onChange}
                    className={`${className}`}
                >
                    {options.map((opt) => (
                        <ToggleButton
                            key={opt.id}
                            id={`toggle-${name}-${opt.id}`}
                            value={opt.id}
                            variant={(field.value || []).includes(opt.id) ? 'secondary' : 'outline-secondary'}
                        >
                            {opt.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            )}
        />
    );
}

export default ToggleButtonGroupField;