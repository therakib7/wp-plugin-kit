const fs = require('fs-extra');
const replace = require('replace-in-file');

const pluginFiles = ['includes/**/*', 'src/*', 'wp-plugin-kit.php'];

const { version } = JSON.parse(fs.readFileSync('package.json'));

replace({
	files: pluginFiles,
	from: /WP_PLUGIN_KIT_SINCE/g,
	to: version,
});
