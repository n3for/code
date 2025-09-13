import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.formData();
  const vehicleId = Number(data.get("vehicleId"));
  const description = (data.get("description") ?? "").toString();
  if (!vehicleId || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await prisma.serviceOrder.create({
    data: { vehicleId, description },
  });

  return NextResponse.redirect(new URL("/orders", req.url));
}
