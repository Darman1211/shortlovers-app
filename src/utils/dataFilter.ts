import { Request } from 'express';
import { DataFilter, ExportDataFilter } from '../types/directus_types.js';

// Utility function to parse DataFilter from request body
export function parseDataFilter(req: Request): DataFilter & { fields?: string[] | null } {
  const { q, page, limit, filter, fields, sort } = req.body ?? {};

  return {
    q: typeof q === 'string' ? q.trim() || null : null,
    filter: typeof filter === 'object' && !Array.isArray(filter) ? filter : null,
    page: typeof page === 'number' ? page : Number(page) || null,
    limit: typeof limit === 'number' ? limit : Number(limit) || null,
    fields: Array.isArray(fields) && fields.every(f => typeof f === 'string') ? fields : null,
    sort: typeof sort === 'string' ? sort.trim() || null : null,
  };
}

export function parseExportDataFilter(req: Request): ExportDataFilter & { fields?: string[] | null } {
  const { q, filter, sort, export_id, settings } = req.body ?? {};

  return {
    q: typeof q === 'string' ? q.trim() || null : null,
    filter: typeof filter === 'object' && !Array.isArray(filter) ? filter : null,
    sort: typeof sort === 'string' ? sort.trim() || null : null,
    export_id,
    settings
  };
}