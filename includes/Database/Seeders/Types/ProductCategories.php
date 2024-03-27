<?php

namespace Therakib7\WpPluginKit\Database\Seeders\Types;

use Therakib7\WpPluginKit\Abstracts\DBSeeder;
use Therakib7\WpPluginKit\Helpers\Keys;

/**
 * ProductType Seeder class.
 *
 * Seed some fresh product types for initial startup.
 *
 * @since 0.1.0
 */
class ProductCategories extends DBSeeder
{

    /**
     * Name of seeder table.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected static $table_name = 'product_categories';

    /**
     * Run Products seeder.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function run()
    {
        global $wpdb;

        // Common data
        $common_data = [
            'created_by' => get_current_user_id(),
            'created_at' => current_datetime()->format('Y-m-d H:i:s'),
            'updated_at' => current_datetime()->format('Y-m-d H:i:s'),
        ];

        // Generate some product_categories.
        $product_categories = [
            [
                'name' => 'Electronics',
                'slug'  => 'electronics',
            ],
            [
                'name' => 'Clothing',
                'slug'  => 'clothing',
            ],
            [
                'name' => 'Home & Kitchen',
                'slug'  => 'home-kitchen',
            ],
            [
                'name' => 'Books',
                'slug'  => 'books',
            ],
        ];

        // Merge common data with each product category
        foreach ($product_categories as &$category) {
            $category = array_merge($category, $common_data);
        }

        // Unset reference to last element to avoid potential conflicts
        unset($category);

        // Create each of the product_categories.
        $prefix = Keys::PREFIX;

        $table_name_with_prefix = "{$wpdb->prefix}{$prefix}" . self::$table_name;

        foreach ($product_categories as $product_category) {
            $wpdb->insert(
                $table_name_with_prefix,
                $product_category
            );
        }
    }
}
