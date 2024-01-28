<?php
namespace WpPluginKit\Ctrl\MenuPage;

use WpPluginKit\Ctrl\MenuPage\Type\{
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
