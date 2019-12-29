interface ISubData {
	[key: string]: any;
}

interface ICache {
	[key: string]: ISubData;
}

export class Data {

	static init = false;
	static cache = {} as ICache;

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
			v.type = t.type;
		});

		this.init = true;
		return this.cache.data;
	}

	static async _fetch(name: string) {
		const res = await fetch(`/assets/${name}.json`);
		const text = await res.text();
		const j = JSON.parse(text) as ISubData;
		this.cache[name] = j;
		return j;
	}
}
