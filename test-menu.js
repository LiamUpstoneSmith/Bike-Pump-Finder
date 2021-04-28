import { Selector } from 'testcafe';

fixture `demo menu`
    .page `http://localhost:8080/index.html`;

test('Search by name', async function(t) {
    await t
        .click('#demo-menu')
        .click(Selector('#demo-menu > option').filter('[value="3"]'))
        .expect(Selector('#demo-menu').value).eql('3');
});

