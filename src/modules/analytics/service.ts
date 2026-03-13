import prisma from '@/lib';

export class AnalyticsService {
    /**
     * Aggregates click stats for a given short code
     */
    static async getAnalytics(shortCode: string) {
        const urlRecord = await prisma.url.findUnique({
            where: { shortCode },
            include: {
                _count: {
                    select: { clicks: true }
                }
            }
        });

        if (!urlRecord) {
            return null;
        }

        // Get group by aggregations for referrers, countries, and devices (from userAgent roughly if parsed, we will just group by userAgent for simplicity since a full UA parser like useragent is not installed)
        const [referrers, countries, userAgents, dailyClicks] = await Promise.all([
            prisma.clickAnalytics.groupBy({
                by: ['referrer'],
                where: { urlId: urlRecord.id },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } }
            }),
            prisma.clickAnalytics.groupBy({
                by: ['country'],
                where: { urlId: urlRecord.id },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } }
            }),
            prisma.clickAnalytics.groupBy({
                by: ['userAgent'],
                where: { urlId: urlRecord.id },
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } }
            }),
            // Timestamps approximation: we will just return raw timestamps or optionally grouping by day.
            // Prisma currently doesn't directly support grouping by DATE(timestamp) natively in all dialects via `groupBy`,
            // so we can fallback to fetching raw or using raw query.
            prisma.$queryRaw<{ day: Date; count: bigint }[]>`
        SELECT DATE_TRUNC('day', "timestamp") as day, COUNT(*) as count
        FROM "ClickAnalytics"
        WHERE "urlId" = ${urlRecord.id}
        GROUP BY DATE_TRUNC('day', "timestamp")
        ORDER BY day ASC
      `
        ]);

        return {
            clickCount: urlRecord._count.clicks,
            referrers: referrers.map((r: { referrer: string | null; _count: { id: number } }) => ({ referrer: r.referrer || 'Direct', count: r._count.id })),
            countries: countries.map((c: { country: string | null; _count: { id: number } }) => ({ country: c.country || 'Unknown', count: c._count.id })),
            devices: userAgents.map((ua: { userAgent: string | null; _count: { id: number } }) => ({ userAgent: ua.userAgent || 'Unknown', count: ua._count.id })),
            timestamps: dailyClicks.map((d: { day: Date; count: bigint }) => ({ date: d.day, count: Number(d.count) }))
        };
    }
}
