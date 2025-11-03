import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(
  {
    ...config,
    /*
     * Remote overrides for production.
     * Each entry is a pair of a unique name and the URL where it is deployed.
     */
    remotes: [
      ['products', 'https://mfe-poc-cdn.cloudstats.org/products'],
      ['cart', 'https://mfe-poc-cdn.cloudstats.org/cart'],
    ],
  },
  { dts: false }
);
