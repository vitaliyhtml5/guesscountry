import {createPage} from './createPage.js';

const login = testDetails => {
    const input = document.querySelectorAll('.login-wrap input');
    const errMessage = document.querySelector('.error-message');
    const data = {
        email: input[0].value.toLowerCase(),
        password: input[1].value.toLowerCase()
    }

    //Show and hide errors on FE side
    if (input[0].value.length === 0 || input[1].value.length === 0) showError('Fields can\'t be empty');
    else checkaccess();

    if (errMessage.style.display === 'block') {
        input.forEach(el => {
            el.addEventListener('input', () => errMessage.style.display = 'none');
        });
    }

    async function checkaccess() {
        const res = await fetch('./php_scripts/login.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();

        if (result.message === 'Access is allowed') createPage(testDetails);
        else showError(result.message);
    }

    function showError(message) {
        errMessage.style.display = 'block';
        errMessage.textContent = message;
    }
}

export {login};