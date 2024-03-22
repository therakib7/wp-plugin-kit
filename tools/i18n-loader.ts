import { setLocaleData } from '@wordpress/i18n';
import MD5 from 'md5-es';

type DomainPath<T extends {}> = keyof T;

class I18nLoader {
	constructor() {
		// @ts-ignore
		this.state = window.wpPluginKitI18nState;
	}

	locationMap = {
		plugin: 'plugins/',
		theme: 'themes/',
		core: '',
	};

	state = {
		baseUrl: null,
		locale: null,
		domainMap: {},
		domainPaths: {},
	};

	private getPathPrefix<T extends DomainPath<typeof this.state.domainPaths>>(domain: T) {
		if (domain in this.state.domainPaths) {
			return this.state.domainPaths[domain];
		}
		return '';
	}

	private hasOwn(obj: {}, prop: string) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	async downloadI18n(path: string, domain: DomainPath<typeof this.state.domainPaths>, location: keyof typeof this.locationMap) {
		const state = this.state;

		if (state.locale === 'en_US') {
			return;
		}

		if (typeof fetch === 'undefined') {
			throw new Error('Fetch API is not available.');
		}

		// Extract any query part and hash the script name like WordPress does.
		const pathPrefix = this.getPathPrefix(domain);

		let hash, query;
		const i = path.indexOf('?');
		if (i >= 0) {
			hash = MD5.hash((pathPrefix + path.substring(0, i)).replace(/\\/g, '/'));
			query = path.substring(i);
		} else {
			hash = MD5.hash((pathPrefix + path).replace(/\\/g, '/'));
			query = '';
		}

		// Download.
		const locationAndDomain = this.hasOwn(state.domainMap, domain)
			? state.domainMap[domain]
			: this.locationMap[location] + domain;

		const res = await fetch(
			`${state.baseUrl}${locationAndDomain}-${state.locale}-${hash}.json${query}`
		);
		if (!res.ok) {
			throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
		}

		const data = await res.json();

		// Extract the messages from the file and register them.
		const localeData = this.hasOwn(data.locale_data, domain)
			? data.locale_data[domain]
			: data.locale_data.messages;
		localeData[''].domain = domain;
		setLocaleData(localeData, domain);
	}
}

// Register the module
const wpPluginKitI18nLoader = new I18nLoader();
(window as any).wpPluginKitI18nLoader = wpPluginKitI18nLoader;
