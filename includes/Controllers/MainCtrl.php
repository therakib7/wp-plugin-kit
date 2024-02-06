<?php

namespace WpPluginKit\Controllers;

use WpPluginKit\Traits\Singleton;
use WpPluginKit\Controllers\{
    Api\ApiCtrl,
    MenuPage\MenuPageCtrl,
    Asset\AssetCtrl
};
use WpPluginKit\Setup\Installer;

/**
 * Main controller
 *
 * @since 0.1.0
 *
 * All the others controller load here
 */
class MainCtrl {

    use Singleton;

    public function __construct() {
        new MenuPageCtrl();
        new AssetCtrl();
        new ApiCtrl();
        new Installer();
    }
}
