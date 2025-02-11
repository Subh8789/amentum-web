"use client";
import { useAuth } from "@/utils/useAuth";
import SessionTimeout from "@/components/SessionTimeout";
import "../styles/admin.css"; // Import admin-specific CSS

export default function AdminPage() {
  const session = useAuth(["admin"]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      <SessionTimeout />
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
