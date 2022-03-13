import {createTest} from './createTest.js';
import {loginPage,createPage} from './createPage.js';
import {login} from './login.js';

//Default test details
const testDetails = {
    options: 3,
    geography: 'all',
    type: 'flag',
    timer: 'none',
}

getAccess();
async function getAccess() {
    const res = await fetch('./php_scripts/get_access.php');
    const result = await res.json();

    if (result.message === 'Access is allowed') createPage(testDetails);
    else {
        loginPage();
        document.querySelector('.login-wrap').addEventListener('submit', e => {
            e.preventDefault();
            login(testDetails);
        });
    }
}

async function getData(counter, testDetails) {
    const res = await fetch(`./php_scripts/get_quiz.php?geography=${testDetails.geography}&type=${testDetails.type}&options=${testDetails.options}`);
    const data = await res.json();
    createTest(data, testDetails, counter, 0);
}

export {getData};