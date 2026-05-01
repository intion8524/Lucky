import { db, requireAdmin, clearSession, hashPassword } from "./auth.js";

// เช็คสิทธิ์ admin
const currentUser = requireAdmin();
if (!currentUser) throw new Error("Not admin");

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
    clearSession();
    window.location.href = "login.html";
});

// ==================== USER MANAGEMENT ====================

const tbodyUsers    = document.getElementById("tbodyUsers");
const inputUId      = document.getElementById("editUserId");
const inputUUser    = document.getElementById("inputUUsername");
const inputUPass    = document.getElementById("inputUPassword");
const inputUDisplay = document.getElementById("inputUDisplayName");
const inputURole    = document.getElementById("inputURole");
const btnSaveUser   = document.getElementById("btnSaveUser");
const btnCancelUser = document.getElementById("btnCancelUser");
const ddlSelectUser = document.getElementById("ddlSelectUser");

async function loadUsers() {
    const { data } = await db.from("users").select("*").order("username");
    tbodyUsers.innerHTML = "";
    ddlSelectUser.innerHTML = '<option value="">-- เลือก User --</option>';

    (data || []).forEach(u => {
        // แถวในตาราง
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${u.username}</strong></td>
            <td>${u.display_name || "-"}</td>
            <td><span class="${u.role === "admin" ? "badge-admin" : "badge-user"}">${u.role}</span></td>
            <td>${u.is_active ? "✅" : "❌"}</td>
            <td>
                <button class="btn-sm-edit me-1" onclick="editUser(${u.id})">แก้ไข</button>
                <button class="btn-sm-toggle ${u.is_active ? "off" : "on"}" onclick="toggleUser(${u.id}, ${u.is_active})">
                    ${u.is_active ? "ปิด" : "เปิด"}
                </button>
            </td>`;
        tbodyUsers.appendChild(tr);

        // dropdown เลือก user สำหรับจัดการลูกค้า
        const opt = document.createElement("option");
        opt.value = u.id;
        opt.text  = `${u.username} (${u.display_name || "-"})`;
        ddlSelectUser.appendChild(opt);
    });
}

btnSaveUser.addEventListener("click", async () => {
    const username     = inputUUser.value.trim();
    const password     = inputUPass.value.trim();
    const display_name = inputUDisplay.value.trim();
    const role         = inputURole.value;
    const id           = inputUId.value;

    if (!username) { alert("กรุณากรอก Username"); return; }

    if (id) {
        // แก้ไข
        const updates = { username, display_name, role };
        if (password) updates.password = await hashPassword(password);
        const { error } = await db.from("users").update(updates).eq("id", id);
        if (error) { alert("แก้ไขไม่สำเร็จ: " + error.message); return; }
    } else {
        // เพิ่มใหม่
        if (!password) { alert("กรุณากรอก Password"); return; }
        const hashedPw = await hashPassword(password);
        const { error } = await db.from("users").insert({ username, password: hashedPw, display_name, role, is_active: true });
        if (error) { alert("เพิ่มไม่สำเร็จ: " + error.message); return; }
    }

    clearUserForm();
    loadUsers();
    Swal.fire({ icon: "success", title: "บันทึกสำเร็จ", timer: 1000, showConfirmButton: false });
});

btnCancelUser.addEventListener("click", clearUserForm);

function clearUserForm() {
    inputUId.value = "";
    inputUUser.value = "";
    inputUPass.value = "";
    inputUDisplay.value = "";
    inputURole.value = "user";
    btnCancelUser.style.display = "none";
    btnSaveUser.textContent = "💾 บันทึก User";
}

window.editUser = async (id) => {
    const { data } = await db.from("users").select("*").eq("id", id).single();
    if (!data) return;
    inputUId.value      = data.id;
    inputUUser.value    = data.username;
    inputUPass.value    = "";
    inputUDisplay.value = data.display_name || "";
    inputURole.value    = data.role;
    btnCancelUser.style.display = "";
    btnSaveUser.textContent = "💾 อัปเดต User";
    window.scrollTo(0, 0);
};

window.toggleUser = async (id, currentActive) => {
    await db.from("users").update({ is_active: !currentActive }).eq("id", id);
    loadUsers();
};

// ==================== CUSTOMER MANAGEMENT ====================

const tbodyCustomers = document.getElementById("tbodyCustomers");
const custFormArea   = document.getElementById("custFormArea");
const inputCId       = document.getElementById("editCustId");
const inputCCode     = document.getElementById("inputCCode");
const inputCName     = document.getElementById("inputCName");
const inputCComm     = document.getElementById("inputCComm");
const btnSaveCust    = document.getElementById("btnSaveCust");
const btnCancelCust  = document.getElementById("btnCancelCust");

let selectedUserId = null;

ddlSelectUser.addEventListener("change", () => {
    selectedUserId = ddlSelectUser.value || null;
    if (selectedUserId) {
        custFormArea.style.display = "";
        document.getElementById("custEmpty").style.display = "none";
        loadCustomers(selectedUserId);
    } else {
        custFormArea.style.display = "none";
        tbodyCustomers.innerHTML = "";
        document.getElementById("custEmpty").style.display = "";
    }
});

async function loadCustomers(userId) {
    const { data } = await db
        .from("customers")
        .select("*")
        .eq("user_id", userId)
        .order("cust_name");

    tbodyCustomers.innerHTML = "";
    (data || []).forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><code>${c.cust_code}</code></td>
            <td>${c.cust_name}</td>
            <td style="text-align:center;font-weight:700;">${c.commission_pct ?? 30}%</td>
            <td>${c.is_active ? "✅" : "❌"}</td>
            <td>
                <button class="btn-sm-edit me-1" onclick="editCust(${c.id})">แก้ไข</button>
                <button class="btn-sm-toggle ${c.is_active ? "off" : "on"}" onclick="toggleCust(${c.id}, ${c.is_active})">
                    ${c.is_active ? "ปิด" : "เปิด"}
                </button>
            </td>`;
        tbodyCustomers.appendChild(tr);
    });
}

