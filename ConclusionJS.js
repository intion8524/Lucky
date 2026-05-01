import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ── Firebase ──────────────────────────────────────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyBAc-Xi7bwQAdpvJgwpHh8hqW2JS7tkbLo",
    authDomain: "peck-s.firebaseapp.com",
    databaseURL: "https://peck-s.firebaseio.com",
    projectId: "peck-s",
    storageBucket: "peck-s.appspot.com",
    messagingSenderId: "821841903590",
    appId: "1:821841903590:web:bd1e6ffb33a0b809892027"
};
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Supabase (ใช้แค่ดึง commission_pct ไม่ต้อง login) ────────────────────────
const supa = createClient(
    "https://vxicvggtkrfkigcqterd.supabase.co",
    "sb_publishable_XgOgEwHxWam7fbHf7Cx8KQ_vLyME2Jn"
);

// ── Datepicker ────────────────────────────────────────────────────────────────
$("#datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "2020:2030"
});
$("#datepicker").datepicker("setDate", new Date());

// ── Dropdown หวย ─────────────────────────────────────────────────────────────
const HUI_LIST = [
    { value: "",       text: "-- โปรดเลือกหวย --" },
    { value: "THI",    text: "หวยไทย" },
    { value: "AOM", text: "หวยอ้อม" },
];
const ddlHui = document.getElementById("ddlListHui");
HUI_LIST.forEach(h => {
    const o = document.createElement("option");
    o.value = h.value; o.text = h.text;
    ddlHui.appendChild(o);
});

// ── Dropdown ลูกค้า + commission map ─────────────────────────────────────────
const ddlCust = document.getElementById("CustName");
let commMap = {};

async function loadCustomers() {
    // ดึง commission_pct ของทุกลูกค้า (ไม่กรองตาม user)
    const { data: customers } = await supa
        .from("customers")
        .select("cust_code, cust_name, commission_pct")
        .eq("is_active", true)
        .order("cust_name");

    commMap = {};
    (customers || []).forEach(c => { commMap[c.cust_code] = Number(c.commission_pct ?? 30); });

    // dropdown ลูกค้า — deduplicate ตาม cust_code แล้วใส่ "ทุกคน" + รายชื่อทั้งหมด
    ddlCust.innerHTML = "";
    const all = document.createElement("option");
    all.value = ""; all.text = "-- ทุกคน --";
    ddlCust.appendChild(all);
    const seen = new Set();
    (customers || []).forEach(c => {
        if (seen.has(c.cust_code)) return;
        seen.add(c.cust_code);
        const o = document.createElement("option");
        o.value = c.cust_code;
        o.text  = c.cust_name;
        ddlCust.appendChild(o);
    });
}
loadCustomers();

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = n => Number(n).toLocaleString("th-TH");
function onlyUnique(v, i, s) { return s.indexOf(v) === i; }
function permutations(num) {
    const [a, b, c] = num.split("");
    return [a+b+c, a+c+b, b+a+c, b+c+a, c+a+b, c+b+a].filter(onlyUnique);
}
const AGENT_MAP = {
    "02": "พี่ไก่น้อย", "03": "พี่แนน",  "04": "พี่นก",
    "05": "พี่เวียง",   "06": "พี่อิ๋ม", "07": "พี่อ้อ",
    "08": "พี่เยาว์",   "09": "น้องออย"
};
const getInt = id => {
    const v = parseInt(document.getElementById(id).value);
    return isNaN(v) ? null : v;
};

// ── ปุ่มตรวจผล ────────────────────────────────────────────────────────────────
document.getElementById("btnCheck").addEventListener("click", runConclusion);

let _isChecking = false;

