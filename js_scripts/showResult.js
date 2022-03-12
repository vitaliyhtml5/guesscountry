const showResult = testResult => {
    const text = ['Wow! You\'re the best', 'Well done!', 'You may try one more'];
    const img = ['cool.svg', 'smile.svg', 'sad.svg'];

    if (testResult === 100) createPage(0);
    else if (testResult >= 70 && testResult < 100) createPage(1);
    else if (testResult < 70) createPage(2);

    function createPage(index) {
        document.querySelector('.utility-wrap').innerHTML = '';
        document.querySelector('.content-wrap').innerHTML = `
        <div class="result-page">
            <h2>${text[index]}</h2>
            <b>Your result is ${testResult}%</b>
            <img src="img/${img[index]}">
            <button>Try again</button>
        </div>`;
    }

    //Reload page
    document.querySelector('.result-page button').onclick = () => location.reload();
}

export {showResult};