import 'express';
import { Accountability, Query, SchemaOverview } from '@directus/types';

declare global {
  namespace Express {
    interface Request {
      token: string | null;
      collection: string;
      sanitizedQuery: Query;
      schema: SchemaOverview;

      accountability?: Accountability;
      singleton?: boolean;
    }
  }
}
