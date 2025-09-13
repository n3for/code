import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return NextResponse.redirect(new URL("/", req.url));
  const me = await prisma.user.findUnique({ where: { email } });
  if (me?.role !== "ADMIN") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const form = await req.formData();
  const userId = Number(form.get("userId"));
  if (Number.isNaN(userId)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  const u = await prisma.user.findUnique({ where: { id: userId } });
  if (!u) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const nextRole = u.role === "ADMIN" ? "USER" : "ADMIN";
  await prisma.user.update({ where: { id: u.id }, data: { role: nextRole as any } });
  return NextResponse.redirect(new URL("/admin", req.url));
}
