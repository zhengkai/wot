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
		const res = await Data.list();

		Object.entries(res).forEach(([k, v]) => {
			this.list.push(v);
		});
	}
}
