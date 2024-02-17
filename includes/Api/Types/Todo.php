<?php
namespace Therakib7\WpPluginKit\Api\Types;

use Therakib7\WpPluginKit\Abstracts\RestApi;

/**
 * API Todo class.
 *
 * @since 0.1.0
 */
class Todo extends RestApi {

    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'todos';

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
                'permission_callback' => [ $this, 'permission' ],
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
     * Get request
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
