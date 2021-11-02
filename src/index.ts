import { Logger } from './case-editor/logger/logger';
import { Study } from './case-editor/types/study';
import { InfectieradarStudy } from './studies/infectieradar';
import { TekenradarStudy } from './studies/tekenradar';
import { generateFilesForStudy } from './utils';

const studies: Study[] = [
    InfectieradarStudy,
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

const studyKey = readStudyKey();

const currentStudy = studies.filter(study => {
    if (study.outputFolderName && study.outputFolderName === studyKey) {
        return true;
    }
    return study.studyKey === studyKey
});
if (!currentStudy || currentStudy.length < 1) {
    Logger.error(`No study find with key: ${studyKey}.`);
    process.exit(1)
}

currentStudy.forEach(study => generateFilesForStudy(study, true));