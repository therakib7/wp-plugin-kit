<?php
namespace Therakib7\WpPluginKit\Hooks\Types\Filter;

use Therakib7\WpPluginKit\Hooks\Types\Filter\Types\{
    ActionLink
};

/**
 * WP Filter hook
 *
 * @since 0.1.0
 */
class FilterCtrl {

    public function __construct() {
        new ActionLink();

        add_filter( 'admin_body_class', [ $this, 'admin_body_class' ] );
    }

    public function admin_body_class( $classes ) {
        if (
            // It getting from admin menu page URL, no need to check NonceVerification
			// phpcs:ignore WordPress.Security.NonceVerification.Recommended
            ( isset( $_GET['page'] ) && sanitize_text_field( wp_unslash( $_GET['page'] ) ) === 'wp-plugin-kit' )
        ) {
            $classes .= ' wp-plugin-kit ' . get_option( 'template' ) . '-theme';
        }

        return $classes;
    }
}
