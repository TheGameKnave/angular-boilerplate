import { Selector } from 'testcafe';
import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

const label = Selector('label');

class Feature {
    label: Selector;
    checkbox: Selector;
    button: Selector;

    constructor (text) {
        this.label    = label.withText(text);
        this.checkbox = this.label.find('input[type=checkbox]');
    }
}

class Page {
    exampleButton: Selector;
    constructor () {
        this.exampleButton = Selector('#submit-button');
    }
}

export default new Page();
