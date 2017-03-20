import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['jobs'],
  classNameBindings: ['stage:stage'],

  jobTableId: Ember.computed(function () {
    if (this.get('required')) {
      return 'jobs';
    } else {
      return 'allowed_failure_jobs';
    }
  }),

  jobsProxyLol: Ember.computed('build.jobs', 'jobs', function () {
    const stage = this.get('stage');

    if (stage) {
      return this.get('build.jobs').filterBy('stage.id', stage.get('id'));
    } else {
      return this.get('jobs');
    }
  }),

  jobDurations: Ember.computed.mapBy('jobsProxyLol', 'duration'),
  duration: Ember.computed.sum('jobDurations'),

  stageState: Ember.computed('jobsProxyLol.@each.state', function () {
    // FIXME this needs to handle more states
    if (this.get('jobsProxyLol').every(job => job.get('state') == 'passed')) {
      return 'passed';
    } else {
      return 'failed';
    }
  })
});