btnSaveCust.addEventListener("click", async () => {
    if (!selectedUserId) { alert("กรุณาเลือก User ก่อน"); return; }
    const cust_code      = inputCCode.value.trim().toUpperCase();
    const cust_name      = inputCName.value.trim();
    const commission_pct = parseFloat(inputCComm.value) || 30;
    const id             = inputCId.value;

    if (!cust_code || !cust_name) { alert("กรุณากรอกรหัสและชื่อลูกค้า"); return; }

    if (id) {
        const { error } = await db.from("customers").update({ cust_code, cust_name, commission_pct }).eq("id", id);
        if (error) { alert("แก้ไขไม่สำเร็จ: " + error.message); return; }
    } else {
        const { error } = await db.from("customers").insert({ user_id: selectedUserId, cust_code, cust_name, commission_pct, is_active: true });
        if (error) { alert("เพิ่มไม่สำเร็จ: " + error.message); return; }
    }

    clearCustForm();
    loadCustomers(selectedUserId);
    Swal.fire({ icon: "success", title: "บันทึกสำเร็จ", timer: 1000, showConfirmButton: false });
});

btnCancelCust.addEventListener("click", clearCustForm);

function clearCustForm() {
    inputCId.value   = "";
    inputCCode.value = "";
    inputCName.value = "";
    inputCComm.value = "30";
    btnCancelCust.style.display = "none";
    btnSaveCust.textContent = "💾 บันทึกลูกค้า";
}

window.editCust = async (id) => {
    const { data } = await db.from("customers").select("*").eq("id", id).single();
    if (!data) return;
    inputCId.value   = data.id;
    inputCCode.value = data.cust_code;
    inputCName.value = data.cust_name;
    inputCComm.value = data.commission_pct ?? 30;
    btnCancelCust.style.display = "";
    btnSaveCust.textContent = "💾 อัปเดตลูกค้า";
};

window.toggleCust = async (id, currentActive) => {
    await db.from("customers").update({ is_active: !currentActive }).eq("id", id);
    loadCustomers(selectedUserId);
};

// ==================== INIT ====================
loadUsers();

// ==================== ลบงวดหวย (Firebase) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBAc-Xi7bwQAdpvJgwpHh8hqW2JS7tkbLo",
    authDomain: "peck-s.firebaseapp.com",
    databaseURL: "https://peck-s.firebaseio.com",
    projectId: "peck-s",
    storageBucket: "peck-s.appspot.com",
    messagingSenderId: "821841903590",
    appId: "1:821841903590:web:bd1e6ffb33a0b809892027"
};
const fbApp = initializeApp(firebaseConfig, "admin-app");
const fbDb  = getFirestore(fbApp);

// เปิด datepicker
$(document).ready(() => {
    $("#deleteDrawDate").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "2560:2580"
    });
    $("#deleteDrawDate").datepicker("setDate", new Date());
});

