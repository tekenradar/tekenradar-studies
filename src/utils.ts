import fs from 'fs';
import { Logger } from "./case-editor/logger/logger";
import { Study } from "./case-editor/types/study";

export const generateFilesForStudy = (study: Study, pretty?: boolean) => {
    const outputName = study.outputFolderName ? study.outputFolderName : study.studyKey;
    const outputRoot = `./output/${outputName}`;

    Logger.log(`Start generating files for study ${outputName}.`);

    if (!fs.existsSync(outputRoot)) {
        fs.mkdirSync(outputRoot, { recursive: true })
    }

    // Surveys:
    generateSurveyFiles(study, outputRoot, pretty);


}

const generateSurveyFiles = (study: Study, outputPath: string, pretty?: boolean) => {
    if (study.surveys.length > 0) {
        Logger.log(`\tSurveys:`);
    } else {
        Logger.log(`\tNo surveys in the study.`)
    }
    study.surveys.forEach(survey => {
        const fileName = `${outputPath}/${survey.key}.json`;
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