import {createTest} from './createTest.js';
import {createPage} from './createPage.js';

//Default test details
const testDetails = {
    options: 3,
    geography: 'all',
    type: 'flag',
    timer: 'none',
}

createPage(testDetails);

async function getData(counter, testDetails) {
    const res = await fetch(`./php_scripts/get_quiz.php?geography=${testDetails.geography}&type=${testDetails.type}&options=${testDetails.options}`);
    const data = await res.json();
    createTest(data, testDetails, counter, 0);
}

export {getData};