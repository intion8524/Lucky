//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
//import { getFirestore , collection , getDocs,addDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
/*const firebaseConfig = {
  apiKey: "AIzaSyA7-zewvkgi7TSlJ1Q0YwiPtDENaEKXGkU",
  authDomain: "basic-firebase-web.firebaseapp.com",
  projectId: "basic-firebase-web",
  storageBucket: "basic-firebase-web.appspot.com",
  messagingSenderId: "658042343144",
  appId: "1:658042343144:web:664ff1587e79b904c0035d",
  measurementId: "G-KJ9K42ZHNL"
};*/



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore , collection , getDocs,addDoc,deleteDoc,doc ,getDoc, query, where, onSnapshot , orderBy, limit, updateDoc, writeBatch } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
//import { collection, query, where, onSnapshot } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAc-Xi7bwQAdpvJgwpHh8hqW2JS7tkbLo",
  authDomain: "peck-s.firebaseapp.com",
  databaseURL: "https://peck-s.firebaseio.com",
  projectId: "peck-s",
  storageBucket: "peck-s.appspot.com",
  messagingSenderId: "821841903590",
  appId: "1:821841903590:web:bd1e6ffb33a0b809892027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// ===== SESSION CHECK (Supabase login) =====
import { getSession, clearSession } from "./auth.js";
const currentUser = getSession();
if (!currentUser) { window.location.href = "login.html"; throw new Error("No session"); }

const table = document.getElementById("table") 
const form = document.getElementById("addForm")
$( "#datepicker" ).datepicker();
var datenow = new Date();

// ดึงค่าจาก session แทน login form
var contrainer_InputData = document.getElementById("contrainer-InputData")
var contrainer_Login = document.getElementById("contrainer-Login")

// แสดงหน้ากรอกข้อมูลทันที ไม่ต้อง login ซ้ำ
if (contrainer_Login) contrainer_Login.style.display = "none";
if (contrainer_InputData) contrainer_InputData.style.display = "";

// logout button
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        clearSession();
        window.location.replace("login.html");
    });
}

// admin link
const linkAdmin = document.getElementById("linkAdmin");
if (linkAdmin && currentUser.role === "admin") {
    linkAdmin.style.display = "";
}

// ── ปุ่ม +/− บิล และ hint ──────────────────────────────────────────────────
const billInput  = document.getElementById("billInput");
const billHint   = document.getElementById("billHint");
const btnBillMinus = document.getElementById("btnBillMinus");
const btnBillPlus  = document.getElementById("btnBillPlus");

function updateBillHint() {
    if (!billInput || !billHint) return;
    const val = parseInt(billInput.value);
    if (isNaN(val)) { billHint.textContent = ""; return; }
    // เช็คว่าบิลนี้มีอยู่แล้วไหม
    const custCode = document.getElementById("CustName").value;
    const rows = document.getElementById("table").rows;
    let exists = false;
    for (let r of rows) {
        const code = r.getElementsByTagName("TD")[2]?.value;
        const bill = parseInt(r.getElementsByTagName("TD")[1]?.innerHTML);
        if (code === custCode && bill === val) { exists = true; break; }
    }
    if (exists) {
        billHint.innerHTML = `<span style="color:#c0392b;">⚠️ บิล ${val} มีอยู่แล้ว</span>`;
    } else {
        billHint.innerHTML = `<span style="color:#1a6b2a;">✓ บิล ${val} ว่างอยู่</span>`;
    }
}

if (btnBillMinus) {
    btnBillMinus.addEventListener("click", () => {
        const v = parseInt(billInput.value) || 1;
        if (v > 1) { billInput.value = v - 1; updateBillHint(); }
    });
}
if (btnBillPlus) {
    btnBillPlus.addEventListener("click", () => {
        const v = parseInt(billInput.value) || 1;
        billInput.value = v + 1; updateBillHint();
    });
}
if (billInput) {
    billInput.addEventListener("input", updateBillHint);
}
// ────────────────────────────────────────────────────────────────────────────

var datepicker_Login = document.getElementById("datepicker")

// ===== ดึงค่าจาก session แทนการกรอกใน index =====
if (datepicker_Login) datepicker_Login.value = currentUser.draw_date;

$( "#datepicker" ).change(function() {
    console.log("DATE : " + datepicker_Login.value);
});


var listDataHui = [
    {  
        value : "",
        Text : "-- โปรดเลือกหวย --"
    },
    {  
        value : "THI",
        Text : "หวยไทย"
    },
    {  
        value : "AOM",
        Text : "หวยอ้อม"
    },
]

var ListHui = document.getElementById("ddlListHui")
addDDlHui()
function addDDlHui(){
    var  lengthddl = listDataHui.length;
    for(var i = 0 ; i < lengthddl ;i ++){
        var option = document.createElement("option");
        option.value = listDataHui[i].value;
        option.text = listDataHui[i].Text;
        ListHui.appendChild(option);
    }
}






var CustName = document.getElementById("CustName")

CustName.addEventListener('change',AddBillNext)

