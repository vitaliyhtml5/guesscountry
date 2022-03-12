import {checkResult} from './checkResult.js';

const createTest = (data, type, geography, number, count, result, timer) => {
    const answer = document.querySelector('.answer');
    const question = document.querySelector('.question');
    const orderAnswer = getRandomArr(number);

    //Create answers
    answer.innerHTML = ``; 
    for (let i = 0; i < number; i++) {
        answer.innerHTML += `<label><input type="radio" name="country"><span></span></label>`;
    }
    
    const label = document.querySelectorAll('.answer label');
    orderAnswer.forEach((el,index) => {
        if (index === 0) label[el].innerHTML = `<input type="radio" name="country">${data[count].country}<span></span>`;
        else label[el].innerHTML = `<input type="radio" name="country">${data[count].incorrect[index-1]}<span></span>`;
    });
    
    document.querySelector('.counter').textContent = `${count+1} / 10`;

    //Create question
    if (type === 'map') {
        question.innerHTML = `<img src="img/${type}/${data[count].map}" data-type="map">`;
    } else if (type === 'flag') {
        question.innerHTML = `<img src="img/${type}/${data[count].flag}" data-type="flag">`;
    } else if (type === 'capital') {
        question.innerHTML = `<b>${data[count].capital}</b>`;
    }

    //Create hint for all
    if (geography === 'all') {
        document.querySelector('.hint').innerHTML = `Hint<span>${data[count].geography}</span>`;
    } else {
        document.querySelector('.hint').style.display = 'none';
    }

    checkResult(data, type, geography, number, count, result, timer);
}

function getRandomArr(number) {
    const random = () => Math.floor(Math.random() * number);
    const arr = [];
    let i = 0;

    while (i < number) {
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