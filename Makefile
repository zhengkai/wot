SHELL:=/bin/bash

NG := "./node_modules/@angular/cli/bin/ng"

default:
	$(NG) serve --port 22005 --host 127.0.0.1 --public-host hw-test.9farm.com

ssr:
	npm run build:ssr
	PORT=22005 npm run serve:ssr

prod:
	$(NG) build --prod --base-href 'https://zhengkai.github.io/wot/'
	rm -rf docs/*
	mv dist/browser/* docs/

init:
	npm i