function AddBillNext(){
    if(CustName.value != ""){
        var Allrows = table.rows;
        var lastBill = 0;

        for(var i = 0 ; i <Allrows.length ; i++){
            var x = Allrows[i].getElementsByTagName("TD")[2];
            //console.log(i + " , " +x.value );
            if(x.value == CustName.value){
                Allrows[i].style.display = "";
                var y = Allrows[i].getElementsByTagName("TD")[1];
                var parY = parseInt(y.innerHTML);
                //console.log(" parY : " + parY)

                if(parY > lastBill){
                    lastBill = parY;
                }
            }else{
                Allrows[i].style.display = "none";
            }
        }
        form.Bill.value = lastBill+1;
        updateBillHint();
    }else{

        var Allrows = table.rows;
        for(var i = 0 ; i <Allrows.length ; i++){
            var x = Allrows[i].getElementsByTagName("TD")[0];
            //console.log(i + " , " +x.value );
                Allrows[i].style.display = "";
        }
        form.Bill.value = 1;
        updateBillHint();

    }


}


//var ddlListName = document.getElementById("ddlListName")
var btnLogin = document.getElementById("btnLogin")
if (btnLogin) btnLogin.style.display = "none"; // ซ่อนปุ่ม login เดิม

var UserLogin = document.getElementById("UserLogin")
var UserPassWord = document.getElementById("UserPassWord")
var ListID = [];

// ===== ดึงข้อมูลจาก session แทน LogIn function =====
function LogIn(){
    // ดึงค่าจาก session ที่ login ไว้แล้ว
    const draw_date    = currentUser.draw_date;    // "01/04/2567"
    const lottery_type = currentUser.lottery_type; // "THI"
    const lottery_text = currentUser.lottery_text; // "หวยไทย"
    const username     = currentUser.username;

    // set ค่า datepicker และ ddlListHui
    if (datepicker_Login) datepicker_Login.value = draw_date;
    if (ListHui) ListHui.value = lottery_type;

    // แสดง title ใต้ topbar
    const titleBar = document.getElementById("titleBar");
    if(titleBar) {
        titleBar.textContent = "🎰 " + lottery_text + "  |  📅 งวดวันที่ " + draw_date;
        titleBar.style.display = "";
    }

    // แสดง navbar
    document.getElementById("navForMom").style.display = "";

    // admin เท่านั้นที่เห็นลิงก์แสดงผล/สรุปผล/จัดการ
    if(currentUser.role === "admin") {
        const ls = document.getElementById("linkScreenshot");
        const lc = document.getElementById("linkConclusion");
        if(ls) ls.style.display = "";
        if(lc) lc.style.display = "";
    }

    // แสดงชื่อ user
    const nameEl = document.getElementById("userDisplayName");
    if(nameEl) nameEl.textContent = currentUser.display_name || username;

    // ดึงรายชื่อลูกค้าจาก Supabase
    loadCustomersFromDB(username);
}

// โหลดลูกค้าจาก Supabase customers table
async function loadCustomersFromDB(username) {
    // import Supabase client จาก auth.js
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
    const supa = createClient(
        "https://vxicvggtkrfkigcqterd.supabase.co",
        "sb_publishable_XgOgEwHxWam7fbHf7Cx8KQ_vLyME2Jn"
    );

    const { data: userData } = await supa
        .from("users").select("id").eq("username", username).single();

    if (!userData) { loadCustomersFallback(username); return; }

    const { data: customers } = await supa
        .from("customers")
        .select("cust_code, cust_name")
        .eq("user_id", userData.id)
        .eq("is_active", true)
        .order("cust_name");

    if (!customers || customers.length === 0) { loadCustomersFallback(username); return; }

    const list = [{ value: "", Text: "โปรดเลือก" },
        ...customers.map(c => ({ value: c.cust_code, Text: c.cust_name }))
    ];
    addDDlCust(list);

    // เริ่มโหลดข้อมูล Firebase
    startFirebaseQuery();
}

// fallback ถ้าไม่มีลูกค้าใน DB ให้ใช้ list เดิม (จะถูก override โดย LogIn เดิม)
function loadCustomersFallback(username) {
    startFirebaseQuery();
}

function startFirebaseQuery() {
    var str_qry = datepicker_Login.value.replaceAll("/","") + "_" + ListHui.value;
    let qryrealtime = query(
        collection(db, str_qry),
        where("UserName", "==", currentUser.username)
    );
    GetDataQry(qryrealtime);
}

// เรียก LogIn ทันทีเมื่อโหลดหน้า
LogIn();



function GetDataQry(queryCollection){

    onSnapshot(queryCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {

            if (change.type === "added") {
                console.log("ADD DATA :", change.doc.data());
                showData(change.doc)
                AddBillNext()
            }

            if (change.type === "modified") {
                const row = document.getElementById(change.doc.id);
                if (row) {
                    const d = change.doc.data();
                    const tds = row.getElementsByTagName("TD");
                    // อัปเดตบิล
                    const billCell = document.getElementById("Bill_" + change.doc.id);
                    if (billCell) billCell.innerHTML = d.Bill;
                    // อัปเดตชื่อ + CustCode
                    const nameCell = document.getElementById("Name_" + change.doc.id);
                    if (nameCell) { nameCell.innerHTML = d.Custname; nameCell.value = d.CustCode; }
                    const codeCell = document.getElementById("CodeName_" + change.doc.id);
                    if (codeCell) codeCell.value = d.CustCode;
                    // อัปเดตยอดเงิน
                    if (tds[3]) {
                        try { tds[3].innerHTML = formatNumber(d.MoneyPerBill) + " บาท"; }
                        catch { tds[3].innerHTML = "0 บาท"; }
                    }
                    // อัปเดตตัวเลข
                    const numCell = document.getElementById("Numbercol_" + change.doc.id);
                    if (numCell && d.Numbers) {
                        let strshow = "", strvalue = "";
                        for (let i = 0; i < d.Numbers.length; i++) {
                            strshow += d.Numbers[i] + "<br>";
                            strvalue += d.Numbers[i] + "\n";
                        }
                        numCell.value = strvalue;
                        numCell.innerHTML = "<div class='ShowDatainput'>" + strshow + "</div>";
                    }
                    // อัปเดตปุ่มแก้ไข (เพื่อให้ employee data ใหม่)
                    const editCell = tds[0];
                    if (editCell) {
                        editCell.innerHTML = "";
                        let btn = document.createElement('button');
                        btn.textContent = "✏️ แก้ไข";
                        btn.className = "btn-edit";
                        editCell.appendChild(btn);
                        const numVal = document.getElementById("Numbercol_" + change.doc.id)?.value || "";
                        btn.addEventListener('click', () => openEditModal(change.doc, numVal));
                    }
                }
                // re-filter ตารางตาม dropdown (กรณีย้ายลูกค้า)
                AddBillNext();
            }

            if (change.type === "removed") {
                document.getElementById(change.doc.id).remove();
            }

        });

        // อัปเดตจำนวนบิลใน dropdown หลังทุกการเปลี่ยนแปลง
        updateCustBillCounts();
    
    });

}



