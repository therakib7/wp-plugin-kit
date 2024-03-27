<?php

namespace Therakib7\WpPluginKit\Abstracts;

/**
 * Abstract class to handle the seeder classes.
 *
 * @since 0.1.0
 */
abstract class DBSeeder {

    /**
     * Seeder table_name
     *
     * @var string
     */
    protected static $table_name = '';

    /**
     * Run the seeders of the database.
     *
     * @since 0.1.0
     *
     * @return void
     */
    abstract public function run();
}
