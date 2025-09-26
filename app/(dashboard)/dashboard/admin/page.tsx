"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  balance?: number;
  activeDeposit?: number;
  earnedProfit?: number;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: number }>({});
  const [deposits, setDeposits] = useState<{ [key: string]: number }>({});
  const [profits, setProfits] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error(`Error fetching users: ${res.status}`);
      const data = await res.json();
      setUsers(data);

      // Initialize states
      const initialBalances: { [key: string]: number } = {};
      const initialDeposits: { [key: string]: number } = {};
      const initialProfits: { [key: string]: number } = {};

      data.forEach((u: User) => {
        initialBalances[u._id] = u.balance || 0;
        initialDeposits[u._id] = u.activeDeposit || 0;
        initialProfits[u._id] = u.earnedProfit || 0;
      });

      setBalances(initialBalances);
      setDeposits(initialDeposits);
      setProfits(initialProfits);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handlers
  const handleChange = (
    id: string,
    value: string,
    field: "balance" | "activeDeposit" | "earnedProfit"
  ) => {
    if (field === "balance") {
      setBalances((prev) => ({ ...prev, [id]: Number(value) }));
    } else if (field === "activeDeposit") {
      setDeposits((prev) => ({ ...prev, [id]: Number(value) }));
    } else if (field === "earnedProfit") {
      setProfits((prev) => ({ ...prev, [id]: Number(value) }));
    }
  };

  const updateField = async (
    id: string,
    field: "balance" | "activeDeposit" | "earnedProfit"
  ) => {
    try {
      const body: any = {};
      if (field === "balance") body.balance = balances[id];
      if (field === "activeDeposit") body.activeDeposit = deposits[id];
      if (field === "earnedProfit") body.earnedProfit = profits[id];

      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Failed to update ${field}: ${res.status}`);

      const data = await res.json();
      if (data.success) {
        // ✅ Refresh all users after update
        await fetchUsers();
        alert(`${field} updated successfully!`);
      } else {
        alert(`Failed to update ${field}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating " + field);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-6">
          {users.map((u) => (
            <div key={u._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg mb-2">
                {u.fullname || u.username || "N/A"}
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Balance */}
                <div className="p-3 bg-gray-100 rounded text-center">
                  <p className="text-sm">Account Balance</p>
                  <p className="font-bold">${balances[u._id] || 0}</p>
                  <input
                    type="number"
                    value={balances[u._id] || 0}
                    onChange={(e) =>
                      handleChange(u._id, e.target.value, "balance")
                    }
                    className="border px-2 py-1 w-full mt-2"
                  />
                  <button
                    onClick={() => updateField(u._id, "balance")}
                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2 w-full"
                  >
                    Save
                  </button>
                </div>

                {/* Active Deposit */}
                <div className="p-3 bg-gray-100 rounded text-center">
                  <p className="text-sm">Active Deposit</p>
                  <p className="font-bold">${deposits[u._id] || 0}</p>
                  <input
                    type="number"
                    value={deposits[u._id] || 0}
                    onChange={(e) =>
                      handleChange(u._id, e.target.value, "activeDeposit")
                    }
                    className="border px-2 py-1 w-full mt-2"
                  />
                  <button
                    onClick={() => updateField(u._id, "activeDeposit")}
                    className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full"
                  >
                    Save
                  </button>
                </div>

                {/* Earned Profit */}
                <div className="p-3 bg-gray-100 rounded text-center">
                  <p className="text-sm">Earned Profit</p>
                  <p className="font-bold">${profits[u._id] || 0}</p>
                  <input
                    type="number"
                    value={profits[u._id] || 0}
                    onChange={(e) =>
                      handleChange(u._id, e.target.value, "earnedProfit")
                    }
                    className="border px-2 py-1 w-full mt-2"
                  />
                  <button
                    onClick={() => updateField(u._id, "earnedProfit")}
                    className="bg-purple-500 text-white px-3 py-1 rounded mt-2 w-full"
                  >
                    Save
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500">Email: {u.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