function addDDlCust( ListCustoners ){
    CustName.innerHTML = "";
    var  lengthddl = ListCustoners.length;
    for(var i = 0 ; i < lengthddl ;i ++){
        var option = document.createElement("option");
        option.value = ListCustoners[i].value;
        option.text = ListCustoners[i].Text;
        option.setAttribute("data-name", ListCustoners[i].Text); // เก็บชื่อเดิม
        CustName.appendChild(option);
    }
}

// นับจำนวนบิลของแต่ละลูกค้าจาก DOM แล้วอัปเดตข้อความใน dropdown
function updateCustBillCounts() {
    // นับบิลจากตาราง
    const counts = {};
    const rows = table.rows;
    for (let r = 0; r < rows.length; r++) {
        const code = rows[r].getElementsByTagName("TD")[2]?.value;
        if (code) counts[code] = (counts[code] || 0) + 1;
    }
    // อัปเดตข้อความใน dropdown
    Array.from(CustName.options).forEach(opt => {
        const baseName = opt.getAttribute("data-name") || opt.text;
        if (opt.value && counts[opt.value]) {
            opt.text = baseName + " (" + counts[opt.value] + " บิล)";
        } else {
            opt.text = baseName;
        }
    });
}



function showData(employee){
    var Allrows = table.rows;
    var parBill = parseInt(employee.data().Bill);
    var indexOf = Allrows.length;

    // insert ตามทิศทาง sort ปัจจุบัน
    if (_billSortDir === "asc") {
        for(var i = 0; i < Allrows.length; i++){
            var x = Allrows[i].getElementsByTagName("TD")[1];
            var parX = parseInt(x.innerHTML);
            if(parX > parBill){ indexOf = i; break; }
        }
    } else {
        indexOf = 0;
        for(var i = 0; i < Allrows.length; i++){
            var x = Allrows[i].getElementsByTagName("TD")[1];
            var parX = parseInt(x.innerHTML);
            if(parX < parBill){ indexOf = i; break; }
            indexOf = i + 1;
        }
    }

    const row      = table.insertRow(indexOf);
    const editCol  = row.insertCell(0);
    const Billcol  = row.insertCell(1);
    const nameCol  = row.insertCell(2);
    const Money    = row.insertCell(3);
    const Numbercol= row.insertCell(4);
    const Codename = row.insertCell(5);

    row.id = employee.id;

    nameCol.innerHTML = employee.data().Custname;
    Billcol.innerHTML = employee.data().Bill;
    try { Money.innerHTML = formatNumber(employee.data().MoneyPerBill) + " บาท"; }
    catch { Money.innerHTML = "0 บาท"; }

    Codename.value = employee.data().CustCode;
    nameCol.value  = employee.data().CustCode;

    var strshow = "", strvalue = "";
    const nums = employee.data().Numbers;
    for(var i = 0; i < nums.length; i++){
        strshow  += nums[i] + "<br>";
        strvalue += nums[i] + "\n";
    }
    Numbercol.value   = strvalue;
    Numbercol.innerHTML = "<div class='ShowDatainput'>" + strshow + "</div>";
    Codename.style = "display:none;";

    nameCol.id   = "Name_"     + employee.id;
    Billcol.id   = "Bill_"     + employee.id;
    Numbercol.id = "Numbercol_"+ employee.id;
    Codename.id  = "CodeName_" + employee.id;

    // ปุ่มแก้ไข
    let btn = document.createElement('button');
    btn.textContent = "✏️ แก้ไข";
    btn.className   = "btn-edit";
    editCol.appendChild(btn);
    btn.addEventListener('click', () => openEditModal(employee, strvalue));

    // ===== เช็คยอดเงินสูงผิดปกติ (≥1000 บาท) =====
    const WARN = 1000;
    let hasWarn = false;
    nums.forEach(line => {
        if(!line.includes('=')) return;
        const mp = line.split('=').pop();
        if(!mp.includes('*')) return;
        const p = mp.split('*');
        if((parseInt(p[0])||0) >= WARN || (parseInt(p[1])||0) >= WARN) hasWarn = true;
    });
    if(hasWarn) {
        row.classList.add("warn-row");
        row.title = "⚠️ มียอดเงินสูง กรุณาตรวจสอบ";
        Numbercol.innerHTML = "<span style='color:#f57f17;margin-right:3px;'>⚠️</span>" + Numbercol.innerHTML;
    }
}

