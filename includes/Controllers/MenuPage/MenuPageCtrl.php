<?php
namespace WpPluginKit\Controllers\MenuPage;

use WpPluginKit\Controllers\MenuPage\Types\{
	AdminMenu
};

/**
 * Register Admin Menu 
 *
 * @since 0.1.0
 */
class MenuPageCtrl {

	public function __construct() {
		if ( is_admin() ) {
			new AdminMenu();
		}
	}
}
