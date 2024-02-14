# WP Plugin Kit

A startup kit for WordPress plugin developer

----

## What's included?

* WordPress Rest API
* WP-script Setup
* React
* React Router
* TypeScript
* Tailwind CSS [Nested + ]
* SCSS
* PostCSS
* Eslint
* WP-Data
* WP-Data Redux Store [Redux Saga, Generator function, Thunk, Saga Middleware]
* React Components
* React CRUD Operations - Create, Read, Update, Delete, Status changes and so many...
* Internationalization - WP i18n
* PHPUnit Test [Test + Fix]
* JestUnit Test
* WordPress Playwright e2e Test
* PHP OOP plugin architecture [Traits + Interfaces + Abstract Classes]
* Gutenberg blocks, Dynamic blocks

### Quick Start

```sh
# Clone the Git repository
git clone https://github.com/therakib7/wp-plugin-kit.git

# Install PHP-composer dependencies [It's empty]
composer install

# Install node module packages
npm i

# Start development mode
npm start

# Start development with hot reload (Frontend components will be updated automatically if any changes are made)
npm run start:hot

# To run in production
npm run build
```

After running `start`, or `build` command, there will be a folder called `/build` will be generated at the root directory.

### Activate the plugin

You need activate the plugin from plugin list page.

### Zip making process [Build, Localization, Version replace & Zip]

```sh
# One by one.
npm run build
npm run makepot
npm run version
npm run zip

# Single release command - which actually will run the above all in single command.
npm run release
```

After running `release` command, there will be a folder called `/dist` will be generated at the root directory with `wp-plugin-kit.zip` project files.


### WP-CLI command to refresh data

```sh
wp wp_plugin_kit_refresh
```

### Run PHP Unit Test

Before run test, check file `wp-config` from `/tests/phpunit`

```sh
composer run test
```

### Run all tests by single command - PHPCS, PHPUnit

```sh
composer run test:all
```

### Run Jest Unit Test

```sh
npm run test:unit
```

### PHP Coding Standards - PHPCS

**Get all errors of the project:**

```sh
composer run phpcs
```

**Fix all errors of the project:**

```sh
composer run phpcbf
```

**Full Composer test run:**

```sh
composer run test:all
```

### Run Playwright e2e Test

Playwright doc link: <https://playwright.dev/docs/running-tests>

**Requirements:**

Must have docker installed and running by ensuring these commands

```sh
npm run env:stop
npm run env:start
```

**Normal e2e test:**

```sh
npm run test:e2e
```

**Interactive e2e test:**

```sh
npm run test:e2e:watch
```

For more about e2e Tests running please check - <https://playwright.dev/docs/running-tests>