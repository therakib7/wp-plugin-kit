<?php

namespace WpPluginKit\Api\Types;

use WpPluginKit\Abstracts\RestApi;

/**
 * API Setting class.
 *
 * @since 0.1.0
 */

class Setting extends RestApi {

    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'settings';

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
            ]
        );

        register_rest_route(
            $this->namespace, '/' . $this->base,
            [
                'methods' => 'POST',
                'callback' => [ $this, 'create' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );
    }

    /**
     * Get settings data based on the provided tab.
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get( $req ) {
        $param = $req->get_params();
        $wp_err = new \WP_Error();

        $tab = isset( $param['tab'] ) ? sanitize_text_field( $param['tab'] ) : null;

        if ( empty( $tab ) ) {
            $wp_err->add(
                'field',
                esc_html__( 'Tab is missing', 'wp-plugin-kit' )
            );
        }

        if ( $wp_err->get_error_messages() ) {
            return new \WP_REST_Response(
                [
					'success'  => false,
					'data' => $wp_err->get_error_messages(),
                ], 200
            );
        } else {
            $data = [];

            if ( $tab === 'test_tab' ) {
                $option = get_option( 'wp_plugin_kit_' . $tab );

                if ( $option ) {
                    $data = $option;
                } else {
                    $data['status'] = false;
                }
            }

            return new \WP_REST_Response(
                [
					'success'  => true,
					'data' => $data,
                ], 200
            );
        }
    }

    /**
     * Update settings data based on the provided tab.
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function create( $req ) {
        $param = $req->get_params();
        $wp_err = new \WP_Error();

        $tab = isset( $param['tab'] ) ? sanitize_text_field( $param['tab'] ) : '';

        if ( empty( $tab ) ) {
            $wp_err->add(
                'field',
                esc_html__( 'Tab is missing', 'wp-plugin-kit' )
            );
        }

        if ( $wp_err->get_error_messages() ) {
            return new \WP_REST_Response(
                [
					'success'  => false,
					'data' => $wp_err->get_error_messages(),
                ], 200
            );
        } else {
            $data = [];

            if ( $tab === 'test' ) {
                $data['status'] = isset( $param['status'] )
                    ? rest_sanitize_boolean( $param['status'] )
                    : null;

                $option = update_option( 'wp_plugin_kit_' . $tab, $data );
            }

            return new \WP_REST_Response(
                [
					'success'  => true,
					'data' => null,
                ], 200
            );
        }
    }
}
