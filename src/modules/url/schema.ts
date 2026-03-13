import { z } from 'zod';

export const shortenUrlSchema = z.object({
    url: z.string().url('Invalid URL format'),
    customAlias: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/, 'Alias can only contain letters, numbers, hyphens, and underscores').optional(),
    expiry: z.string().datetime().optional(), // ISO 8601 string
});

export type ShortenUrlRequest = z.infer<typeof shortenUrlSchema>;
