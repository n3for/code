import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) redirect("/");
  const me = await prisma.user.findUnique({ where: { email } });
  if (me?.role !== "ADMIN") redirect("/");
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Пользователи и роли</h1>
      <table className="w-full bg-white rounded-xl overflow-hidden border">
        <thead className="bg-slate-50 text-sm">
          <tr><th className="p-2 text-left">Email</th><th className="p-2">Роль</th><th className="p-2">Действия</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.email}</td>
              <td className="p-2 text-center">{u.role}</td>
              <td className="p-2 text-center">
                <form action={"/api/admin/toggle-role"} method="post">
                  <input type="hidden" name="userId" value={u.id} />
                  <button className="btn-ghost" type="submit">Сменить роль</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