async function runConclusion() {
    if (_isChecking) return;

    const dateVal = document.getElementById("datepicker").value;
    const huiVal  = ddlHui.value;
    const custVal = ddlCust.value;

    if (!dateVal || !huiVal) {
        Swal.fire({ icon: "warning", title: "กรุณาเลือกวันที่และรอบหวย" }); return;
    }
    const winTop = document.getElementById("WinTopNumber").value.trim();
    const winBot = document.getElementById("WinBotNumber").value.trim();
    if (!winTop || !winBot) {
        Swal.fire({ icon: "warning", title: "กรุณากรอกผลรางวัล" }); return;
    }

    _isChecking = true;
    const btnCheck = document.getElementById("btnCheck");
    btnCheck.disabled = true;
    btnCheck.textContent = "⏳ กำลังตรวจ...";

    const loadEl   = document.getElementById("loadingMsg");
    const resultEl = document.getElementById("resultArea");
    loadEl.style.display = "block";
    resultEl.innerHTML   = "";

    try {

    // ── ดึงข้อมูลจาก Firebase (ทุก user ในงวดนั้น) ──
    const strDB  = dateVal.replaceAll("/", "") + "_" + huiVal;
    const snap   = await getDocs(query(collection(db, strDB), orderBy("Bill")));
    const docs   = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const filtered = custVal ? docs.filter(d => d.CustCode === custVal) : docs;

    // restore selection ใน dropdown (ไม่ overwrite รายชื่อจาก Supabase)
    if (custVal) ddlCust.value = custVal;

    // จัดกลุ่มตาม CustCode
    const grouped = {};
    filtered.forEach(doc => {
        if (!grouped[doc.CustCode]) grouped[doc.CustCode] = [];
        grouped[doc.CustCode].push(doc);
    });

    loadEl.style.display = "none";

    if (!Object.keys(grouped).length) {
        resultEl.innerHTML = `<div style="text-align:center;padding:30px;color:#5a7080;">ไม่พบข้อมูล</div>`;
        return;
    }

    // ── อัตราจ่าย ──
    const RATE = {
        r3Top:     getInt("rate3Top")     ?? 400,
        r3TopUnor: getInt("rate3TopUnor") ?? 200,
        r3Bot:     getInt("rate3Bot")     ?? 80,
        r3BotUnor: getInt("rate3BotUnor") ?? 40,
        r2Top:     getInt("rate2Top")     ?? 70,
        r2TopUnor: getInt("rate2TopUnor") ?? 40,
        r2Bot:     getInt("rate2Bot")     ?? 70,
        r2BotUnor: getInt("rate2BotUnor") ?? 40,
        rRunT:     getInt("rateRunT")     ?? 3,
        rRunB:     getInt("rateRunB")     ?? 4,
    };

    // ── เลขอั้น: parse + expand ──
    const parseNums = id => document.getElementById(id).value
        .split(/[\s,\.]+/).map(s => s.trim()).filter(s => /^\d+$/.test(s));

    // เลข 2 ตัว — กลับด้านให้อัตโนมัติ (05 → 05, 50)
    const unor2Set = new Set();
    parseNums("unor2").forEach(n => {
        unor2Set.add(n);
        if (n.length === 2) unor2Set.add(n[1] + n[0]);
    });

    // เลข 3 ตัว — หมุน 6 permutation ให้อัตโนมัติ
    const unor3Set = new Set();
    parseNums("unor3").forEach(n => {
        if (n.length === 3) permutations(n).forEach(p => unor3Set.add(p));
    });

    const UNOR = { two: unor2Set, three: unor3Set };

    // ── parse ผลรางวัล ──
    const top3str = winTop.slice(-3);
    const WIN = {
        top3:     top3str,
        top3Arr:  top3str.split(""),          // ['x','y','z'] สำหรับเช็ควิ่งบน
        top2:     winTop.slice(-2),
        bot2:     winBot,
        bot2Arr:  winBot.split(""),           // สำหรับเช็ควิ่งล่าง
        top3Tode: permutations(top3str),
    };

    // render ทีละลูกค้า
    Object.entries(grouped).forEach(([custCode, bills]) => {
        const custName = bills[0].Custname || custCode;
        const commPct  = commMap[custCode] !== undefined ? commMap[custCode] : 30;
        resultEl.appendChild(buildCard(custCode, custName, commPct, bills, WIN, RATE, UNOR));
    });

    } catch(err) {
        console.error("Conclusion error:", err);
        Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "กรุณาลองใหม่อีกครั้ง" });
    } finally {
        _isChecking = false;
        const btnCheck = document.getElementById("btnCheck");
        btnCheck.disabled = false;
        btnCheck.textContent = "✅ ตรวจผล";
        document.getElementById("loadingMsg").style.display = "none";
    }
}

