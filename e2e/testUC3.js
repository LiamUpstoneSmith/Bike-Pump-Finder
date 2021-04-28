import { Selector } from 'testcafe';

fixture `UC3: Find public bike pump by name`
    .page `http://localhost:8080/index.html`;

test('Search by name', async function(t) {
    await t
        .typeText('#search-box', 'UWE')
        .click('#search-button')
        .expect(Selector('table > tbody').childElementCount).eql(5);
});

