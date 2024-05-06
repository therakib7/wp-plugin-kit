<?php

namespace Therakib7\WpPluginKit\Models;

use Therakib7\WpPluginKit\Abstracts\BaseModel;


/**
 * Product model
 *
 * @since 0.1.0
 */
class Product extends BaseModel {

    /**
     * Table Name.
     *
     * @var string
     */
    protected $table = 'wp_plugin_kit_products';

    /**
     * Prepare datasets for database operation.
     *
     * @since 0.1.0
     *
     * @param array $request
     * @return array
     */
    public function prepare_for_database( array $data ): array {
        $defaults = [
            'is_active'   => 1,
            'created_by'  => get_current_user_id(),
            'title'       => '',
            'slug'        => '',
            'description' => '',
            'category_id' => null,
            'price'       => '',
            'currency'    => '',
            'created_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
            'updated_at'  => current_datetime()->format( 'Y-m-d H:i:s' ),
        ];

        $data = wp_parse_args( $data, $defaults );

        // Sanitize template data
        return [
            'is_active'   => $this->sanitize( $data['is_active'], 'switch' ),
            'title'       => $this->sanitize( $data['title'], 'text' ),
            'slug'        => $this->sanitize( $data['title'], 'text' ),
            'description' => $this->sanitize( $data['description'], 'block' ),
            'category_id' => $this->sanitize( $data['category_id'], 'number' ),
            'price'       => $this->sanitize( $data['price'], 'number' ),
            'currency'    => $this->sanitize( $data['currency'], 'text' ),
            'created_by'  => $this->sanitize( $data['created_by'], 'number' ),
            'created_at'  => $this->sanitize( $data['created_at'], 'text' ),
            'updated_at'  => $this->sanitize( $data['updated_at'], 'text' ),
        ];
    }

    /**
     * Create a new product.
     *
     * @since 0.3.0
     *
     * @param array $data
     *
     * @return int | WP_Error $id
     */
    public function add( $data ) {
        // Prepare product data for database-insertion.
        $product_data = $this->prepare_for_database( $data );

        // Create product now.
        $product_id = $this->create(
            $this->table,
            $product_data,
            [
                '%d',
                '%s',
                '%s',
                '%s',
                '%s',
                '%s',
                '%s',
                '%s',
                '%s',
                '%s',
            ]
        );

        if ( ! $product_id ) {
            return new \WP_Error( 'wp_plugin_kit_product_create_failed', __( 'Failed to create job.', 'wp-plugin-kit' ) );
        }

        /**
         * Fires after a job has been created.
         *
         * @since 0.3.0
         *
         * @param int   $job_id
         * @param array $job_data
         */
        do_action( 'wp_plugin_kit_products_created', $product_id, $product_data );

        return $product_id;
    }

    /**
     * Get all jobs by criteria.
     *
     * @since 0.3.0
     * @since 0.3.1 Fixed counting return type as integer.
     *
     * @param array $args
     * @return array|object|string|int
     */
    public function getall( array $args = [] ) {
        $defaults = [
            'page'     => 1,
            'per_page' => 10,
            'orderby'  => 'id',
            'order'    => 'DESC',
            'search'   => '',
            'count'    => false,
            'where'    => [],
        ];

        $args = wp_parse_args( $args, $defaults );

        if ( ! empty( $args['search'] ) ) {
            global $wpdb;
            $like = '%' . $wpdb->esc_like( sanitize_text_field( wp_unslash( $args['search'] ) ) ) . '%';
            $args['where'][] = $wpdb->prepare( ' title LIKE %s OR description LIKE %s ', $like, $like );
        }

        if ( ! empty( $args['where'] ) ) {
            $args['where'] = ' WHERE ' . implode( ' AND ', $args['where'] );
        } else {
            $args['where'] = '';
        }

        $jobs = $this->all( 'wp_wp_plugin_kit_products', $args );

        if ( $args['count'] ) {
            return (int) $jobs;
        }

        return $jobs;
    }

    /**
     * Products item to a formatted array.
     *
     * @since 0.1.0
     *
     * @param object $product
     *
     * @return array
     */
    public static function to_array( ?object $product ): array {
        $data = [
            'id'          => (int) $product->id,
            'title'       => $product->title,
            'slug'        => $product->slug,
            'description' => $product->description,
            'created_at'  => $product->created_at,
            'updated_at'  => $product->updated_at,
        ];

        return $data;
    }

}
