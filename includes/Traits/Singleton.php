<?php
namespace Therakib7\WpPluginKit\Traits;

/**
 * Implements the Singleton Design Pattern.
 *
 * @since 0.1.0
 */

trait Singleton {

    /**
     * Store the singleton object.
     *
     * @since 0.1.0
     */
    private static $singleton = false;

    /**
     * Fetch an instance of the class.
     *
     * @since 0.1.0
     *
     * @return self Returns the singleton instance of the class.
     */
    public static function init() {
        if ( self::$singleton === false ) {
            self::$singleton = new self();
        }

        return self::$singleton;
    }
}
