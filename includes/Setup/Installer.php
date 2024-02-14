<?php

namespace WpPluginKit\Setup;

use WpPluginKit\Helpers\Keys;

/**
 * Class Installer.
 *
 * Install necessary database tables and options for the plugin.
 *
 * @since 0.1.0
 */
class Installer {

    public function __construct() {
        add_action( 'admin_init', [ $this, 'run' ] );
    }

    /**
     * Run the installer.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run(): void {
        $version = get_option( Keys::VERSION, '0.0.0' );
        if ( version_compare( $version, WP_PLUGIN_KIT_VERSION, '<' ) ) {
            // Update the installed version.
            $this->add_version();

            $this->run_migrations();
            $this->run_seeders();
        }
    }

    /**
     * Add time and version.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function add_version(): void {
        $installed = get_option( Keys::INSTALLED_AT );

        if ( ! $installed ) {
            update_option( Keys::INSTALLED_AT, current_datetime()->format( 'Y-m-d H:i:s' ) );
        }

        update_option( Keys::VERSION, WP_PLUGIN_KIT_VERSION );
    }

    /**
     * Create necessary database tables.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run_migrations() {
        // Run the database migrations.
        $migration = new \WpPluginKit\Database\Migrations\Tables\Manager();
        $migration->run();
    }

    /**
     * Seed necessary database data.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run_seeders() {
        // Run the database seeders.
        $seeder = new \WpPluginKit\Database\Seeders\Manager();
        $seeder->run();
    }
}
