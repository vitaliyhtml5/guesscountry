import {getData} from './script.js';

const createPage = testDetails => {
    document.querySelector('.content-wrap').innerHTML = `
    <div class="preview-page">
        <h2>Quiz details</h2>
        <div class="preview-wrap">
            <span>${testDetails.options}</span>
            <span>${testDetails.geography}</span>
            <span>${testDetails.type}</span>
            <span>${testDetails.timer}</span>
        </div>
        <div class="preview-btn">
            <button>Settings</button>
            <button>Start</button>
        </div>
    </div>`;
    document.querySelectorAll('.preview-btn button')[0].onclick = createSettings;
    document.querySelectorAll('.preview-btn button')[1].onclick = createTestPage;

    function createSettings() {
        document.querySelector('.content-wrap').innerHTML = `
        <div class="settings-page">
            <h2>Settings</h2>
            <div class="settings-wrap">
                <fieldset>
                    <legend>Options:</legend>
                    <label><input type="radio" name="options"><span></span>2</label>
                    <label><input type="radio" name="options"><span></span>3</label>
                    <label><input type="radio" name="options"><span></span>4</label>
                </fieldset>
                <fieldset>
                    <legend>Geography:</legend>
                    <label><input type="radio" name="part"><span></span>all</label>
                    <label><input type="radio" name="part"><span></span>europe</label>
                    <label><input type="radio" name="part"><span></span>asia</label>
                    <label><input type="radio" name="part"><span></span>america</label>
                    <label><input type="radio" name="part"><span></span>africa</label>
                </fieldset>
                <fieldset>
                    <legend>Type:</legend>
                    <label><input type="radio" name="type"><span></span>flag</label>
                    <label><input type="radio" name="type"><span></span>capital</label>
                    <label><input type="radio" name="type"><span></span>map</label>
                </fieldset>
                <fieldset>
                    <legend>Timer:</legend>
                    <label><input type="radio" name="timer"><span></span>none</label>
                    <label><input type="radio" name="timer"><span></span>5s</label>
                    <label><input type="radio" name="timer"><span></span>10s</label>
                </fieldset>
            </div>
            <div class="preview-btn">
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>`;
    
        const label = document.querySelectorAll('.settings-wrap label');
        const input = document.querySelectorAll('.settings-wrap input');
        const btn = document.querySelectorAll('.preview-btn button');
        const settings = [];
    
        //Set checked input
        const values = Object.values(testDetails);
        label.forEach((el, index) => {
            if (String(values).includes(el.innerText.toLowerCase())) {
                input[index].checked = true;
            }
        });
    
        //Set button behavior
        btn[0].onclick = () => createPage(testDetails);
        btn[1].onclick = () => {
            input.forEach((el,index) => {
                if (el.checked) settings.push(label[index].innerText.toLowerCase());
            });
    
            const testDetailsNew = {
                options: settings[0],
                geography: settings[1],
                type: settings[2],
                timer: settings[3],
            }
            createPage(testDetailsNew);
        }
    }

    function createTestPage() {
        const details = document.querySelectorAll('.preview-wrap span');
        const testDetails = {
            options: details[0].textContent,
            geography: details[1].textContent,
            type: details[2].textContent,
            timer: details[3].textContent,
        }

        if (testDetails.timer !== 'none') testDetails.timer = parseInt(testDetails.timer);

        document.querySelector('.content-wrap').innerHTML = ` 
        <h2>What is the country here?</h2>
        <b class="timer"></b>
        <form class="quiz-wrap">
            <div class="answer"></div>
            <div class="question"></div>
            <div class="check-btn-wrap">
                <button>Next</button>
            </div>
        </form>`;
        
        getData(0, testDetails);
    }
}

export {createPage};