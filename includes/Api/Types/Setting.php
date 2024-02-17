<?php

namespace Therakib7\WpPluginKit\Api\Types;

use Therakib7\WpPluginKit\Abstracts\RestApi;
use Therakib7\WpPluginKit\Helpers\Keys;

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
            $this->namespace,
            '/' . $this->base,
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base,
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
                ],
                200
            );
        } else {
            $settings = [];

            if ( $tab === 'general' ) {
                $option = get_option( Keys::SETTINGS . $tab );

                if ( $option ) {
                    $settings = $option;
                } else {
                    $settings['layout'] = 'one';
                    $settings['position'] = 'top';
                    $settings['close_after'] = '3';
                }
            }

            return new \WP_REST_Response(
                [
                    'success'  => true,
                    'data' => [ 'form' => $settings ],
                ],
                200
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
                ],
                200
            );
        } else {
            $settings = [];

            if ( $tab === 'general' ) {
                if ( isset( $param['close_after'] ) && empty( $param['close_after'] ) ) {
                    $wp_err->add(
                        'field',
                        esc_html__( 'Close after is missing', 'wp-plugin-kit' )
                    );
                }

                if ( isset( $param['display_condition'] ) && empty( $param['display_condition'] ) ) {
                    $wp_err->add(
                        'field',
                        esc_html__( 'Display condition is missing', 'wp-plugin-kit' )
                    );
                }

                if ( $wp_err->get_error_messages() ) {
                    return new \WP_REST_Response(
                        [
                            'success'  => false,
                            'data' => $wp_err->get_error_messages(),
                        ],
                        200
                    );
                } else {
                    $settings = [];

                    $settings['layout'] = isset( $param['layout'] )
                        ? $this->input_sanitize( $param['layout'] )
                        : 'one';
                    $settings['position'] = isset( $param['position'] )
                        ? $this->input_sanitize( $param['position'] )
                        : 'one';
                    $settings['close_after'] = isset( $param['close_after'] )
                        ? $this->input_sanitize( $param['close_after'] )
                        : 'one';

                    update_option( Keys::SETTINGS . $tab, $settings );

                    return new \WP_REST_Response(
                        [
                            'success'  => true,
                        ],
                        200
                    );
                }
            }
        }
    }
}
