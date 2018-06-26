import Raven from 'raven-js';

const sentry_key = '5120354a024c4f7a9e8d18331afca5fc';
const sentry_app = '1232832';
export const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