// ── สร้าง card ต่อลูกค้า 1 คน ────────────────────────────────────────────────
function buildCard(custCode, custName, commPct, bills, WIN, RATE, UNOR) {

    const sorted = [...bills].sort((a, b) => a.Bill - b.Bill);

    let totalBuy    = 0;
    let totalRunBuy = 0;
    let totalWin    = 0;
    const billResults = [];

    sorted.forEach(doc => {
        let billBuy = 0, billRunBuy = 0, billWin = 0;
        const winDetails = [];

        (doc.Numbers || []).forEach(line => {
            const [left, right] = line.split("=");
            if (!right) return;
            const nums = left.split(",").map(n => n.trim()).filter(Boolean);
            const [mTop, mBot] = right.split("*").map(v => parseInt(v) || 0);

            nums.forEach(num => {
                const len = num.length;

                if (len === 1) {
                    // ── เลขวิ่ง ──
                    billRunBuy += mTop + mBot;
                    if (WIN.top3Arr.includes(num) && mTop > 0) {
                        const w = mTop * RATE.rRunT;
                        billWin += w;
                        winDetails.push(`วิ่งบน ${num} = ${fmt(w)}`);
                    }
                    if (WIN.bot2Arr.includes(num) && mBot > 0) {
                        const w = mBot * RATE.rRunB;
                        billWin += w;
                        winDetails.push(`วิ่งล่าง ${num} = ${fmt(w)}`);
                    }

                } else if (len === 2) {
                    // ── เลข 2 ตัว ──
                    billBuy += mTop + mBot;
                    const isUnor2 = UNOR.two.has(num);

                    if (num === WIN.top2 && mTop > 0) {
                        const rate = isUnor2 ? RATE.r2TopUnor : RATE.r2Top;
                        const w = mTop * rate;
                        billWin += w;
                        winDetails.push(`2บน ${num}${isUnor2 ? " (อั้น×"+rate+")" : " (×"+rate+")"} = ${fmt(w)}`);
                    }
                    if (num === WIN.bot2 && mBot > 0) {
                        const rate = isUnor2 ? RATE.r2BotUnor : RATE.r2Bot;
                        const w = mBot * rate;
                        billWin += w;
                        winDetails.push(`2ล่าง ${num}${isUnor2 ? " (อั้น×"+rate+")" : " (×"+rate+")"} = ${fmt(w)}`);
                    }

                } else if (len === 3) {
                    // ── เลข 3 ตัว ──
                    const isUnor3 = UNOR.three.has(num);

                    if (mBot === 3 || mBot === 6) {
                        // โต๊ดอย่างเดียว
                        const perms = permutations(num);
                        billBuy += mTop * perms.length;
                        if (WIN.top3Tode.includes(num)) {
                            const rate = isUnor3 ? RATE.r3BotUnor : RATE.r3Bot;
                            const w = mTop * rate;
                            billWin += w;
                            winDetails.push(`3โต๊ด ${num}${isUnor3 ? " (อั้น×"+rate+")" : " (×"+rate+")"} = ${fmt(w)}`);
                        }
                    } else {
                        billBuy += mTop + mBot;
                        if (num === WIN.top3 && mTop > 0) {
                            const rate = isUnor3 ? RATE.r3TopUnor : RATE.r3Top;
                            const w = mTop * rate;
                            billWin += w;
                            winDetails.push(`3ตรง ${num}${isUnor3 ? " (อั้น×"+rate+")" : " (×"+rate+")"} = ${fmt(w)}`);
                        }
                        if (WIN.top3Tode.includes(num) && mBot > 0) {
                            const rate = isUnor3 ? RATE.r3BotUnor : RATE.r3Bot;
                            const w = mBot * rate;
                            billWin += w;
                            winDetails.push(`3โต๊ด ${num}${isUnor3 ? " (อั้น×"+rate+")" : " (×"+rate+")"} = ${fmt(w)}`);
                        }
                    }
                }
            });
        });

        totalBuy    += billBuy;
        totalRunBuy += billRunBuy;
        totalWin    += billWin;
        billResults.push({ bill: doc.Bill, buy: billBuy, runBuy: billRunBuy, win: billWin, winDetails });
    });

    // ── คำนวณยอดสุทธิ ──
    const discountBuy    = Math.round(totalBuy    * commPct / 100);
    const discountRunBuy = Math.round(totalRunBuy * 10      / 100);
    const netBuy         = totalBuy    - discountBuy;
    const netRunBuy      = totalRunBuy - discountRunBuy;
    const netTotal       = netBuy + netRunBuy;
    const finalNet       = netTotal - totalWin;
    const isProfit       = finalNet >= 0;

    // ── DOM ──
    const card = document.createElement("div");
    card.className = "cust-card";

    const agentName = AGENT_MAP[bills[0].UserName] || bills[0].UserName || "-";

    // header
    const hdr = document.createElement("div");
    hdr.className = "cust-header";
    hdr.innerHTML = `
        <div>
            <span class="cust-title">${custName}</span>
            <span class="cust-sub">(${agentName})</span>
        </div>
        <span class="badge-comm">ค่าคอม ${commPct}%</span>
    `;
    card.appendChild(hdr);

    const body = document.createElement("div");
    body.className = "cust-body";

    // bill chips
    const billsRow = document.createElement("div");
    billsRow.className = "bills-row";
    billResults.forEach(b => {
        const chip = document.createElement("div");
        chip.className = "bill-chip" + (b.win > 0 ? " has-win" : "");
        chip.innerHTML = `
            <div class="bill-no">บิล ${b.bill}</div>
            <div class="bill-amt">${fmt(b.buy)}</div>
            ${b.runBuy > 0 ? `<div class="bill-run">วิ่ง ${fmt(b.runBuy)}</div>` : ""}
            ${b.win > 0 ? `<div class="bill-win-txt">🏆 ${b.winDetails.join("<br>")}</div>` : ""}
        `;
        billsRow.appendChild(chip);
    });
    body.appendChild(billsRow);

    // summary
    const sumWrap = document.createElement("div");
    sumWrap.className = "sum-wrap";
    sumWrap.innerHTML = `
        <div class="sum-row">
            <span class="lbl">ยอดซื้อรวม (เลข 2/3 ตัว)</span>
            <span class="val">${fmt(totalBuy)} บาท</span>
        </div>
        <div class="sum-row indent">
            <span class="lbl">หัก ${commPct}%</span>
            <span class="val calc">${fmt(totalBuy)} − ${fmt(discountBuy)} = ${fmt(netBuy)} บาท</span>
        </div>
        ${totalRunBuy > 0 ? `
        <div class="sum-row" style="margin-top:6px">
            <span class="lbl">ยอดซื้อรวม (วิ่ง)</span>
            <span class="val">${fmt(totalRunBuy)} บาท</span>
        </div>
        <div class="sum-row indent">
            <span class="lbl">หัก 10%</span>
            <span class="val calc">${fmt(totalRunBuy)} − ${fmt(discountRunBuy)} = ${fmt(netRunBuy)} บาท</span>
        </div>` : ""}
        <div class="sum-row divider total">
            <span class="lbl">ยอดสุทธิรวม</span>
            <span class="val">${totalRunBuy > 0 ? `${fmt(netBuy)} + ${fmt(netRunBuy)} = ` : ""}${fmt(netTotal)} บาท</span>
        </div>
        <div class="sum-row" style="margin-top:6px">
            <span class="lbl">ถูกรางวัลรวม</span>
            <span class="val" style="color:var(--red)">${totalWin > 0 ? fmt(totalWin) + " บาท" : "—"}</span>
        </div>
    `;

    const finalBox = document.createElement("div");
    finalBox.className = `final-box ${isProfit ? "profit" : "loss"}`;
    finalBox.innerHTML = `
        <span class="final-badge ${isProfit ? "profit" : "loss"}">${isProfit ? "เจ้ามือรับ" : "เจ้ามือจ่าย"}</span>
        ${fmt(netTotal)} − ${fmt(totalWin)} = <b>${fmt(Math.abs(finalNet))}</b> บาท
    `;

    body.appendChild(sumWrap);
    body.appendChild(finalBox);
    card.appendChild(body);
    return card;
}
