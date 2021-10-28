import fs from 'fs';
import { T0 } from "./studies/tekenradar/surveys/T0";

console.log(T0.G2.Q3.QMEDHIST.key)

const outputRoot = './output';

if (!fs.existsSync(outputRoot)) {
    fs.mkdirSync(outputRoot, { recursive: true })
}

fs.writeFile(outputRoot + '/T0.json', T0.getSurveyJSON(true), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('File saved!');
});