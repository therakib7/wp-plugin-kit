<?php

namespace Therakib7\WpPluginKit\Admin;

/**
 * Admin Menu class.
 *
 * Responsible for managing admin menus.
 *
 * @since 0.1.0
 */
class Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'init_menu' ] );
    }

    public function init_menu() {

        $slug          = WP_PLUGIN_KIT_SLUG;
        $menu_position = 75;
        $capability    = 'manage_options';

        add_menu_page(
            esc_html__( 'WP Plugin Kit', 'wp-plugin-kit' ),
            esc_html__( 'WP Plugin Kit', 'wp-plugin-kit' ),
            $capability,
            $slug,
            [ $this, 'render' ],
            'dashicons-list-view',
            $menu_position
        );

        add_submenu_page(
            $slug,
            esc_html__( 'Products', 'wp-plugin-kit' ),
            esc_html__( 'Products', 'wp-plugin-kit' ),
            $capability,
            $slug . '#/products',
            [ $this, 'render' ]
        );

        add_submenu_page(
            $slug,
            esc_html__( 'Settings', 'wp-plugin-kit' ),
            esc_html__( 'Settings', 'wp-plugin-kit' ),
            $capability,
            $slug . '#/settings',
            [ $this, 'render' ]
        );

        // Remove main menu from submenu
        remove_submenu_page( $slug, $slug );
    }

    /**
     * Render the plugin page
     *
     * @since 0.1.0
     */
    public function render() {
        require_once WP_PLUGIN_KIT_TEMPLATE_PATH . '/app.php';
    }
}
