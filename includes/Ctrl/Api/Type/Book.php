<?php

namespace WpPluginKit\Ctrl\Api\Type;

use WpPluginKit\Abstracts\RestCtrl;
use WpPluginKit\Helper\Fns;

/**
 * API Book class.
 *
 * @since 0.1.0
 */
class Book extends RestCtrl {

    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'books';

    /**
     * Register all routes related with api.
     *
     * @since 0.1.0
     *
     * @return void
     */

    public function routes() {

        register_rest_route(
            $this->namespace, '/' . $this->base,
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get' ],
                'permission_callback' => function () {
                    return Fns::gate( $this->base, 'get' );
                },
                'args' => [
                    'type' => [
                        'validate_callback' => function ( $param ) {
                            return is_string( $param );
                        },
                    ],
                ],
            ]
        );
    }

    /**
     * Get reqeust
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get( $req ) {
        $param = $req->get_params();

        return new \WP_REST_Response(
            [
				'success'  => true,
				'data' => [],
            ], 200
        );
    }
}
