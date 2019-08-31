#!/usr/bin/env node
const fs = require('fs');
const iconv = require('iconv-lite');

let inputIndex: number = process.argv.indexOf('-I') || process.argv.indexOf('--input');
let outputIndex: number = process.argv.indexOf('-O') || process.argv.indexOf('--output');

let inputPathFile: string = (inputIndex > 0 && process.argv[inputIndex + 1] ) ? process.argv[inputIndex + 1] : null;
let outputFile: string = (inputIndex > 0 && process.argv[outputIndex + 1] ) ? process.argv[outputIndex + 1] : `${inputPathFile} fixed`;

outputFile = !outputFile.includes('.srt') ? `${outputFile}.srt` : outputFile;

if (!inputPathFile) throw Error('🚨  You should specify input value with either -i or --input flag');

const buffer: Buffer = fs.readFileSync(inputPathFile);

const decodedSub: string = iconv.decode(buffer, 'cp1256');

fs.writeFileSync(outputFile, decodedSub, 'UTF-8');
