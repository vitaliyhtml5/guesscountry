import {createTest} from './createTest.js';
import {showResult} from './showResult.js';

const checkResult = (data, testDetails, count, result) => {
    const answer = document.querySelector('.quiz-wrap .answer');
    const label = document.querySelectorAll('.quiz-wrap label');
    const btn = document.querySelector('.check-btn-wrap button');
    let correctIndex;
    let testResult = result;
    let countTime;

    if (count === 9) btn.textContent = 'Finish';
    if (testDetails.timer !== 'none') setTimer();
    
    btn.onclick = e => {
        e.preventDefault();
        clearInterval(countTime);
        answer.classList.remove('result-show');

        if (btn.textContent === 'Next') createTest(data, testDetails, count+1, testResult);
        else if (btn.textContent === 'Finish') showResult(testResult, testDetails);
    }

    label.forEach( (el,index) => {
        //Get index of correct label
        if (el.innerText === data[count].country) correctIndex = index;

        //Check answer
        el.onclick = () => {
            document.querySelectorAll('.quiz-wrap input').forEach(el => el.disabled = true);
            clearInterval(countTime);
            showAnswer(label[index]);
            answer.classList.add('result-show');
        }
    });

    //Add styles for label + calculate result 
    function showAnswer(checkedAnsw) {
        if (checkedAnsw.innerText === data[count].country) {
            checkedAnsw.classList.add('correct-answ');
            testResult += 10;
        } else {
            checkedAnsw.classList.add('incorrect-answ');
            checkedAnsw.style.color = '#f94457';
        }
        label[correctIndex].style.color = '#348837';
    }

    //Set timer
    function setTimer() {
        let testTime = testDetails.timer;
    
        document.querySelector('.timer').textContent = testDetails.timer;
        
        countTime = setInterval(() => {
            testTime--;
            document.querySelector('.timer').textContent = testTime;
           
            if (testTime === 0) {
                clearInterval(countTime);
                answer.classList.add('result-show');
            }
        }, 1000);
    }
}

export {checkResult};