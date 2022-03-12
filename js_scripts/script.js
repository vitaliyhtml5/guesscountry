import {createTest} from './createTest.js';

const test = {
    geography: 'europe',
    type: 'flag',
    count: 3,
    timer: 5,
}

getData(0);
async function getData(counter) {
    const res = await fetch(`./php_scripts/get_quiz.php?geography=${test.geography}&type=${test.type}&count=${test.count}`);
    const data = await res.json();
    createTest(data, test.type, test.geography, test.count, counter, 0, test.timer);
}