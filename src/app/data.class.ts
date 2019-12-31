import { environment } from '../environments/environment';

interface ISubData {
	[key: string]: any;
}

interface ICache {
	[key: string]: ISubData;
}

export class Data {

	static init = false;
	static cache = {} as ICache;

	static typeShort = {
		mediumTank: 'MT',
		lightTank: 'LT',
		heavyTank: 'HT',
		SPG: 'SPG',
		'AT-SPG': 'TD',
	};

	static async list() {

		if (this.init) {
			return this.cache.data;
		}

		await Promise.all([
			this._fetch('tank'),
			this._fetch('typename'),
			this._fetch('data'),
		]);

		Object.entries(this.cache.data).forEach(([k, v]) => {
			const t = this.cache.tank[k];
			v.id = +k;
			v.name = t.alias;
			v.level = t.level;
			v.type = this.typeShort[t.entype];
		});

		// console.log(this.cache.data);

		this.init = true;
		return this.cache.data;
	}

	static async _fetch(name: string) {
		const res = await fetch(`${environment.path}assets/${name}.json`);
		const text = await res.text();
		const j = JSON.parse(text) as ISubData;
		this.cache[name] = j;
		return j;
	}
}
