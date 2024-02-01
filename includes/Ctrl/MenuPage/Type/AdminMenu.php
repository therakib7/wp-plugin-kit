<?php

namespace WpPluginKit\Ctrl\MenuPage\Type;

/**
 * Admin Menu Register
 *
 * @since 0.1.0
 */
class AdminMenu {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_admin_menu' ), 99 );
    }

    public function add_admin_menu() {

        //add_menu_page
        $this->add_menu_page();
    }

    /**
     * Add admin menu page
     *
     * @since 0.1.0
     */
    public function add_menu_page() {
        add_menu_page(
            esc_html__( 'WP Plugin Kit', 'wp-plugin-kit' ),
            esc_html__( 'WP Plugin Kit', 'wp-plugin-kit' ),
            'manage_options',
            'wp-plugin-kit',
            [ $this, 'render' ],
            'dashicons-list-view',
            75
        );
    }

    /**
     * Admin menu render
     *
     * @since 0.1.0
     */
    public function render() {
        echo '<div class="wrap"><div id="wp-plugin-kit"></div></div>';
    }
}
