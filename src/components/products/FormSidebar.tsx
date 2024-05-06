/**
 * External dependencies.
 */
import { scroller } from 'react-scroll';
import { __ } from '@wordpress/i18n';

type Props = {
    loading?: boolean;
};

export default function FormSidebar({ loading }: Props) {
    const goToSection = (className: string) => {
        scroller.scrollTo(className, {
            duration: 800,
            delay: 0,
            offset: -90,
            smooth: 'easeInOutQuart',
        });
    };

    const menus = [
        {
            id: 'product-general',
            label: __('General Info', 'wp-plugin-kit'),
        },
        {
            id: 'product-pricing',
            label: __('Pricing Info', 'wp-plugin-kit'),
        },
        {
            id: 'product-attachment',
            label: __('Attachment', 'wp-plugin-kit'),
        },
    ];

    return (
        <div className="bg-white py-5 pl-4 pr-10 mb-3 md:sticky">
            <h3 className="text-center font-bold">
                {__('Quick Jump', 'wp-plugin-kit')}
            </h3>
            <ul>
                {loading ? (
                    <>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                        <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                    </>
                ) : (
                    <>
                        {menus.map((menu, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-center transition bg-slate-100 hover:bg-slate-200 p-2.5 rounded-lg mt-5"
                                onClick={() => goToSection(menu.id)}
                                onKeyDown={() => goToSection(menu.id)}
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                                role="button"
                            >
                                {menu.label}
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}
