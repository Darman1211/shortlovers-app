import { Knex } from 'knex';
import type { Accountability, ExtensionsServices, SchemaOverview } from '@directus/types';
import { RegisterEndpointFunctions } from '../types/directus_types.js';
import type { Item } from '@directus/types';

export class BaseService {
  protected options: RegisterEndpointFunctions;
  protected services: ExtensionsServices;
  protected knex: Knex;
  protected schema: SchemaOverview;
  protected accountability?: Accountability | null;


  constructor(options: RegisterEndpointFunctions) {
    this.options = options;
    this.services = options.context.services;
    this.knex = options.context.database;
    this.schema = options.schema;
    this.accountability = options.accountability;
  }

  /**
   * Create a reusable ItemsService instance for a given collection.
   *
   * @param {string} collection - The name of the Directus collection.
   * @param {any} [accountability=this.accountability] - The accountability context
   *   (used for permissions and user context).
   */
  getItemsService<T extends Item>(
    collection: string,
    accountability: any = this.accountability
  ) {
    return new this.services.ItemsService<T>(collection, {
      schema: this.schema,
      knex: this.knex,
      accountability,
    });
  }

}