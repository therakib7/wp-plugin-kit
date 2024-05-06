/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface IButton {
    /**
     * Button Inside text.
     */
    text: string;

    /**
     * Button icon, a font-awesome icon.
     */
    icon?: IconDefinition | undefined;

    /**
     * Icon position left or right.
     */
    iconPosition?: string;

    /**
     * Button type - primary, success, error, warning, default.
     */
    type?: string;

    /**
     * Outline button or not.
     */
    outline?: boolean;

    /**
     * Onclick button handler.
     */
    onClick?: () => void;

    /**
     * Button class if any.
     */
    buttonCustomClass?: string;

    /**
     * Icon custom class if any.
     */
    iconCustomClass?: string;

    /**
     * Button inside text custom class, if any.
     */
    textClassName?: string;

    /**
     * Detect if in smaller screen text should be hidden or not.
     */
    smTextHidden?: boolean;

    /**
     * Is button disabled or not.
     */
    disabled?: boolean;

    /**
     * Button Inline style.
     */
    style?: React.CSSProperties;
}

const defaultButtonProps = {
    text: '',
    icon: undefined,
    iconPosition: 'left',
    type: 'default',
    outline: false,
    onClick: () => {},
    buttonCustomClass: '',
    iconCustomClass: '',
    textClassName: '',
    smTextHidden: false,
    disabled: false,
    style: {},
};

const Button = (props: IButton) => {
    const {
        text,
        icon,
        iconPosition,
        type,
        outline,
        onClick,
        buttonCustomClass,
        iconCustomClass,
        disabled,
        textClassName,
        smTextHidden,
        style,
    } = { ...defaultButtonProps, ...props };

    /**
     * Get class Name for button from props.
     *
     * @return string
     */
    const getClassName = () => {
        let className = `transition px-4 pl-4 py-2 leading-5 rounded-md font-medium text-sm`;
        let textColor = 'white';
        let bgColor = '';
        let borderColor = '';
        let bgActiveColor = '';
        let hoverTextColor = 'white';

        switch (type) {
            case 'primary':
                textColor = outline ? 'text-primary' : 'text-white';
                bgColor = outline ? 'bg-white' : 'bg-primary';
                bgActiveColor = outline ? 'bg-primary-dark' : 'bg-primary-dark';
                borderColor = outline ? 'border-blue-800' : 'border-transparent';
                break;

            case 'warning':
                textColor = outline ? 'text-yellow-500' : 'text-white';
                bgColor = outline ? 'bg-white' : 'bg-yellow-500';
                bgActiveColor = outline ? 'bg-yellow-600' : 'bg-yellow-600';
                borderColor = outline ? 'border-yellow-500' : 'border-transparent';
                break;

            case 'error':
                textColor = outline ? 'text-error' : 'text-white';
                bgColor = outline ? 'bg-white' : 'bg-red-500';
                bgActiveColor = outline ? 'bg-error-dark' : 'bg-error';
                borderColor = outline ? 'border-error' : 'border-transparent';
                break;

            case 'success':
                textColor = outline ? 'text-success' : 'text-white';
                bgColor = outline ? 'bg-white' : 'bg-success-dark';
                bgActiveColor = outline ? 'bg-success-dark' : 'bg-success';
                borderColor = outline ? 'border-success' : 'border-transparent';
                break;

            case 'default':
                textColor = 'text-black';
                bgColor = outline ? 'bg-white' : 'bg-gray-liter';
                bgActiveColor = outline ? 'bg-gray-liter' : 'bg-gray-liter';
                borderColor = outline ? 'border-transparent' : 'border-gray-dark';
                hoverTextColor = 'text-black'; // outline ? 'black' : 'white';
                break;

            default:
                break;
        }

        // Add background and text colors
        className += ` ${bgColor} hover:!${bgActiveColor} hover:!bg-opacity-80 !focus:${bgActiveColor} ${textColor} hover:${hoverTextColor} focus:text-${textColor} hover:rounded-md focus:rounded-md focus:outline-none`;

        // Add border with color
        className += ` border ${
            outline ? ' border-solid ' : ''
        } ${borderColor} hover:${borderColor} focus:${borderColor}`;

        // Add opacity for disabled button
        if (disabled) {
            className += ' opacity-50 cursor-not-allowed';
        }

        // Add custom class name if provided
        if (
            typeof buttonCustomClass !== 'undefined' &&
            buttonCustomClass !== null
        ) {
            className = `${buttonCustomClass} ${className}`;
        }

        return className;
    };

    return (
        <button
            className={getClassName()}
            style={{ ...style }}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {typeof icon !== 'undefined' && iconPosition === 'left' && (
                <span
                    className={`${
                        smTextHidden ? 'px-0 sm:px-2' : 'px-2'
                    } pl-0 ${iconCustomClass}`}
                >
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}

            <span className={textClassName}>{text}</span>

            {typeof icon !== 'undefined' && iconPosition === 'right' && (
                <span className={`px-2 ${iconCustomClass}`}>
                    <FontAwesomeIcon icon={icon} />
                </span>
            )}
            <br />
        </button>
    );
};

Button.defaultProps = defaultButtonProps;

export default Button;
