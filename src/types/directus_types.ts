
import { Knex } from 'knex';
import { Accountability, ExtensionsServices, SchemaOverview } from '@directus/types';
import { Emitter } from '@directus/api/emitter';

export type EndpointExtensionContext = {
  services: ExtensionsServices;
  database: Knex<any, any[]>;
  env: Record<string, any>;
  emitter: Emitter;
  getSchema(options?: { database?: Knex; bypassCache?: boolean }): Promise<SchemaOverview>;
};

export type RegisterEndpointFunctions = {
  context: EndpointExtensionContext,
  schema: SchemaOverview,
  accountability?: Accountability | null
}

export type DirectusUser = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  title?: string;
  description?: string;
  tags?: string;
  avatar?: any;
  language?: string;
  tfa_secret?: string;
  status: string;
  role?: any;
  token?: string;
  password?: string;
  last_access?: any;
  last_page?: string;
  provider: string;
  external_identifier?: string;
  auth_data?: string;
  email_notifications?: number;
}

export type DataFilter = {
  q?: string | null;
  page?: number | null;
  limit?: number | null;
  filter?: Record<string, any> | null;
  sort?: string | null;
  fields?: string[] | null;
}

export type MetaResponse = {
  filter_count: number;
  limit: number;
  offset: number;
  page: number;
  page_count: number;
};

export type ExportDataFilter = {
  q?: string | null;
  filter?: Record<string, any> | null;
  sort?: string | null;
  export_id: string | null;
  settings?: ExportDataSettingsFilter | null;
}

export type ExportDataSettingsFilter = {
  offset? : number;
  end_index?: number;
  file_name?: string;
  isLastLooping?: number;
}