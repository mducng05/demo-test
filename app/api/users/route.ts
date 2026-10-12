import { NextResponse } from "next/server";

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  balance: string;
  status: "Active" | "Pending" | "Inactive";
}

export async function GET() {
  const roles = ["Developer", "Designer", "Product Owner", "QA Tester", "DevOps"];
  const statuses: ("Active" | "Pending" | "Inactive")[] = ["Active", "Pending", "Inactive"];

  const users: UserRecord[] = Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      name: `Người dùng ${id}`,
      email: `user${id}@homenest.vn`,
      role: roles[index % roles.length],
      balance: `${(Math.random() * 50 + 10).toFixed(2)} USD`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });

  return NextResponse.json(
    {
      success: true,
      total: users.length,
      data: users,
      updatedAt: new Date().toLocaleTimeString("vi-VN"),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}