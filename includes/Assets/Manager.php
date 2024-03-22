<?php

namespace Therakib7\WpPluginKit\Assets;

/**
 * Asset Manager class.
 *
 * Responsible for managing all of the assets (CSS, JS, Images, Locales).
 * 
 * @since 0.1.0
 */
class Manager {

    /**
     * Constructor.
     *
     * @since 0.1.0
     */
    public function __construct() {
        add_action('init', [$this, 'register_all_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    /**
     * Chunk translation
     *
     * @since 0.1.0
     *
     * @return void
     */
    private function chunks_translation() {
        $data = [
            'baseUrl' => '',
            'locale' => determine_locale(),
            'domainMap' => [],
            'domainPaths' => [],
        ];

        $lang_dir = WP_LANG_DIR;
        $content_dir = WP_CONTENT_DIR;
        $abspath = ABSPATH;

        if (strpos($lang_dir, $content_dir) === 0) {
            $data['baseUrl'] = esc_url(content_url(substr(trailingslashit($lang_dir), strlen(trailingslashit($content_dir)))));
        } elseif (strpos($lang_dir, $abspath) === 0) {
            $data['baseUrl'] = esc_url(site_url(substr(trailingslashit($lang_dir), strlen(untrailingslashit($abspath)))));
        }

        // Enqueue the script and localize the data
        wp_enqueue_script('wp-plugin-kit-i18n-loader');
        $data['domainMap'] = (object) $data['domainMap'];
        $data['domainPaths'] = (object) $data['domainPaths'];
        wp_localize_script('wp-plugin-kit-i18n-loader', 'wpPluginKitI18nState', $data);
    }

    /**
     * Register all scripts and styles.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function register_all_scripts()
    {
        $this->register_scripts($this->global_scripts());
        $this->chunks_translation();
        $this->register_styles($this->get_styles());
        $this->register_scripts($this->get_scripts());
    }

    /**
     * Get all styles.
     *
     * @since 0.1.0
     *
     * @return array
     */
    public function get_styles(): array
    {
        return [
            'wp-plugin-kit-app' => [
                'src'     => WP_PLUGIN_KIT_BUILD . '/index.css',
                'version' => OZOPANEL_VERSION,
                'deps'    => [],
            ],
        ];
    }

    /**
     * Get all scripts.
     *
     * @since 0.1.0
     *
     * @return array
     */
    public function global_scripts(): array
    {
        $dependency = require_once WP_PLUGIN_KIT_DIR . '/build/i18n-loader.asset.php';

        return [
            'wp-plugin-kit-i18n-loader' => [
                'src'       => WP_PLUGIN_KIT_BUILD . '/i18n-loader.js',
                'version'   => $dependency['version'],
                'deps'      => $dependency['dependencies'],
                'in_footer' => true
            ],
        ];
    }

    /**
     * Get all scripts.
     *
     * @since 0.1.0
     *
     * @return array
     */
    public function get_scripts(): array
    {
        $dependency = require_once WP_PLUGIN_KIT_DIR . '/build/index.asset.php';

        return [
            'wp-plugin-kit-app' => [
                'src'       => WP_PLUGIN_KIT_BUILD . '/index.js',
                'version'   => $dependency['version'],
                'deps'      => $dependency['dependencies'],
                'in_footer' => true,
            ],
        ];
    }

    /**
     * Register styles.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function register_styles(array $styles)
    {
        foreach ($styles as $handle => $style) {
            wp_register_style($handle, $style['src'], $style['deps'], $style['version']);
        }
    }

    /**
     * Register scripts.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function register_scripts(array $scripts)
    {
        foreach ($scripts as $handle => $script) {
            wp_register_script($handle, $script['src'], $script['deps'], $script['version'], $script['in_footer']);
        }
    }

    /**
     * Enqueue admin styles and scripts.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function enqueue_admin_assets()
    {

        // It getting from admin menu page URL, no need to check NonceVerification
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if (!is_admin() || !isset($_GET['page']) || sanitize_text_field(wp_unslash($_GET['page'])) !== 'wp-plugin-kit') {
            return;
        }

        wp_enqueue_style('wp-plugin-kit-app');
        wp_enqueue_script('wp-plugin-kit-app');

        wp_localize_script('wp-plugin-kit-app', 'wpPluginKitParams', []);
    }
}
