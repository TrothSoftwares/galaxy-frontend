import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('initialize-semanticuitabs', 'Integration | Component | initialize semanticuitabs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{initialize-semanticuitabs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#initialize-semanticuitabs}}
      template block text
    {{/initialize-semanticuitabs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
