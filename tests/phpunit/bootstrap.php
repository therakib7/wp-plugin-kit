<?php

// namespace WpPluginKit\Tests;

/**
 * PHPUnit bootstrap file
 *
 * @since 0.1.0
 */

// Composer autoloader must be loaded before WP_PHPUNIT__DIR will be available
require_once dirname(__FILE__, 3) . '/vendor/autoload.php';
$_tests_dir = getenv('WP_TESTS_DIR') ? getenv('WP_TESTS_DIR') : getenv('WP_PHPUNIT__DIR');

if (!$_tests_dir) {
	$_tests_dir = rtrim(sys_get_temp_dir(), '/\\') . '/wordpress-tests-lib';
}

if (!file_exists("{$_tests_dir}/includes/functions.php")) {
	echo "Could not find {$_tests_dir}/includes/functions.php, have you run bin/install-wp-tests.sh ?" . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit(1);
}

// Give access to tests_add_filter() function.
require_once "{$_tests_dir}/includes/functions.php";

/**
 * Manually load the plugin being tested.
 *
 * @since 0.1.0
 *
 * @return void
 */
function manually_load_plugin()
{
	require_once dirname(dirname(dirname(__FILE__))) . '/wp-plugin-kit.php';
}
tests_add_filter('muplugins_loaded', __NAMESPACE__ . '\\manually_load_plugin');
// Start up the WP testing environment.
require "{$_tests_dir}/includes/bootstrap.php";
