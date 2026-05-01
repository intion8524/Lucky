import { db, saveSession, getSession, hashPassword } from "./auth.js";

// ถ้า login แล้ว ไปหน้า index เลย
if (getSession()) {
    window.location.href = "index.html";
}

// เปิด datepicker
$("#datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "2560:2580"
});

// set default เป็นวันปัจจุบัน
$("#datepicker").datepicker("setDate", new Date());

const btnLogin  = document.getElementById("btnLogin");
const inputUser = document.getElementById("inputUsername");
const inputPass = document.getElementById("inputPassword");
const ddlHui    = document.getElementById("ddlListHui");
const datepick  = document.getElementById("datepicker");
const errMsg    = document.getElementById("errMsg");

btnLogin.addEventListener("click", doLogin);
inputPass.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });

async function doLogin() {
    const username     = inputUser.value.trim();
    const password     = inputPass.value.trim();
    const drawDate     = datepick.value.trim();
    const lotteryType  = ddlHui.value;
    const lotteryText  = ddlHui.options[ddlHui.selectedIndex].text;

    // validate
    if (!drawDate)     { showErr("กรุณาเลือกวันที่งวด"); return; }
    if (!lotteryType)  { showErr("กรุณาเลือกรอบหวย"); return; }
    if (!username)     { showErr("กรุณากรอก Username"); return; }
    if (!password)     { showErr("กรุณากรอก Password"); return; }

    hideErr();
    btnLogin.disabled     = true;
    btnLogin.textContent  = "กำลังเข้าสู่ระบบ...";

    const hashedPassword = await hashPassword(password);

    const { data, error } = await db
        .from("users")
        .select("*")
        .eq("username", username)
        .eq("is_active", true)
        .single();

    btnLogin.disabled    = false;
    btnLogin.textContent = "เข้าสู่ระบบ";

    if (error || !data) {
        showErr("Username หรือ Password ไม่ถูกต้อง");
        return;
    }

    // เทียบ password: รองรับทั้ง hash และ plain text (สำหรับช่วงเปลี่ยนผ่าน)
    if (data.password !== hashedPassword && data.password !== password) {
        showErr("Username หรือ Password ไม่ถูกต้อง");
        return;
    }

    // ถ้า password ยังเป็น plain text → อัปเดตเป็น hash อัตโนมัติ
    if (data.password === password && data.password !== hashedPassword) {
        await db.from("users").update({ password: hashedPassword }).eq("id", data.id);
    }

    // เก็บ session รวมถึงวันที่ + รอบหวยที่เลือก
    saveSession({
        id:            data.id,
        username:      data.username,
        display_name:  data.display_name,
        role:          data.role,
        draw_date:     drawDate,       // "01/04/2567"
        lottery_type:  lotteryType,    // "THI"
        lottery_text:  lotteryText     // "หวยไทย"
    });

    window.location.href = "index.html";
}

function showErr(msg) {
    errMsg.textContent    = msg;
    errMsg.style.display  = "block";
}
function hideErr() {
    errMsg.style.display = "none";
}
