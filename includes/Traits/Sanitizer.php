<?php

namespace WpPluginKit\Traits;

/**
 * Trait: Sanitizer.
 *
 * It will sanitize any input value based on type.
 */
trait Sanitizer {

    /**
     * Sanitize input request.
     *
     * @since 0.1.0
     *
     * @param mixed  $value
     * @param string $type
     *
     * @return mixed $sanitized value
     */
    public function input_sanitize( $value, string $type, $array_map_type = 'text' ) {
        $sanitized = '';

        switch ( $type ) {
            case 'text':
            case 'textarea':
                $allowed_tags = [
                    'a' => [
                        'href' => [],
                        'title' => [],
                    ],
                    'br' => [],
                    'em' => [],
                    'strong' => [],
                ];
                $sanitized = wp_kses( $value, $allowed_tags );
                break;

            case 'number':
                $sanitized = absint( wp_unslash( $value ) );
                break;

            case 'email':
                $sanitized = sanitize_email( wp_unslash( $value ) );
                break;

            case 'switch':
                $sanitized = (bool) wp_unslash( $value );
                break;

            case 'map':
                $sanitize_fns = '';
                switch ( $array_map_type ) {
                    case 'text':
                        $sanitize_fns = 'sanitize_text_field';
                        break;

                    case 'boolean':
                        $sanitize_fns = 'rest_sanitize_boolean';
                        break;
                }
                $sanitized = array_map( $sanitize_fns, $value );
                break;

            case 'block':
                // Sanitize gutenberg block data.
                // We're not sanitizing it, now, when we're showing it,
                // We'll use gutenberg's own way for rendering blocks.
                $sanitized = $value;
                break;

            default:
                $sanitized = $value;
                break;
        }

        return $sanitized;
    }

    /**
     * Sanitize output data.
     *
     * @since 0.1.0
     *
     * @param mixed  $value
     * @param string $type
     * @param string $array_map_type
     *
     * @return mixed $sanitized value
     */
    public function output_sanitize( $value, string $type, $array_map_type = 'text' ) {
        $sanitized = '';

        switch ( $type ) {
            case 'text':
            case 'email':
            case 'textarea':
                $sanitized = esc_html( wp_unslash( $value ) );
                break;

            case 'number':
                $sanitized = absint( wp_unslash( $value ) );
                break;

            case 'switch':
                $sanitized = (bool) wp_unslash( $value );
                break;

            case 'map':
                $sanitize_fns = '';
                switch ( $array_map_type ) {
                    case 'text':
                        $sanitize_fns = 'esc_html';
                        break;
                }
                $sanitized = array_map( $sanitize_fns, $value );
                break;

            case 'block':
                // Sanitize gutenberg block data.
                // We're not sanitizing it, now, when we're showing it,
                // We'll use gutenberg's own way for rendering blocks.
                $sanitized = $value;
                break;

            default:
                $sanitized = $value;
                break;
        }

        return $sanitized;
    }
}
