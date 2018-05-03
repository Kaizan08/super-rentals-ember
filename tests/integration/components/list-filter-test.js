import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | list-filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{list-filter}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#list-filter filter=(action filterByCity) as |results|}} 
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}]
          </li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `);

    await fillIn(this.element.querySelector('.list-filter input'), 's');
    await triggerKeyEvent(this.element.querySelector('.list-filter input'), "keyup", 83);
   
    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    });
  });
});
