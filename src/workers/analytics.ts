import 'dotenv/config';
import prisma from '../lib';
import redis from '../lib/redis';

async function processAnalyticsTokens() {
    console.log('🔄 Starting Analytics Worker...');

    while (true) {
        try {
            // BPOP from the queue (blocks for up to 5 seconds if empty)
            const item = await redis.brpop('analytics_queue', 5);

            if (item) {
                const [, value] = item;
                const entry = JSON.parse(value);

                // Find URL ID by shortCode to link the click
                const urlRecord = await prisma.url.findUnique({
                    where: { shortCode: entry.shortCode },
                    select: { id: true },
                });

                if (urlRecord) {
                    await prisma.clickAnalytics.create({
                        data: {
                            urlId: urlRecord.id,
                            shortCode: entry.shortCode,
                            timestamp: new Date(entry.timestamp),
                            ipAddress: entry.ipAddress,
                            referrer: entry.referrer,
                            userAgent: entry.userAgent,
                            country: entry.country,
                        },
                    });
                    console.log(`✅ Processed click for ${entry.shortCode}`);
                } else {
                    console.log(`⚠️ URL not found for short code: ${entry.shortCode}`);
                }
            }
        } catch (error) {
            console.error('❌ Error processing analytics queue:', error);
            // Wait a bit before retrying on error
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await prisma.$disconnect();
    redis.quit();
    process.exit(0);
});

processAnalyticsTokens();
