<?php

namespace Therakib7\WpPluginKit\Hooks;

use Therakib7\WpPluginKit\Hooks\Types\{
    Action\ActionCtrl,
    Filter\FilterCtrl
};

/**
 * Action & Filter hook
 *
 * @since 0.1.0
 */
class Manager {

    public function __construct() {
        new ActionCtrl();
        new FilterCtrl();
    }
}