// ===== MODAL LOGIC =====
let _modalEmployee = null;

function openEditModal(employee, numbersText) {
    _modalEmployee = employee;
    document.getElementById("modalTitle").textContent =
        "บิล " + employee.data().Bill + " — " + employee.data().Custname;
    document.getElementById("modalBillId").value  = employee.id;
    document.getElementById("modalBill").value    = employee.data().Bill;
    document.getElementById("modalNumbers").value = numbersText.trim();

    const sel = document.getElementById("modalCustName");
    sel.innerHTML = "";
    const srcSel = document.getElementById("CustName");
    Array.from(srcSel.options).forEach(opt => {
        const o = document.createElement("option");
        o.value = opt.value;
        o.text  = opt.getAttribute("data-name") || opt.text;
        o.setAttribute("data-name", opt.getAttribute("data-name") || opt.text);
        if(opt.value === employee.data().CustCode) o.selected = true;
        sel.appendChild(o);
    });

    document.getElementById("editModal").style.display = "flex";

    // เมื่อเปลี่ยนลูกค้า → คำนวณบิลล่าสุดของคนนั้น
    sel.onchange = () => {
        let lastBill = 0;
        Array.from(table.rows).forEach(r => {
            const code = r.getElementsByTagName("TD")[2].value;
            const bill = parseInt(r.getElementsByTagName("TD")[1].innerHTML);
            if(code === sel.value && r.id !== employee.id) {
                if(bill > lastBill) lastBill = bill;
            }
        });
        document.getElementById("modalBill").value = lastBill + 1;
    };
}

window.closeModal = function() {
    document.getElementById("editModal").style.display = "none";
    _modalEmployee = null;
};

window.saveEdit = async function() {
    if (_isSaving) return;
    const id      = document.getElementById("modalBillId").value;
    const sel     = document.getElementById("modalCustName");
    const newCode = sel.value;
    // ดึงชื่อเดิมจาก data-name (ไม่เอาจำนวนบิลที่ต่อท้าย)
    const selectedOpt = sel.options[sel.selectedIndex];
    const newName = selectedOpt.getAttribute("data-name") || selectedOpt.text;
    const newBill = parseInt(document.getElementById("modalBill").value);
    const rawText = document.getElementById("modalNumbers").value;

    if(!newCode)        { alert("กรุณาเลือกลูกค้า"); return; }
    if(!rawText.trim()) { alert("กรุณากรอกตัวเลข"); return; }

    _isSaving = true;
    try {
        const strDB   = datepicker_Login.value.replaceAll("/","") + "_" + ListHui.value;

        // แปลง rawText → Numbers array เหมือนเดิม
        const lines = rawText.split('\n').map(l => l.trim()).filter(l => l !== "");

        // คำนวณยอดเงินรวมใหม่จากตัวเลขที่แก้ไข
        const newMoneyPerBill = calcMoneyPerBill(lines);

        // update doc เดิมแทนการลบแล้วสร้างใหม่ (ประหยัด 1 write)
        await updateDoc(doc(db, strDB, id), {
            Custname:     newName,
            CustCode:     newCode,
            Bill:         newBill,
            Numbers:      lines,
            MoneyPerBill: newMoneyPerBill,
        });

        // รอให้ onSnapshot อัปเดต DOM ก่อน reorder
        await new Promise(r => setTimeout(r, 500));

        // reorder บิลของลูกค้าเดิม (ถ้าย้ายคน ให้ reorder ทั้งสองคน)
        const oldCode = _modalEmployee.data().CustCode;
        await reorderBills(strDB, oldCode);
        if (newCode !== oldCode) await reorderBills(strDB, newCode);

        closeModal();
        Swal.fire({ icon:"success", title:"แก้ไขเรียบร้อย", timer:800, showConfirmButton:false });
    } catch(err) {
        console.error("Edit error:", err);
        Swal.fire({ icon:'error', title:'แก้ไขไม่สำเร็จ', text:'กรุณาลองใหม่อีกครั้ง' });
    } finally {
        _isSaving = false;
    }
};

window.deleteBill = async function() {
    if (_isSaving) return;
    const id = document.getElementById("modalBillId").value;
    const result = await Swal.fire({
        icon: "warning", title: "ลบบิลนี้?",
        text: "ข้อมูลจะหายถาวร",
        showCancelButton: true,
        confirmButtonColor: "#b71c1c",
        confirmButtonText: "ลบเลย",
        cancelButtonText: "ยกเลิก"
    });
    if(!result.isConfirmed) return;

    _isSaving = true;
    try {
        const strDB    = datepicker_Login.value.replaceAll("/","") + "_" + ListHui.value;
        const custCode = _modalEmployee.data().CustCode;
        await deleteDoc(doc(db, strDB, id));
        // รอให้ onSnapshot ลบ row ออกจาก DOM ก่อน reorder
        await new Promise(r => setTimeout(r, 500));
        await reorderBills(strDB, custCode);
        closeModal();
    } catch(err) {
        console.error("Delete error:", err);
        Swal.fire({ icon:'error', title:'ลบไม่สำเร็จ', text:'กรุณาลองใหม่อีกครั้ง' });
    } finally {
        _isSaving = false;
    }
};

