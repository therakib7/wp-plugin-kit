<?php

namespace WpPluginKit\Abstracts;

/**
 * Database migration class.
 *
 * Abstract class to handle database migration classes.
 */
abstract class DBMigrator {

	/**
     * Migrator table_name
     *
     * @var string
     */
    protected $table_name = '';

	/**
	 * Migrate the database table.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 * */
	abstract public static function migrate();
}
