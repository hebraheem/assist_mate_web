import { DefinedInitialDataOptions, QueryKey } from '@tanstack/react-query';

export interface IITanMutation {
  opt?: IOpt;
}
export interface IOpt {
  onSuccess?: (data: unknown, variables?: unknown, context?: unknown) => Promise<unknown> | unknown;
  onError?: (error: Error, variables?: void, context?: unknown) => unknown;
}

export type ITanQuery = Omit<DefinedInitialDataOptions<unknown, Error, unknown, QueryKey>, 'queryKey'>;
