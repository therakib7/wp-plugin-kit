<?php

namespace WpPluginKit\Database\Seeders;

use WpPluginKit\Database\Seeders\Types\{
    Todos,
    TodoTypes
};
/**
 * Database Seeder class.
 *
 * It'll seed all of the seeders.
 */
class Manager {

    /**
     * Run the database seeders.
     *
     * @since 0.1.0
     *
     * @return void
     * @throws \Exception
     */
    public function run() {
        // Check if there is already a seeder runs for this plugin.
        /* $already_seeded = get_option( Keys::SEEDER_RAN_AT );
        if ( $already_seeded ) {
            // return;
        } */

        $seeder_classes = [
            Todos::class,
            TodoTypes::class
        ];

        foreach ( $seeder_classes as $seeder_class ) {
            $seeder = new $seeder_class();
            $seeder->run();
        }

        // Update that seeder already runs.
        // update_option( Keys::SEEDER_RAN_AT, current_datetime()->format( 'Y-m-d H:i:s' ) );
    }
}