// ── reorder บิลของลูกค้าคนนึงใหม่ตั้งแต่ 1 (อ่านจาก DOM ประหยัด reads) ──
async function reorderBills(strDB, custCode) {
    const rows = table.rows;
    const billsInDOM = [];
    for (let r = 0; r < rows.length; r++) {
        const code = rows[r].getElementsByTagName("TD")[2]?.value;
        const bill = parseInt(rows[r].getElementsByTagName("TD")[1]?.innerHTML);
        if (code === custCode && !isNaN(bill)) {
            billsInDOM.push({ id: rows[r].id, bill: bill });
        }
    }
    if (billsInDOM.length === 0) return;

    billsInDOM.sort((a, b) => a.bill - b.bill);

    const batch = writeBatch(db);
    let hasChange = false;
    for (let i = 0; i < billsInDOM.length; i++) {
        const newBill = i + 1;
        if (billsInDOM[i].bill !== newBill) {
            batch.update(doc(db, strDB, billsInDOM[i].id), { Bill: newBill });
            hasChange = true;
        }
    }
    if (hasChange) await batch.commit();
}
// ─────────────────────────────────────────────────────────────────────────────

var BtnSubmin = document.getElementById("BtnSubmin")

var _isSaving = false; // ป้องกันกดบันทึกซ้ำ

//ดึงข้อมูลจากแบบฟอร์ม
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if (_isSaving) return;
    if(CheckInputData()){
        _isSaving = true;
        try {
            await doSave();
        } catch(err) {
            console.error("Save error:", err);
            Swal.fire({ icon:'error', title:'บันทึกไม่สำเร็จ', text:'กรุณาลองใหม่อีกครั้ง' });
        } finally {
            _isSaving = false;
        }
    }
})


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//form.AllNumber.value = "10, 01=100*100\n02,20=0*20\n03,30=20*0\n123=100*100\n456=100*0\n789=100*6\n112=100*3";

var tmpinputData = [];


var SumTotalPerBill = 0 ;



function CheckInputData(){
var resulst = false;


var allnumber = form.AllNumber.value
var RoodNumber = form.tbxRoodNumber.value;

const Bill = form.Bill.value
const name = form.name.value




if(name == null || name == ""){
    Swal.fire({
        icon: 'error',
        title: 'กรุณาเลือกผู้ซื้อขาย',

      })
    //alert("กรุณาเลือกผู้ซื้อขาย")
    return resulst;
}
if(Bill == "" ){
    Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลบิล',

      })
    //alert("กรุณากรอกข้อมูลบิล")
    return resulst;
}
if(allnumber.trim() == "" && RoodNumber.trim() == "" ){
    //alert("กรุณากรอกตัวเลข")
    Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกตัวเลข',

      })
    return resulst;
}

tmpinputData = [];

//console.log("RoodNumber : " + RoodNumber);

