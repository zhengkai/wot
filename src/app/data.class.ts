interface IData {
	[key: string]: any;
}

export class Data {

	static cache: IData;

	static async fetch() {

		if (this.cache) {
			return this.cache;
		}

		const res = await fetch('/assets/data.json');
		const text = await res.text();
		const j = JSON.parse(text) as IData;
		this.cache = j;
		return j;
	}
}
