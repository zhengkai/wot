import { Component, OnInit } from '@angular/core';
import { Data } from '../data.class';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	list = [];

	levelRange = [];
	typeName = ['LT', 'MT', 'HT', 'TD', 'SPG'];

	rowKey = [
		'name',
		'level',
		'type',
		'damage',
		'assist',
		'winpower',
		'daypower',
		'spotted',
		'xp',
	];

	filter = {
		level: [],
		type: [],
	};

	lastSort = '';

	constructor() {
		this.levelRange = Array(10).fill(null).map((v, i) => i + 1);
	}

	async ngOnInit() {
		const res = await Data.list();

		Object.entries(res).forEach(([k, v]) => {
			v.show = true;
			this.list.push(v);
		});

		this.sort('level', false);

		console.log(JSON.stringify(this.list[0]));
	}

	levelClick(i: number) {

		const le = this.filter.level;
		if (!i) {
			le.length = 0;
			this.result();
			return;
		}

		const index = le.indexOf(i);
		if (index < 0) {
			le.push(i);
		} else {
			le[index] = null;
		}

		this.filter.level = le.filter(v => !!v).sort((a, b) => a - b);

		this.result();
	}

	typeClick(t: string) {

		const ty = this.filter.type;
		if (!t) {
			ty.length = 0;
			this.result();
			return;
		}

		const index = ty.indexOf(t);
		if (index < 0) {
			ty.push(t);
		} else {
			ty[index] = null;
		}

		this.filter.type = ty.filter(v => !!v).sort();

		this.result();
	}

	sortClick(key: string) {
		const asc = key === this.lastSort;
		this.lastSort = asc ? '' : key;
		this.sort(key, asc);
	}

	sort(key: string, asc = true) {

		const sortString = ['type', 'name'].includes(key);

		this.list.sort((a, b) => {
			a = a[key];
			b = b[key];
			if (!asc) {
				[a, b] = [b, a];
			}
			if (sortString) {
				return a.localeCompare(b);
			}
			return a - b;
		});
	}

	result() {

		const le = this.filter.level;
		const ty = this.filter.type;

		this.list.map((v) => {
			v.show = true;
			if (le.length % 10 !== 0) {
				v.show = le.includes(v.level);
				if (!v.show) {
					return;
				}
			}
			if (ty.length % 5 !== 0) {
				v.show = ty.includes(v.type);
				if (!v.show) {
					return;
				}
			}
		});
	}

}
