const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // 1. Create a Demo User
    const user = await prisma.user.upsert({
        where: { email: 'demo@globetrotter.com' },
        update: {},
        create: {
            email: 'demo@globetrotter.com',
            name: 'Wanderlust Explorer',
        },
    })

    console.log('Created User:', user.name)

    // 2. Create a "Dream Trip" to Paris
    const trip = await prisma.trip.create({
        data: {
            name: "European Summer Dream",
            startDate: new Date('2024-06-10'),
            endDate: new Date('2024-06-20'),
            budget: 3500.0,
            destination: "Europe",
            coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
            userId: user.id,
            stops: {
                create: [
                    {
                        city: "Paris, France",
                        arrival: new Date('2024-06-10'),
                        activities: {
                            create: [
                                { name: "Eiffel Tower Sunset", cost: 45.0, type: "Sightseeing" },
                                { name: "Croissant Tasting", cost: 15.0, type: "Food" }
                            ]
                        }
                    },
                    {
                        city: "Rome, Italy",
                        arrival: new Date('2024-06-14'),
                        activities: {
                            create: [
                                { name: "Colosseum Tour", cost: 60.0, type: "History" }
                            ]
                        }
                    }
                ]
            }
        }
    })

    console.log('Created Trip:', trip.name)
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })