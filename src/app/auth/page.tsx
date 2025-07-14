"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.scss";
import { useUser } from "@/context/UserContext";

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();

  // اعتبارسنجی شماره موبایل ایران (11 رقم و با 09 شروع شود)
  const isValidIranPhone = (num: string) => /^09\d{9}$/.test(num);

  const handleLogin = async () => {
    if (!isValidIranPhone(phone)) {
      setError("شماره موبایل وارد شده معتبر نیست");
      return;
    }

    try {
      // درخواست به API کاربران تصادفی
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();

      // ساخت آبجکت کاربر از پاسخ API
      const user = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        email: data.results[0].email,
      };

      // ذخیره در Context و localStorage (اتوماتیک در Context مدیریت می‌شود)
      setUser(user);

      // ریدایرکت به داشبورد
      router.push("/dashboard");
    } catch (error) {
      setError("خطا در دریافت اطلاعات کاربر، دوباره تلاش کنید");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>ورود</h1>

      {/* اینپوت شماره موبایل */}
      <input
        type="tel"
        placeholder="شماره موبایل (مثلاً 09123456789)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={styles.input}
        maxLength={11}
      />

      {/* نمایش خطا در صورت وارد کردن شماره نامعتبر */}
      {error && <p className={styles.error}>{error}</p>}

      {/* دکمه ورود */}
      <button onClick={handleLogin} className={styles.button}>
        ورود
      </button>
    </main>
  );
}
