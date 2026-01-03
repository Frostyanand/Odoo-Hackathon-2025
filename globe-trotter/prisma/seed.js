const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Cleanup existing data
    await prisma.activity.deleteMany()
    await prisma.stop.deleteMany()
    await prisma.trip.deleteMany()
    await prisma.user.deleteMany()

    console.log('Cleaned up database')

    const users = []

    // Create Users
    const userData = [
        { email: 'admin@globetrotter.com', name: 'Admin User', provider: 'google' },
        { email: 'sarah@example.com', name: 'Sarah Trekker', provider: 'email', city: 'London', country: 'UK' },
        { email: 'mike@example.com', name: 'Mike Voyager', provider: 'google' },
        { email: 'elena@example.com', name: 'Elena Globetrotter', provider: 'email', city: 'Madrid', country: 'Spain' },
        { email: 'david@example.com', name: 'David Backpacker', provider: 'google' },
    ]

    for (const u of userData) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                email: u.email,
                name: u.name,
                provider: u.provider,
                city: u.city,
                country: u.country,
                image: `https://ui-avatars.com/api/?name=${u.name.replace(' ', '+')}&background=random`
            },
        })
        users.push(user)
        console.log(`Created user with id: ${user.id}`)
    }

    // Destinations and Cities
    const destinations = [
        { name: 'Tokyo Adventure', dest: 'Japan', city: 'Tokyo', budget: 4500, month: 0 }, // Jan
        { name: 'Paris Romantic Getaway', dest: 'France', city: 'Paris', budget: 3200, month: 1 }, // Feb
        { name: 'New York City Break', dest: 'USA', city: 'New York', budget: 2800, month: 2 }, // Mar
        { name: 'Bali Relaxation', dest: 'Indonesia', city: 'Bali', budget: 1500, month: 3 }, // Apr
        { name: 'Rome History Tour', dest: 'Italy', city: 'Rome', budget: 3600, month: 4 }, // May
        { name: 'London Royal Trip', dest: 'UK', city: 'London', budget: 4100, month: 5 }, // Jun
        { name: 'Swiss Alps Hiking', dest: 'Switzerland', city: 'Zurich', budget: 5200, month: 6 }, // Jul
        { name: 'Dubai Luxury Escape', dest: 'UAE', city: 'Dubai', budget: 6500, month: 7 }, // Aug
        { name: 'Sydney Opera Tour', dest: 'Australia', city: 'Sydney', budget: 4800, month: 8 }, // Sep
        { name: 'Kyoto Cultural Dive', dest: 'Japan', city: 'Kyoto', budget: 3900, month: 9 }, // Oct
        { name: 'Barcelona Beach & Art', dest: 'Spain', city: 'Barcelona', budget: 2900, month: 10 }, // Nov
        { name: 'Christmas in Vienna', dest: 'Austria', city: 'Vienna', budget: 3100, month: 11 }, // Dec
        { name: 'Tokyo Anime Tour', dest: 'Japan', city: 'Tokyo', budget: 4200, month: 5 },
        { name: 'Paris Fashion Week', dest: 'France', city: 'Paris', budget: 5500, month: 8 },
        { name: 'New York Business', dest: 'USA', city: 'New York', budget: 3000, month: 10 }
    ]

    // Create Trips
    for (let i = 0; i < destinations.length; i++) {
        const dest = destinations[i]
        const randomUser = users[Math.floor(Math.random() * users.length)]

        // Calculate dynamic dates for the correct year
        const currentYear = new Date().getFullYear()
        // If the month has passed this year, maybe use last year? Or just use current year for analytics
        const startDate = new Date(currentYear, dest.month, 10)
        const endDate = new Date(currentYear, dest.month, 20)

        const trip = await prisma.trip.create({
            data: {
                name: dest.name,
                startDate: startDate,
                endDate: endDate,
                budget: dest.budget,
                destination: dest.dest,
                userId: randomUser.id,
                stops: {
                    create: [
                        {
                            city: dest.city,
                            arrival: startDate,
                            activities: {
                                create: [
                                    { name: "City Tour", cost: 100, type: "Sightseeing" },
                                    { name: "Local Cuisine", cost: 150, type: "Food" }
                                ]
                            }
                        }
                    ]
                }
            }
        })
        console.log(`Created trip: ${trip.name}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })