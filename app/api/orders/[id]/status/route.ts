import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const form = await req.formData();
  const status = form.get("status");

  if (typeof status !== "string" || !statuses.includes(status as any)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await prisma.serviceOrder.update({
    where: { id: Number(params.id) },
    data: { status: status as any },
  });

  return NextResponse.redirect(new URL(`/orders/${params.id}`, req.url));
}
