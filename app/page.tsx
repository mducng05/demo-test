"use client";

import { useEffect, useState } from "react";

interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: string;
  balance: string;
  status: "Active" | "Pending" | "Inactive";
}

export default function TablePage() {
  const [data, setData] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      const result = await res.json();

      if (result.success) {
        setData(result.data);
        setLastUpdated(result.updatedAt);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Danh sách Người dùng</h1>
            <p className="text-sm text-slate-500 mt-1">
              Dữ liệu được nạp từ backend nội bộ: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono text-xs">/api/users</code>
              {lastUpdated && <span className="ml-2 font-medium text-slate-600">(Cập nhật lúc: {lastUpdated})</span>}
            </p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {loading ? "Đang nạp dữ liệu..." : "Làm mới (Refresh)"}
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Vai trò</th>
                <th className="py-3 px-4">Số dư ví</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Đang gửi yêu cầu đến backend...
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500">#{item.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 text-slate-600">{item.email}</td>
                    <td className="py-3 px-4 text-slate-600">{item.role}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{item.balance}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs rounded-full font-semibold ${
                          item.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}