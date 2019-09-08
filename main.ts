#!/usr/bin/env node
const fs = require('fs');
const iconv = require('iconv-lite');
const inquirer = require('inquirer');
const PathPrompt = require('inquirer-path').PathPrompt;

let inputIndex: number = process.argv.indexOf('-I') || process.argv.indexOf('--input');
let outputIndex: number = process.argv.indexOf('-O') || process.argv.indexOf('--output');

if (inputIndex>= 0 && outputIndex>= 0) {
    const inputPathFile = (inputIndex > 0 && process.argv[inputIndex + 1]) ? process.argv[inputIndex + 1] : null;
    let outputPathFile: string = (inputIndex > 0 && process.argv[outputIndex + 1]) ? process.argv[outputIndex + 1] : `${inputPathFile} fixed`;

    outputPathFile = !outputPathFile.includes('.srt') ? `${outputPathFile}.srt` : outputPathFile;

    if (!inputPathFile) throw Error('🚨  You should specify input value with either -I or --input flag');

    ReadDecodeSave(inputPathFile, outputPathFile);
} else {
    const questions = [
        {
            type: 'path',
            name: 'inputPathFile',
            message: 'Please enter subtitle relative file path.\n',
        },
        {
            type: 'path',
            name: 'outputPathFile',
            message: 'Please enter output relative file path',
        },
    ];
    inquirer.registerPrompt('path', PathPrompt);
    inquirer.prompt(questions).then(answers => {
        let {inputPathFile, outputPathFile} = answers;
        ReadDecodeSave(inputPathFile, outputPathFile);
    });
}

function ReadDecodeSave(inputPathFile: string, outputFile: string): void {

    const buffer: Buffer = fs.readFileSync(inputPathFile);

    const decodedSub: string = iconv.decode(buffer, 'cp1256');

    fs.writeFileSync(outputFile, decodedSub, 'UTF-8');
}
