import { Component, OnInit } from '@angular/core';
import { Data } from '../data.class';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	list = [];

	constructor() {
	}

	async ngOnInit() {
		const res = await Data.fetch();

		Object.entries(res).forEach(([k, v]) => {
			v.id = +k;
			this.list.push(v);
		});
	}
}
