import { z } from 'zod';

export const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string().datetime(),
  service: z.string(),
  version: z.string().optional()
});

/**
 * @typedef {Object} HealthResponse
 * @property {'ok'} status
 * @property {string} timestamp
 * @property {string} service
 * @property {string} [version]
 */

export const ErrorResponseSchema = z.object({
  error: z.object({
    message: z.string(),
    status: z.number().int().positive(),
    timestamp: z.string().datetime(),
    details: z.unknown().optional()
  })
});

/**
 * @typedef {Object} ErrorResponse
 * @property {{ message: string, status: number, timestamp: string, details?: unknown }} error
 */

/**
 * @template {import('zod').ZodTypeAny} T
 * @param {T} dataSchema
 */
export const ApiResponseSchema = (dataSchema) =>
  z.object({
    data: dataSchema,
    meta: z.object({
      timestamp: z.string().datetime(),
      requestId: z.string().optional()
    }).optional()
  });
