//We generate an object answers for a module

function generateAnswers(answers, guideline_pks) {
    const answerComplete = {};

    for (let i = 0; i < guideline_pks.length; i++) {
        answerComplete[guideline_pks[i]] = answers[guideline_pks[i]]
            ? answers[guideline_pks[i]]
            : {};
    }

    return answerComplete;
}

function getGuidelinesArray(guidelines, guideline_pks) {
    let arrayGuidelines = [];
    for (let i = 0; i < guideline_pks.length; i++) {
        arrayGuidelines.push(guidelines[guideline_pks[i]]);
    }

    return arrayGuidelines;
}

function getGuidelinesObject(guidelines, guideline_pks) {
    const guidelinesObject = {};

    for (let i = 0; i < guideline_pks.length; i++) {
        guidelinesObject[guideline_pks[i]] = guidelines[guideline_pks[i]];
    }

    return guidelinesObject;
}

function getModules(modules, module_pks) {
    let arrayModules = [];

    for (let i = 0; i < module_pks.length; i++) {
        arrayModules.push(modules[module_pks[i]]);
    }

    return arrayModules;
}

export default {
    generateAnswers,
    getGuidelinesArray,
    getGuidelinesObject,
    getModules,
};
