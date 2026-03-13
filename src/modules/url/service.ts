import prisma from '@/lib';
import redis from '@/lib/redis';
import { encode } from '@/lib/shortcode';

export class UrlService {
    /**
     * Creates a new shortened URL
     */
    static async shortenUrl(longUrl: string, customAlias?: string, expiry?: Date, userId?: number) {
        // Check if custom alias is already taken
        if (customAlias) {
            const existing = await prisma.url.findUnique({
                where: { customAlias },
            });
            if (existing) {
                throw new Error('Custom alias is already in use');
            }
        }

        // Insert record first. If customAlias exists, we use it. Otherwise, we encode the autoincrement ID later.
        const urlRecord = await prisma.url.create({
            data: {
                longUrl,
                customAlias: customAlias || null,
                expiresAt: expiry || null,
                userId: userId || null,
                // shortCode is initially null if no custom alias is provided, because we need the ID
            },
        });

        // Generate short code
        const shortCode = customAlias || encode(urlRecord.id);

        // Update the record with the target short code if we didn't use a custom alias initially
        if (!customAlias) {
            await prisma.url.update({
                where: { id: urlRecord.id },
                data: { shortCode },
            });
        } else {
            // we still need to set shortCode = customAlias for consistent querying
            await prisma.url.update({
                where: { id: urlRecord.id },
                data: { shortCode: customAlias },
            });
        }

        const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);
        // Cache the shortCode -> longUrl mapping proactively
        const cacheData = JSON.stringify({
            longUrl,
            expiresAt: expiry ? expiry.toISOString() : null,
        });
        await redis.set(`url:${shortCode}`, cacheData, 'EX', CACHE_TTL);

        return { shortCode, id: urlRecord.id, createdAt: urlRecord.createdAt };
    }
}
