import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

// Define a new prisma client if we are in production, otherwise use the global prisma client
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma