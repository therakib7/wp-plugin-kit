<?php

namespace WpPluginKit\Abstracts;

use WP_Error;
use WP_REST_Controller;

/**
 * Rest Controller base class.
 *
 * @since 0.1.0
 */
abstract class RestApi extends WP_REST_Controller {


    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'wp-plugin-kit/v1';

    /**
     * Endpoint base
     *
     * @var string
     */
    protected $base = '';

    /**
     * Check default permission for rest routes.
     *
     * @since 0.1.0
     *
     * @return bool
     */

    public function permission( $req ) {
        // You can access parameters from the $req object
        // $param = $req->get_param('param');

        // Implement your permission check logic here
        if ( current_user_can( 'manage_options' ) ) {
            return true;
        }

        return new WP_Error(
            'rest_forbidden',
            esc_html__( 'Sorry, you are not allowed to do that.', 'wp-plugin-kit' ),
            [
                'status' => is_user_logged_in() ? 403 : 401,
            ]
        );
    }

    /**
     * Format item's collection for response.
     *
     * @since  0.1.0
     *
     * @param object $response
     * @param object $request
     * @param array  $items
     * @param int    $total_items
     *
     * @return object
     */
    public function format_collection_response( $response, $request, $total_items ) {
        if ( $total_items === 0 ) {
            return $response;
        }

        // Pagination values for headers
        $per_page = (int) ( ! empty( $request['per_page'] ) ? $request['per_page'] : 20 );
        $page     = (int) ( ! empty( $request['page'] ) ? $request['page'] : 1 );

        $response->header( 'X-WP-Total', (int) $total_items );

        $max_pages = ceil( $total_items / $per_page );

        $response->header( 'X-WP-TotalPages', (int) $max_pages );
        $base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $this->base ) ) );

        if ( $page > 1 ) {
            $prev_page = $page - 1;
            if ( $prev_page > $max_pages ) {
                $prev_page = $max_pages;
            }
            $prev_link = add_query_arg( 'page', $prev_page, $base );
            $response->link_header( 'prev', $prev_link );
        }
        if ( $max_pages > $page ) {
            $next_page = $page + 1;
            $next_link = add_query_arg( 'page', $next_page, $base );
            $response->link_header( 'next', $next_link );
        }

        return $response;
    }
}
