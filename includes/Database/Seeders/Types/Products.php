<?php

namespace Therakib7\WpPluginKit\Database\Seeders\Types;

use Therakib7\WpPluginKit\Abstracts\DBSeeder;
use Therakib7\WpPluginKit\Helpers\Keys;

/**
 * Products Seeder class.
 *
 * Seed some fresh emails for initial startup.
 *
 * @since 0.1.0
 */
class Products extends DBSeeder {

    /**
     * Name of seeder table.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected static $table_name = 'products';

    /**
     * Run Products seeder.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run() {
        global $wpdb;

        // Generate some products.
        $products = [
            [
                'title'       => 'Test Product',
                'slug'        => 'test-product',
                'description' => 'This is a test product.',
                'created_by'  => get_current_user_id(),
                'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
                'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            ],
        ];

        // Create each of the products.
        $prefix = Keys::PREFIX;

        $table_name_with_prefix = "{$wpdb->prefix}{$prefix}" . self::$table_name;

        foreach ($products as $product) {
            $wpdb->insert(
                $table_name_with_prefix,
                $product
            );
        }
    }
}
