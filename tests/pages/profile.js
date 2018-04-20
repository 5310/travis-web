import {
  create,
  attribute,
  clickable,
  collection,
  hasClass,
  isPresent,
  text,
  visitable,
  fillable
} from 'ember-cli-page-object';

function existingRepositoriesCollection(scope) {
  return collection(`${scope} li.profile-repolist-item`, {
    name: text('a.profile-repo'),
    isActive: hasClass('active', '.switch-rounded'),
    isDisabled: hasClass('non-admin', 'a.profile-repo'),
    toggle: clickable('.switch-rounded'),
    ariaChecked: attribute('aria-checked', '.switch-rounded'),
    role: attribute('role', '.switch-rounded')
  });
}

function githubAppsRepositoryCollection(scope) {
  return collection(`${scope} li.profile-repolist-item`, {
    name: text('a.profile-repo'),

    isPublic: isPresent('.icon.public'),
    isPrivate: isPresent('.icon.private')
  });
}

export default create({
  visit: visitable('profile/:username'),
  name: text('.profile-header h1'),

  subscriptionStatus: {
    scope: '.subscription-status',
    text: text('[data-test-message]')
  },

  filter: fillable('.profile-repositories-filter input.search'),
  noRepositoriesFoundByFilter: text('#administerable-repositories .no-results'),

  notFoundOrgName: text('.page-title .h2--red'),

  administerableRepositories: existingRepositoriesCollection('#administerable-repositories'),

  githubAppsInvitation: {
    scope: '#github-apps-invitation',

    link: {
      scope: 'a',
      href: attribute('href')
    }
  },

  manageGithubAppsLink: {
    scope: '[data-test-github-apps-integration-header] a',
    href: attribute('href')
  },

  migrateGithubAppsButton: { scope: '[data-test-migrate-github-apps]' },

  githubAppsRepositories: githubAppsRepositoryCollection('#github-apps-repositories'),
  notLockedGithubAppsRepositories: githubAppsRepositoryCollection('#not-locked-github-apps-repositories'),
  lockedGithubAppsRepositories: githubAppsRepositoryCollection('#locked-github-apps-repositories'),

  token: {
    scope: '.profile-user',

    show: clickable('.token-actions button.show-token'),
    value: text('.auth-token'),
    obfuscatedCharacters: text('.obfuscated-chars'),
    tokenCopiedText: text('.token-copied-text'),
  },

  accounts: collection('.profile-aside .account', {
    name: text('.account-name'),
    visit: clickable('.account-name')
  }),

  billing: {
    visit: clickable('li[data-test-billing-tab] a'),

    plan: {
      scope: '.plan',
      name: text('[data-test-plan-name]'),
      concurrency: text('[data-test-plan-concurrency]')
    },

    address: {
      scope: '.contact address',
    },

    creditCardNumber: text('[data-test-credit-card]'),

    annualInvitation: { scope: '[data-test-annual-invitation]' },

    invoices: collection('[data-test-invoice]', {
      href: attribute('href')
    }),

    edit: {
      creditCard: {
        scope: '#ember-credit-card-form',
        number: { scope: '[name=number]' },
        name: { scope: '[name=name]' },
        expiry: { scope: '[name=expiry]' },
        cvc: { scope: '[name=cvc]' }
      },

      billing: {
        firstName: { scope: '[name=firstName]'},
        lastName: { scope: '[name=lastName] '},
        company: { scope: '[name=company]' },
        address: { scope: '[name=address]' },
        address2: { scope: '[name=address2] '},
        city: { scope: '[name=city]' },
        state: { scope: '[name=state]' },
        country: { scope: '[name=country]' },
        zipCode: { scope: '[name=zipCode]' },
        email: { scope: '[name=email]' },
      },

      save: {
        scope: '.save'
      }
    }
  },
});
