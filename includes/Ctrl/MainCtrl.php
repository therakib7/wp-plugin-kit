<?php

namespace WpPluginKit\Ctrl;

use WpPluginKit\Traits\Singleton;
use WpPluginKit\Ctrl\{
    Api\ApiCtrl,
    MenuPage\MenuPageCtrl,
    Asset\AssetCtrl
};

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
    }
}
