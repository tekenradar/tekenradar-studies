import fs from 'fs';
import { Logger } from './case-editor/logger/logger';
import { Study } from './case-editor/types/study';
import { TekenradarStudy } from './studies/tekenradar';

const studies: Study[] = [
    TekenradarStudy,
];

const readStudyKey = () => {
    if (process.argv.length < 3) {
        Logger.criticalError('Not enough arguments provided.')
        process.exit(-1)
    }
    const args = process.argv.slice(2);
    const studyKeyArg = args.filter(arg => arg.includes("study="));
    if (!studyKeyArg || studyKeyArg.length < 1) {
        Logger.criticalError('Argument "study=<studyKey> is missing.')
        process.exit(1)
    }

    return studyKeyArg[0].replace('study=', '');
}


const generateFilesForStudy = (study: Study, pretty?: boolean) => {
    const outputRoot = `./output/${study.studyKey}`;

    Logger.log(`Start generating files for study ${studyKey}.`);

    if (!fs.existsSync(outputRoot)) {
        fs.mkdirSync(outputRoot, { recursive: true })
    }

    /**
     * Surveys:
     */
    if (study.surveys.length > 0) {
        Logger.log(`\tSurveys:`);
    } else {
        Logger.log(`\tNo surveys in the study.`)
    }
    study.surveys.forEach(survey => {
        const fileName = `${outputRoot}/${survey.key}.json`;
        const outputObject = {
            studyKey: study.studyKey,
            survey: survey.getSurvey()
        }
        fs.writeFile(fileName, JSON.stringify(outputObject, undefined, pretty ? 2 : undefined), (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            Logger.success(`\t\t${survey.key} saved`);
        });
    })
}

const studyKey = readStudyKey();

const currentStudy = studies.filter(study => study.studyKey === studyKey);
if (!currentStudy || currentStudy.length < 1) {
    Logger.log(`No study find with key: ${studyKey}.`);
    process.exit(1)
}

currentStudy.forEach(study => generateFilesForStudy(study, true));