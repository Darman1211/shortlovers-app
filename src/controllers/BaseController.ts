import { Knex } from 'knex';
import { RegisterEndpointFunctions } from '../types/directus_types.js';
import autoBind from 'auto-bind';
import { UnauthorizedException } from '../exceptions/UnauthorizedException.js';
import type { Accountability } from '@directus/types';
export class BaseController {
	protected options: RegisterEndpointFunctions;
	protected knex: Knex;

	constructor(options: RegisterEndpointFunctions) {
		this.options = options;
    	this.knex = options.context.database;
		autoBind(this);
	}

	validateAccountability(accountability?: Accountability): void {
    if (!accountability || !accountability.roles || accountability.roles.length === 0) {
      throw new UnauthorizedException('You need to sign in to access this endpoint.');
    }
  }
}