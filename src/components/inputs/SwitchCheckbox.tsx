/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

interface ISwitchCheckbox {
    /**
     * Switch checkbox enabled or disabled.
     */
    enabled: boolean;

    /**
     * Toggle switch onChange event.
     */
    setEnabled: (enabled: boolean) => void;
}

export default function SwitchCheckbox({
    enabled = false,
    setEnabled,
}: ISwitchCheckbox) {
    return (
        <div>
            Switch
        </div>
    );
}
