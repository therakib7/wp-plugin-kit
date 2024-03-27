<?php

namespace Therakib7\WpPluginKit\Database\Seeders;

use Therakib7\WpPluginKit\Database\Seeders\Types\{
    Products,
    ProductCategories
};
/**
 * Database Seeder class.
 *
 * It'll seed all of the seeders.
 *
 * @since 0.1.0
 */
class Manager {

    /**
     * Run the database seeders.
     *
     * @since 0.1.0
     *
     * @return void
     * @throws \Exception
     */
    public function run() {

        $seeder_classes = [
            Products::class,
            ProductCategories::class,
        ];

        foreach ( $seeder_classes as $seeder_class ) {
            $seeder = new $seeder_class();
            $seeder->run();
        }
    }
}
