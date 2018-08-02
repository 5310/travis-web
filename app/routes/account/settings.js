import TravisRoute from 'travis/routes/basic';
import { service } from 'ember-decorators/service';

export default TravisRoute.extend({
  @service featureFlags: null,

  beforeModel() {
    let account = this.modelFor('account').account;

    if (account.type === 'organization') {
      this.transitionTo('account');
    }
  },

  model() {
    return this.get('featureFlags.fetchTask').perform({ forceServerRequest: true });
  },

  setupController(controller, model) {
    controller.set('featureFlags', model);
    controller.set('account', this.modelFor('account'));
  }
});
