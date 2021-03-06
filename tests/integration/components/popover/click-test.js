import { moduleForComponent, test } from 'ember-qunit';
import { assertTooltipNotVisible, assertTooltipVisible, triggerTooltipTargetEvent, assertTooltipNotRendered } from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('popover-on-element', 'Integration | Option | click', {
  integration: true,
});

test('Popover: click target, click target', function(assert) {

  assert.expect(3);

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipNotVisible(assert);

});

test('Popover: click target, click popover, click target', function(assert) {

  assert.expect(4);

  this.render(hbs`{{popover-on-element event="click"}}`);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.ember-popover' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipNotVisible(assert);

});

test('Popover: click target, click elsewhere', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{popover-on-element event="click"}}
      </div>
    </div>
  `);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.target' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.elsewhere' });

  assertTooltipNotVisible(assert);

});

test('Popover: click target, click popover, click elsewhere', function(assert) {

  assert.expect(4);

  this.render(hbs`
    <div class="elsewhere">
      <div class="target">
        {{popover-on-element event="click"}}
      </div>
    </div>
  `);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.target' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.ember-popover' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.elsewhere' });

  assertTooltipNotVisible(assert);

});

test('Popover: click target-interior, click target-interior', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <p class='target-interior'></p>
    {{popover-on-element event='click'}}
  `);

  const $popoverTarget = this.$();

  assertTooltipNotVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.target-interior' });

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.target-interior' });

  assertTooltipNotVisible(assert);

});

test('Popover: focusin/click input, click input', function(assert) {

  assert.expect(3);

  this.render(hbs`
    <input id="some-input">
    {{popover-on-element event="click" target="#some-input" enableLazyRendering=true}}
  `);

  const $popoverTarget = this.$('#some-input');

  assertTooltipNotRendered(assert);

  /* We intentionally trigger a focusin and click on the $popoverTarget because
  when a user clicks an input both events occur in that order.
  We have fixed this with _isInProcessOfShowing and this test protects that. */

  triggerTooltipTargetEvent($popoverTarget, 'focusin');
  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipVisible(assert);

  triggerTooltipTargetEvent($popoverTarget, 'click');

  assertTooltipNotVisible(assert);

});
