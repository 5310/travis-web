import Component from '@ember/component';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  @computed('plan.price')
  price(price) {
    return `$${price / 100} per month`;
  },
});
