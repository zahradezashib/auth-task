"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import styles from "./Dashboard.module.scss";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  // اگر کاربر وارد نشده بود، ریدایرکت به صفحه ورود
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  // اگر هنوز کاربر بارگذاری نشده، می‌توان لودینگ یا null برگرداند
  if (!user) {
    return null;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>خوش آمدید به داشبورد</h1>
      <p className={styles.userName}>{user.name}</p>
      <p className={styles.userEmail}>{user.email}</p>
    </main>
  );
}