if(RoodNumber.trim() != ""){
    
    /*RoodNumber = RoodNumber.replaceAll('.',",");
    RoodNumber = RoodNumber.replaceAll(' ',",");
    RoodNumber = RoodNumber.replaceAll('-',",");
    RoodNumber = RoodNumber.replaceAll('/',",");

    RoodNumber = RoodNumber.replaceAll(",,",",");*/
    RoodNumber = RoodNumber.replaceAll(',=',"=");
    RoodNumber = RoodNumber.replaceAll('=,',"=");

 
    RoodNumber = RoodNumber.replaceAll('x',"*");
    RoodNumber = RoodNumber.replaceAll('+',"*");
    //RoodNumber = RoodNumber.replaceAll('×',"*");

    

    RoodNumber = RoodNumber.replaceAll(",*,","*");
    RoodNumber = RoodNumber.replaceAll(",*","*");
    RoodNumber = RoodNumber.replaceAll("*,","*");

    var splInput = RoodNumber.split('\n');
    //console.log("RoodNumber splInput : ");
    //console.log(splInput);

    for(var i = 0 ; i<splInput.length ; i ++ ){
        if(splInput[i].trim() == ""){
            continue;
        }
        var splData= splInput[i].split('=');

        // เช็คว่ามียอดเงินหรือไม่ (ต้องมี = คั่น)
        if(splData.length < 2 || !splData[1] || splData[1].trim() == ""){
            Swal.fire({
                icon: 'error',
                title: 'ลืมใส่ยอดเงิน',
                text: 'แถว: ' + splInput[i].trim() + ' — ต้องใส่ =ยอด*ยอด ต่อท้าย',
            })
            return resulst;
        }
        
        var finddot =  splData[0].indexOf(".");
        if(finddot >= 0){
            splData[0] = splData[0].replaceAll(' ',"");

            splData[0] = splData[0].replaceAll('.',",");
            splData[0] = splData[0].replaceAll('-',",");
            splData[0] = splData[0].replaceAll('/',",");
        
            splData[0] = splData[0].replaceAll(",,",",");

        }else{
            splData[0] = splData[0].replaceAll(' ',",");

            //splData[0] = splData[0].replaceAll('.',",");
            splData[0] = splData[0].replaceAll('-',",");
            splData[0] = splData[0].replaceAll('/',",");
            splData[0] = splData[0].replaceAll(",,",",");

        }

        var splNumber = splData[0].split(',');
        for(var n = 0 ; n <splNumber.length ; n++ ){ //เช็คตัวเลข
            var strnumber = splNumber[n];

            if(strnumber.trim() == ""){
                continue;
            }

            if(strnumber.length ==1 ){
                var strNumbers = "";
                for(var R= 0 ; R < 10 ; R ++){

                    if(R == 0){
                        if( parseInt(strnumber) == 0 ){
                            strNumbers += R+""+strnumber;
                        }else{
                            strNumbers += R+""+strnumber + ","+strnumber+""+R;
                        }

                    }else if ( R == parseInt(strnumber)){
                        strNumbers += ","+R+""+strnumber;
                    }else{

                        strNumbers += ","+R+""+strnumber + ","+strnumber+""+R;
                    }


                }
                //console.log("strNumbers : " + strNumbers);
                var splMoney = splData[1].split('*');
        
                try{
                    var topMon= parseInt(splMoney[0]);
                    var BotMon= parseInt(splMoney[1]);
                    //console.log("topMon : " + topMon);
                    //console.log("BotMon : " + BotMon);
                    //console.log(topMon + " " +BotMon)
                    if(topMon == 0 && BotMon == 0){
                        //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                        Swal.fire({
                            icon: 'error',
                            title: 'จำนวนเงินมีปัญหา',
                            text: splData[1],
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }

                    if(topMon < 0 ){
                        //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                        Swal.fire({
                            icon: 'error',
                            title: 'จำนวนเงินมีปัญหา',
                            text: splData[1],
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
        
                    if(BotMon < 0 ){
                        //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                        Swal.fire({
                            icon: 'error',
                            title: 'จำนวนเงินมีปัญหา',
                            text: splData[1],
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }

                    if(isNaN(topMon) ||isNaN(BotMon) ){
                        Swal.fire({
                            icon: 'error',
                            title: 'จำนวนเงินมีปัญหา',
                            text: splData[1],
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
        
        
                }catch{
                    //alert("จำนวนเงินมีปัญหา : "  + splMoney );
                    Swal.fire({
                        icon: 'error',
                        title: 'จำนวนเงินมีปัญหา - ',
                        text: splData[1],
                        //footer: '<a href="">Why do I have this issue?</a>'
                      })
                    return resulst;
                }
        
        
                tmpinputData.push(strNumbers +"="+ topMon + "*" + BotMon);
                //console.log("tmpinputData : " + strNumbers +"="+ topMon + "*" + BotMon);



            }


        }




    }

}



if(allnumber != null && allnumber != ""){
    
   /*allnumber = allnumber.replaceAll('.',",");
    allnumber = allnumber.replaceAll(' ',",");
    allnumber = allnumber.replaceAll('-',",");
    allnumber = allnumber.replaceAll('/',",");

    allnumber = allnumber.replaceAll(",,",",");*/

    allnumber = allnumber.replaceAll(',=',"=");
    allnumber = allnumber.replaceAll('=,',"=");

 
    allnumber = allnumber.replaceAll('x',"*");
    allnumber = allnumber.replaceAll('+',"*");
    allnumber = allnumber.replaceAll('X',"*");
    allnumber = allnumber.replaceAll(/\u00D7/gi, "*");

    allnumber = allnumber.replaceAll(",*,","*");
    allnumber = allnumber.replaceAll(",*","*");
    allnumber = allnumber.replaceAll("*,","*");

    var splInput = allnumber.split('\n');
    //tmpinputData = splInput;
    //console.log(splInput);
    //console.log("allnumber")
    //console.log(splInput)
    for(var i = 0 ; i < splInput.length ; i++){
        //console.log(i + ". "+splInput[i] );
        if(splInput[i].trim() == ""){
            //splInput.pop();
            continue;
        }
        //console.log(splInput[i])
        var splData= splInput[i].split('=');

        // เช็คว่ามียอดเงินหรือไม่ (ต้องมี = คั่น)
        if(splData.length < 2 || !splData[1] || splData[1].trim() == ""){
            Swal.fire({
                icon: 'error',
                title: 'ลืมใส่ยอดเงิน',
                text: 'แถว: ' + splInput[i].trim() + ' — ต้องใส่ =ยอด*ยอด ต่อท้าย',
            })
            return resulst;
        }

        var finddot =  splData[0].indexOf(".");
        //console.log("finddot : " + finddot);
        if(finddot >= 0){
            splData[0] = splData[0].replaceAll(' ',"");

            splData[0] = splData[0].replaceAll('.',",");
            splData[0] = splData[0].replaceAll('-',",");
            splData[0] = splData[0].replaceAll('/',",");
        
            splData[0] = splData[0].replaceAll(",,",",");

        }else{
            splData[0] = splData[0].replaceAll(' ',",");

            //splData[0] = splData[0].replaceAll('.',",");
            splData[0] = splData[0].replaceAll('-',",");
            splData[0] = splData[0].replaceAll('/',",");
            splData[0] = splData[0].replaceAll(",,",",");

        }


        var splNumber = splData[0].split(',');

        //console.log(splNumber)

        var strfixLength = 0;
        var strclearNumber = [];
        var lockData = ""; 
        for(var n = 0 ; n <splNumber.length ; n++ ){ //เช็คตัวเลข
            var strnumber = splNumber[n];

            if(strnumber.trim() == ""){
                continue;
            }

            if(lockData == ""){
                var lengnum = strnumber.length;
                lockData = lengnum;
            }else{
                var lengnum = strnumber.length;
                if(lockData == 1 && lengnum > 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'ชุดข้อมูลมีปัญหา',
                        text: splNumber,
                        //footer: '<a href="">Why do I have this issue?</a>'
                      })
                    return resulst;
                }else if((lockData == 2 || lockData == 3 ) && lengnum == 1){
                    Swal.fire({
                        icon: 'error',
                        title: 'มีเลขวิ่ง '+strnumber+' ในชุดข้อมูล',
                        text: splNumber,
                        //footer: '<a href="">Why do I have this issue?</a>'
                      })
                    return resulst;
                }
                
            }
            //console.log( " => " + n + ". "+ strnumber  + " ,Length : " + strnumber.length);
            if(strnumber.length == 2){
                //console.log(strnumber + " ,CHECK : " + strnumber.length);
                var numb1 = splNumber[n].charAt((1));
                var numb2 = splNumber[n].charAt((0));

                    var parnumb1 = parseInt(numb1);
                    var parnumb2 = parseInt(numb2);

                    if(!Number.isInteger(parnumb1)){
                        Swal.fire({
                            icon: 'error',
                            title: 'ชุดข้อมูลมีปัญหา',
                            text: splNumber,
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
                    if(!Number.isInteger(parnumb2)){
                        Swal.fire({
                            icon: 'error',
                            title: 'ชุดข้อมูลมีปัญหา',
                            text: splNumber,
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
            }
            if(strnumber.length == 3){
                //console.log(strnumber + " ,CHECK : " + strnumber.length);
                var numb0 = splNumber[n].charAt((2));
                var numb1 = splNumber[n].charAt((1));
                var numb2 = splNumber[n].charAt((0));

                    var parnumb0 = parseInt(numb0);
                    var parnumb1 = parseInt(numb1);
                    var parnumb2 = parseInt(numb2);

                    if(!Number.isInteger(parnumb0)){
                        Swal.fire({
                            icon: 'error',
                            title: 'ชุดข้อมูลมีปัญหา',
                            text: splNumber,
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
                    if(!Number.isInteger(parnumb1)){
                        Swal.fire({
                            icon: 'error',
                            title: 'ชุดข้อมูลมีปัญหา',
                            text: splNumber,
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
                    if(!Number.isInteger(parnumb2)){
                        Swal.fire({
                            icon: 'error',
                            title: 'ชุดข้อมูลมีปัญหา',
                            text: splNumber,
                            //footer: '<a href="">Why do I have this issue?</a>'
                          })
                        return resulst;
                    }
            }
            if(strnumber.length > 3){
                //alert("ชุดข้อมูลมีปัญหา : "  + splNumber );
                //alert("กรุณากรอกตัวเลข")
                Swal.fire({
                    icon: 'error',
                    title: 'ชุดข้อมูลมีปัญหา',
                    text: splNumber,
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
                //error ชุดข้อมูลมีปัญหา
            }
            
            strclearNumber.push(strnumber);
        }
        //console.log("strclearNumber : " + strclearNumber);

        var splMoney = splData[1].split('*');

        try{
            var topMon= parseInt(splMoney[0]);
            var BotMon= parseInt(splMoney[1]);
            //console.log("topMon : " + topMon);
            //console.log("BotMon : " + BotMon);
            //console.log(topMon + " " +BotMon)


            if(splMoney[1].trim().length > 4 ){
                Swal.fire({
                    icon: 'error',
                    title: 'จำนวนเงินมีปัญหา',
                    text: splData[0] + " = "+splData[1],
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
            }


            if(topMon == 0 && BotMon == 0){
                //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                Swal.fire({
                    icon: 'error',
                    title: 'จำนวนเงินมีปัญหา',
                    text: splData[0] + " = "+splData[1],
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
            }

            if(topMon <  0){
                //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                Swal.fire({
                    icon: 'error',
                    title: 'จำนวนเงินมีปัญหา',
                    text: splData[0] + " = "+splData[1],
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
            }

            if(BotMon <  0){
                //alert("จำนวนเงินมีปัญหา : "  + splData[1]);
                Swal.fire({
                    icon: 'error',
                    title: 'จำนวนเงินมีปัญหา',
                    text: splData[0] + " = "+splData[1],
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
            }

            if(isNaN(topMon) ||isNaN(BotMon) ){
                Swal.fire({
                    icon: 'error',
                    title: 'จำนวนเงินมีปัญหา',
                    text: splData[0] + " = "+splData[1],
                    //footer: '<a href="">Why do I have this issue?</a>'
                  })
                return resulst;
            }

            




        }catch{
            //alert("จำนวนเงินมีปัญหา : "  + splMoney );
            Swal.fire({
                icon: 'error',
                title: 'จำนวนเงินมีปัญหา',
                text: splData[0] + " = "+splData[1],
                //footer: '<a href="">Why do I have this issue?</a>'
              })
            return resulst;
        }

        //console.log( "PUSH  : " + strclearNumber +"="+ topMon + "*" + BotMon)
        tmpinputData.push(strclearNumber +"="+ topMon + "*" + BotMon);
    }
   




    //tmpinputData = splInput;

    //console.log(tmpinputData);

}
    //console.log(tmpinputData);

SumTotalPerBill = 0 ;

SumTotalPerBill = calcMoneyPerBill(tmpinputData);

//console.log("SumTotalPerBill : " + SumTotalPerBill);

// ===== บันทึกได้เลย =====
resulst = true;

return resulst;
}

// ── คำนวณยอดเงินรวมต่อบิลจาก Numbers array ──────────────────────────────────
function calcMoneyPerBill(numbersArr) {
    var total = 0;
    for (var i = 0; i < numbersArr.length; i++) {
        var sprData = numbersArr[i].split("=");
        if (sprData.length < 2) continue;
        var tmpNumber = sprData[0];
        var tmpMoney = sprData[1];
        var splMoney = tmpMoney.split('*');
        var topMon = parseInt(splMoney[0]) || 0;
        var BotMon = parseInt(splMoney[1]) || 0;
        var sprNumber = tmpNumber.split(",");
        for (var n = 0; n < sprNumber.length; n++) {
            var lengthNumber = sprNumber[n].trim().length;
            if (lengthNumber === 0) continue;
            if (lengthNumber < 3) {
                total += topMon + BotMon;
            } else if (lengthNumber === 3) {
                if (BotMon === 3 || BotMon === 6) {
                    var numb0 = sprNumber[n].charAt(0);
                    var numb1 = sprNumber[n].charAt(1);
                    var numb2 = sprNumber[n].charAt(2);
                    var listnumb = [
                        numb0+numb1+numb2, numb0+numb2+numb1,
                        numb1+numb2+numb0, numb1+numb0+numb2,
                        numb2+numb0+numb1, numb2+numb1+numb0,
                    ];
                    var uniqueNums = listnumb.filter(onlyUnique);
                    for (var u = 0; u < uniqueNums.length; u++) {
                        total += topMon;
                    }
                } else {
                    total += topMon + BotMon;
                }
            }
        }
    }
    return total;
}
// ─────────────────────────────────────────────────────────────────────────────

// แยก save logic ออกมาเพื่อให้ modal เตือนเรียกได้
async function doSave(){
    var currentdate = new Date();
    var datetime = datepicker_Login.value.replaceAll("/","") + ""
                    + currentdate.getHours() + ""
                    + currentdate.getMinutes() + ""
                    + currentdate.getSeconds();
    var e = document.getElementById("CustName");
    var selectedOpt = e.options[e.selectedIndex];
    var textcustname = selectedOpt.getAttribute("data-name") || selectedOpt.text;

    if(form.TimeSet.value != "") datetime = form.TimeSet.value;

    var strDB    = datepicker_Login.value.replaceAll("/","") + "_" + ListHui.value;
    var custCode = form.name.value;
    var newBill  = parseInt(form.Bill.value);

    // เคลียร์ฟอร์มก่อน เพื่อป้องกันกดซ้ำ
    form.AllNumber.value    = "";
    form.TimeSet.value      = "";
    form.tbxRoodNumber.value = "";

    // แสดง popup ทันทีก่อนรอ Firebase
    Swal.fire({ icon:'success', title:'บันทึกแล้ว', showConfirmButton:false, timer:500 });

    // ── เช็คว่าบิลซ้ำไหม จาก DOM (ไม่ต้อง query Firebase ซ้ำ — ประหยัด reads) ──
    const existingBills = [];
    const rows = table.rows;
    for (let r = 0; r < rows.length; r++) {
        const code = rows[r].getElementsByTagName("TD")[2]?.value;
        const bill = parseInt(rows[r].getElementsByTagName("TD")[1]?.innerHTML);
        if (code === custCode && !isNaN(bill) && bill >= newBill) {
            existingBills.push({ id: rows[r].id, bill: bill });
        }
    }

    if (existingBills.length > 0) {
        // เรียงจากมากไปน้อย เพื่อเลื่อนจากท้ายก่อน (ป้องกันชนกัน)
        existingBills.sort((a, b) => b.bill - a.bill);
        const batch = writeBatch(db);
        existingBills.forEach(d => {
            batch.update(doc(db, strDB, d.id), { Bill: d.bill + 1 });
        });
        await batch.commit();
    }
    // ────────────────────────────────────────────────────────────────────────

    await addDoc(collection(db, strDB), {
        Custname:     textcustname,
        CustCode:     custCode,
        Bill:         newBill,
        Numbers:      tmpinputData,
        MoneyPerBill: SumTotalPerBill,
        UserName:     currentUser.username,
        AddTime:      datetime
    });
}

// ── Sort บิล ──────────────────────────────────────────────────────────────────
var _billSortDir = "asc"; // "asc" = น้อยไปมาก, "desc" = มากไปน้อย

function sortTableByBill() {
    const rowsArr = Array.from(table.rows);
    if (_billSortDir === "asc") {
        rowsArr.sort((a, b) => {
            return parseInt(a.getElementsByTagName("TD")[1].innerHTML) - parseInt(b.getElementsByTagName("TD")[1].innerHTML);
        });
    } else {
        rowsArr.sort((a, b) => {
            return parseInt(b.getElementsByTagName("TD")[1].innerHTML) - parseInt(a.getElementsByTagName("TD")[1].innerHTML);
        });
    }
    rowsArr.forEach(row => table.appendChild(row));

    // อัปเดตลูกศรในหัวตาราง
    const th = document.getElementById("thBillSort");
    if (th) th.textContent = "บิล " + (_billSortDir === "asc" ? "▲" : "▼");
}

document.addEventListener("DOMContentLoaded", () => {
    const th = document.getElementById("thBillSort");
    if (th) {
        th.addEventListener("click", () => {
            _billSortDir = _billSortDir === "asc" ? "desc" : "asc";
            sortTableByBill();
        });
    }
});
// ─────────────────────────────────────────────────────────────────────────────

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}









