import prisma from "../modules/db";

export const getOverall = async (req,res) => {
    try {
    const avg = await prisma.overall.findFirst({
        orderBy: {
          createdAt: 'desc', // Order by createdAt in descending order
        },
      })

    res.json({data: avg})
    }  catch(e){
        console.error("Error fetching employees:", e); // Log the error for debugging
        res.status(500).json({ error: "An error occurred while fetching employees." });
    }
}