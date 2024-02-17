<?php
namespace Therakib7\WpPluginKit\Hooks\Types\Filter\Types;

class ActionLink {

    public function __construct() {
        add_filter( 'plugin_action_links_' . plugin_basename( WP_PLUGIN_KIT_FILE ), [ $this, 'links' ] );
    }

    /**
	 * Assist links.
	 *
	 * @since 0.1.0
	 *
	 * @param array $links
	 *
	 * @return array
	 */
	public function links( $links ) {
		$links[] = '<a target="_blank" href="' . esc_url( 'https://therakib7.com/wp-plugin-kit/docs' ) . '">' . esc_html__( 'Documentation', 'wp-plugin-kit' ) . '</a>';

		if ( array_key_exists( 'deactivate', $links ) ) {
            $links['deactivate'] = str_replace( '<a', '<a class="wp-plugin-kit-deactivate-link"', $links['deactivate'] );
        }
		return $links;
	}
}
