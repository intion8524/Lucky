// auth.js — shared session management
const SUPABASE_URL = "https://vxicvggtkrfkigcqterd.supabase.co";
const SUPABASE_KEY = "sb_publishable_XgOgEwHxWam7fbHf7Cx8KQ_vLyME2Jn";

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
export const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// แปลงวันที่ไทย DD/MM/YYYY (พ.ศ.) → YYYY-MM-DD (ค.ศ.)
export function thaiDateToISO(thaiDate) {
    const parts = thaiDate.includes("/") ? thaiDate.split("/") : [thaiDate.substring(0,2), thaiDate.substring(2,4), thaiDate.substring(4)];
    const [d, m, y] = parts;
    return `${parseInt(y) - 543}-${m}-${d}`;
}

// เก็บ/อ่าน session จาก localStorage
export function saveSession(user) {
    localStorage.setItem("lottery_user", JSON.stringify(user));
}

export function getSession() {
    const raw = localStorage.getItem("lottery_user");
    return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
    localStorage.removeItem("lottery_user");
}

// เช็คว่า login แล้วหรือยัง ถ้ายัง redirect ไป login.html
export function requireLogin() {
    const user = getSession();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

// เช็คว่าเป็น admin ถ้าไม่ใช่ redirect กลับ index.html
export function requireAdmin() {
    const user = requireLogin();
    if (user && user.role !== "admin") {
        window.location.href = "index.html";
        return null;
    }
    return user;
}

// Hash password ด้วย SHA-256 (Web Crypto API)
export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
