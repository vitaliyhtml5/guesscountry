import {checkResult} from './checkResult.js';

const createTest = (data, testDetails, count, result) => {
    const hint =  document.querySelector('.hint');
    const answer = document.querySelector('.answer');
    const question = document.querySelector('.question');
    const orderAnswer = getRandomArr(testDetails.options);
    document.querySelector('.utility-wrap').style.display = 'block';

    //Create answers
    answer.innerHTML = ``; 
    for (let i = 0; i < testDetails.options; i++) {
        answer.innerHTML += `<label><input type="radio" name="country"><span></span></label>`;
    }
    
    const label = document.querySelectorAll('.answer label');
    orderAnswer.forEach((el,index) => {
        if (index === 0) label[el].innerHTML = `<input type="radio" name="country">${data[count].country}<span></span>`;
        else label[el].innerHTML = `<input type="radio" name="country">${data[count].incorrect[index-1]}<span></span>`;
    });
    
    document.querySelector('.counter').textContent = `${count+1} / 10`;

    //Create question
    if (testDetails.type === 'map') {
        question.innerHTML = `<img src="img/${testDetails.type}/${data[count].map}" data-type="map">`;
    } else if (testDetails.type === 'flag') {
        question.innerHTML = `<img src="img/${testDetails.type}/${data[count].flag}" data-type="flag">`;
    } else if (testDetails.type === 'capital') {
        question.innerHTML = `<b>${data[count].capital}</b>`;
    }

    //Create hint for all
    if (testDetails.geography === 'all') {
        hint.innerHTML = `Hint<span>${data[count].geography}</span>`;
        hint.style.display = 'inline-block';
    }
    else hint.style.display = 'none';

    checkResult(data, testDetails, count, result);
}

function getRandomArr(options) {
    const random = () => Math.floor(Math.random() * options);
    const arr = [];
    let i = 0;

    while (i < options) {
        let index = random();
        if (arr.includes(index)) continue;
        else {
            arr.push(index);
            i++;
        }
    }
    return arr;
}

export {createTest};