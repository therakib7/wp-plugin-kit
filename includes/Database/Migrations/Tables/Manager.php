<?php

namespace Therakib7\WpPluginKit\Database\Migrations\Tables;

use Therakib7\WpPluginKit\Database\Migrations\Tables\Types\{
    Todos,
    TodoTypes
};
/**
 * Database Migration class.
 *
 * It'll seed all of the migrations.
 *
 * @since 0.1.0
 */
class Manager {

    /**
     * Run the database migrations.
     *
     * @since 0.1.0
     *
     * @return void
     * @throws \Exception
     */
    public function run() {

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        $migration_classes = [
            Todos::class,
            TodoTypes::class,
        ];

        foreach ( $migration_classes as $migration_class ) {
            $migration = new $migration_class();
            $migration->migrate();
        }
    }
}
