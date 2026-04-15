import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Report from "@/models/Reports";

export async function GET() {
  const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyToken(token);

  await connectDB();

  const reports = await Report.find({
    userId: payload?.userId,
  });
/*Adding comment for re-trigerring deployment*/ 
  return Response.json(reports);
}