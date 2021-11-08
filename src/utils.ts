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

    // Study rules:
    generateStudyRuleFile(study, outputRoot, pretty);

    // Custom Study rules: (manually triggered rules)
    generateCustomStudyRules(study, outputRoot, pretty);


}

const generateSurveyFiles = (study: Study, outputPath: string, pretty?: boolean) => {
    if (study.surveys.length > 0) {
        Logger.log(`\tSurveys:`);
    } else {
        Logger.log(`\tNo surveys in the study.`)
    }
    const surveyOutPath = `${outputPath}/surveys`;
    if (!fs.existsSync(surveyOutPath)) {
        fs.mkdirSync(surveyOutPath, { recursive: true })
    }
    study.surveys.forEach(survey => {
        const fileName = `${surveyOutPath}/${survey.key}.json`;
        const outputObject = {
            studyKey: study.studyKey,
            survey: survey.getSurvey()
        }
        try {
            fs.writeFileSync(fileName, JSON.stringify(outputObject, undefined, pretty ? 2 : undefined));
        } catch (err) {
            Logger.error(err);
            return;
        }
        Logger.success(`\t\t${survey.key} saved`);
    })
}

const generateStudyRuleFile = (study: Study, outputPath: string, pretty?: boolean) => {
    if (!study.studyRules) {
        Logger.log(`\tNo study rules in the study.`)
        return;
    } else {
        Logger.log(`\tStudy rule:`)
    }

    const fileName = `${outputPath}/studyRules.json`;
    const outputObject = study.studyRules.get();

    try {
        fs.writeFileSync(fileName, JSON.stringify(outputObject, undefined, pretty ? 2 : undefined));
    } catch (err) {
        Logger.error(err);
        return;
    }

    Logger.success(`\t\tStudy rules saved`);
}

const generateCustomStudyRules = (study: Study, outputPath: string, pretty?: boolean) => {
    if (!study.customStudyRules || study.customStudyRules.length < 0) {
        Logger.log(`\tNo custom study rules in the study.`)
        return;
    } else {
        Logger.log(`\tCustom study rules:`)
    }

    const customRulePath = `${outputPath}/customRules`;
    if (!fs.existsSync(customRulePath)) {
        fs.mkdirSync(customRulePath, { recursive: true })
    }

    study.customStudyRules.forEach(studyRule => {
        const fileName = `${customRulePath}/${studyRule.name}.json`;
        const outputObject = studyRule.rules;

        try {
            fs.writeFileSync(fileName, JSON.stringify(outputObject, undefined, pretty ? 2 : undefined));
        } catch (err) {
            Logger.error(err);
            return;
        }

        Logger.success(`\t\tRule ${studyRule.name} saved`);
    })

}