<?php

namespace WpPluginKit\Database\Seeders\Types;

use WpPluginKit\Abstracts\DBSeeder;
use WpPluginKit\Helpers\Keys;

/**
 * TodoType Seeder class.
 *
 * Seed some fresh todo types for initial startup.
 *
 * @since 0.1.0
 */
class TodoTypes extends DBSeeder {

    /**
     * Name of seeder table.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $table_name = 'todo_types';

    /**
     * Run Todos seeder.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run() {
        global $wpdb;

        // Generate some todo_types.
        $todo_types = [
            [
                'label'        => 'Todo',
                'slug'        => 'todo',
                'created_by'  => get_current_user_id(),
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'label'        => 'Inprogress',
                'slug'        => 'inprogress',
                'created_by'  => get_current_user_id(),
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
            [
                'label'        => 'Done',
                'slug'        => 'done',
                'created_by'  => get_current_user_id(),
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
        ];

        // Create each of the todo_types.
        foreach ( $todo_types as $todo_type ) {
            $wpdb->insert(
                $wpdb->prefix . 'wp_plugin_kit_todo_types',
                $todo_type
            );
        }
    }
}
