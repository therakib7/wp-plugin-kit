<?php

namespace WpPluginKit\Database\Seeders\Types;

use WpPluginKit\Abstracts\DBSeeder;
use WpPluginKit\Helpers\Keys;

/**
 * Todos Seeder class.
 *
 * Seed some fresh emails for initial startup.
 */
class Todos extends DBSeeder {

    /**
     * Name of seeder table.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $table_name = 'todos';

    /**
     * Run Todos seeder.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run() {
        global $wpdb;

        // Generate some todos.
        $todos = [
            [
                'title'       => 'First Test Task',
                'slug'        => 'first-test-task',
                'description' => 'This is a simple task.',
                'created_by'  => get_current_user_id(),
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
        ];

        // Create each of the todos.
        foreach ( $todos as $todo ) {
            $wpdb->insert(
                $wpdb->prefix . 'wp_plugin_kit_todos',
                $todo
            );
        }
    }
}
