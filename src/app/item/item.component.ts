import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../data.class';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

	id = 0;
	found = true;

	data: any;

	constructor(
		private route: ActivatedRoute,
	) {
		route.params.subscribe(() => {
			this.init();
		});
	}

	async init() {
		const params = this.route.snapshot.params;
		this.id = +params.id;

		const res = await Data.fetch();

		const d = res[this.id];

		if (!d) {
			this.found = false;
			return;
		}

		this.data = d;
	}

	ngOnInit() {
	}
}
