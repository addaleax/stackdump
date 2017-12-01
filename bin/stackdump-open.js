#!/usr/bin/env node
'use strict';
const output = require('./stackdump-html.js');
const opn = require('opn');

opn(output);
