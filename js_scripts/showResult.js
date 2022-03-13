import {createPage} from './createPage.js';

const showResult = (testResult, testDetails) => {
    const text = ['Wow! You\'re the best', 'Well done!', 'You may try one more'];
    const img = ['cool.svg', 'smile.svg', 'sad.svg'];

    if (testResult === 100) createFinishPage(0);
    else if (testResult >= 70 && testResult < 100) createFinishPage(1);
    else if (testResult < 70) createFinishPage(2);

    function createFinishPage(index) {
        document.querySelector('.utility-wrap').style.display = 'none';
        document.querySelector('.content-wrap').innerHTML = `
        <div class="result-page">
            <h2>${text[index]}</h2>
            <b>Your result is ${testResult}%</b>
            <img src="img/${img[index]}">
            <button>Try again</button>
        </div>`;
    }

    //Start again
    if (testDetails.timer !== 'none') testDetails.timer = `${testDetails.timer}s`;
    document.querySelector('.result-page button').onclick = () => createPage(testDetails);
}

export {showResult};