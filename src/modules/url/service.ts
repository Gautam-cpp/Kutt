import prisma from '@/lib';
import redis from '@/lib/redis';
import { encode } from '@/lib/shortcode';

export class UrlService {
    static async shortenUrl(longUrl: string, customAlias?: string, expiry?: Date, userId?: number) {
        if (customAlias) {
            const existing = await prisma.url.findUnique({
                where: { customAlias },
            });
            if (existing) {
                throw new Error('Custom alias is already in use');
            }
        }

        const urlRecord = await prisma.url.create({
            data: {
                longUrl,
                customAlias: customAlias || null,
                expiresAt: expiry || null,
                userId: userId || null,
            },
        });

        const shortCode = customAlias || encode(urlRecord.id);

        if (!customAlias) {
            await prisma.url.update({
                where: { id: urlRecord.id },
                data: { shortCode },
            });
        } else {
            await prisma.url.update({
                where: { id: urlRecord.id },
                data: { shortCode: customAlias },
            });
        }

        const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);
        const cacheData = JSON.stringify({
            longUrl,
            expiresAt: expiry ? expiry.toISOString() : null,
        });
        await redis.set(`url:${shortCode}`, cacheData, 'EX', CACHE_TTL);

        return { shortCode, id: urlRecord.id, createdAt: urlRecord.createdAt };
    }
}