// โหลด user list ลงใน dropdown ลบงวด
async function loadUsersForDelete() {
    const { data } = await db.from("users").select("username, display_name").order("username");
    const sel = document.getElementById("deleteDrawUser");
    (data || []).forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.username;
        opt.text  = `${u.username} — ${u.display_name || ""}`;
        sel.appendChild(opt);
    });
}
loadUsersForDelete();

// สร้าง collection name จากวันที่ + รอบหวย
function makeCollectionName(dateStr, lotteryType) {
    // dateStr = "01/04/2567" → "01042567"
    return dateStr.replaceAll("/", "") + "_" + lotteryType;
}

const lotteryTypes = ["THI","LOS","NOI1","NOI2","NOI3","AOM"];

// ดึงข้อมูลก่อนลบ
document.getElementById("btnPreviewDelete").addEventListener("click", async () => {
    const dateStr  = document.getElementById("deleteDrawDate").value.trim();
    const drawType = document.getElementById("deleteDrawType").value;
    const userName = document.getElementById("deleteDrawUser").value;

    if(!dateStr) { Swal.fire({ icon:"warning", title:"กรุณากรอกวันที่งวด" }); return; }

    const preview = document.getElementById("deletePreview");
    const btnConfirm = document.getElementById("btnConfirmDelete");
    preview.innerHTML = "⏳ กำลังนับข้อมูล...";
    preview.style.display = "";
    btnConfirm.style.display = "none";

    // กำหนด collections ที่จะลบ
    const types = drawType ? [drawType] : lotteryTypes;
    let totalDocs = 0;
    let details = [];

    for(const t of types) {
        const colName = makeCollectionName(dateStr, t);
        try {
            let q;
            if(userName) {
                q = query(collection(fbDb, colName), where("UserName", "==", userName));
            } else {
                q = collection(fbDb, colName);
            }
            const snap = await getDocs(q);
            if(snap.size > 0) {
                details.push(`<b>${colName}</b>: ${snap.size} บิล${userName ? ` (${userName})` : ""}`);
                totalDocs += snap.size;
            }
        } catch(e) { /* collection ไม่มีข้อมูล */ }
    }

    if(totalDocs === 0) {
        preview.innerHTML = "✅ ไม่พบข้อมูลในงวดที่ระบุ";
        btnConfirm.style.display = "none";
        return;
    }

    preview.innerHTML = `⚠️ พบข้อมูลที่จะถูกลบ <b>${totalDocs} บิล</b>:<br><br>` + details.join("<br>");
    btnConfirm.style.display = "";
});

// ยืนยันลบ
document.getElementById("btnConfirmDelete").addEventListener("click", async () => {
    const dateStr  = document.getElementById("deleteDrawDate").value.trim();
    const drawType = document.getElementById("deleteDrawType").value;
    const userName = document.getElementById("deleteDrawUser").value;

    const result = await Swal.fire({
        icon: "warning",
        title: "ยืนยันลบข้อมูล?",
        html: `งวด <b>${dateStr}</b>${drawType ? ` รอบ <b>${drawType}</b>` : " ทุกรอบ"}${userName ? ` ของ <b>${userName}</b>` : " ทุก User"}<br><br><span style="color:#c0392b;font-weight:700;">ข้อมูลจะหายถาวร ไม่สามารถกู้คืนได้</span>`,
        showCancelButton: true,
        confirmButtonColor: "#c0392b",
        confirmButtonText: "ลบเลย",
        cancelButtonText: "ยกเลิก"
    });

    if(!result.isConfirmed) return;

    const types = drawType ? [drawType] : lotteryTypes;
    let deleted = 0;

    Swal.fire({ title: "กำลังลบ...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    for(const t of types) {
        const colName = makeCollectionName(dateStr, t);
        try {
            let q;
            if(userName) {
                q = query(collection(fbDb, colName), where("UserName", "==", userName));
            } else {
                q = collection(fbDb, colName);
            }
            const snap = await getDocs(q);
            for(const d of snap.docs) {
                await deleteDoc(doc(fbDb, colName, d.id));
                deleted++;
            }
        } catch(e) { /* ข้ามถ้าไม่มี */ }
    }

    document.getElementById("deletePreview").style.display = "none";
    document.getElementById("btnConfirmDelete").style.display = "none";
    document.getElementById("deleteDrawDate").value = "";

    Swal.fire({
        icon: "success",
        title: `ลบเรียบร้อย`,
        text: `ลบข้อมูลทั้งหมด ${deleted} บิล`,
        timer: 2000,
        showConfirmButton: false
    });
});
