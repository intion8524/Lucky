import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore , collection , query, where, onSnapshot , orderBy, limit } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
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
  const db = getFirestore(app)  
  $( "#datepicker" ).datepicker({
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
      yearRange: "2020:2030"
  });
  $( "#datepicker" ).datepicker("setDate", new Date());
  var datepicker_Login = document.getElementById("datepicker")
  var CustName = document.getElementById("CustName")

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


var listCustomer = [
    {
        value : "",
        Text : "-- โปรดเลือก --"
    },
    {
        value : "LEKSAMTUAR",
        Text : "- เลข 3 ตัวส่งออก"
    },
    {
        value : "PITHUN",
        Text : "พิตหุ้น"
    },
    {
        value : "AOMHUN",
        Text : "อ้อมหุ้น"
    },
    {
        value : "THAIHUN",
        Text : "ส่งออกไทย"
    },
    {
        value : "HOUN",
        Text : "หุ้น"
    },
    {
        value : "WILAILUX",
        Text : "วิไลลักษณ์"
    },
    {
        value : "FERN",
        Text : "เฟิร์น"
    },
    {
        value : "NUNOI",
        Text : "นู๋หน่อย"
    },
    {
        value : "BANK",
        Text : "แบงค์"
    },
    {
        value : "PATUENG",
        Text : "ป้าตึ๋ง"
    },
    {
        value : "PEPEE4",
        Text : "พี่ปี 4"
    },
    {
        value : "JHIM",
        Text : "จิ๋ม"
    },
    {
        value : "MIT",
        Text : "มิตร"
    },
    {
        value : "PAMALINEE",
        Text : "ป้ามาลินี"
    },
    {
        value : "MON",
        Text : "มนต์"
    },
    {
        value : "TOY",
        Text : "ต้อย"
    },
    {
        value : "DAINAMO",
        Text : "ไดนาโม"
    },
    {
        value : "PAJOI",
        Text : "ป้าจ่อย"
    },
    {
        value : "KOB",
        Text : "กบ"
    },
    {
        value : "PIM",
        Text : "พิมพ์"
    },
    {
        value : "JAIB",
        Text : "เจี๊ยบ"
    },
    {
        value : "ARTID",
        Text : "อาทิตย์"
    },
    {
        value : "PAJAIW",
        Text : "ป้าแจ๋ว"
    },
    {
        value : "KHAN",
        Text : "ขวัญ"
    },
    {
        value : "KHEM",
        Text : "เข็ม"
    },
    {
        value : "AHNING",
        Text : "อ.หนิง"
    },
    {
        value : "VEING",
        Text : "เวียง"
    },
    {
        value : "PIT",
        Text : "พิต"
    },
    {
        value : "TAR",
        Text : "ต้า"
    },
    {
        value : "KAINU",
        Text : "ไก่นุ"
    },
    {
        value : "BHUM",
        Text : "บุ๋ม"
    },
    {
        value : "PAE",
        Text : "เป้"
    },
    {
        value : "PAAOI",
        Text : "ป้าอ้อย"
    },
    {
        value : "SUPUNNEE",
        Text : "สุพรรณี"
    },
    {
        value : "PENOM",
        Text : "พี่นอม"
    },
    {
        value : "MALI",
        Text : "มะลิ"
    },
    {
        value : "TAD",
        Text : "แทด"
    },
    {
        value : "AU",
        Text : "อุ๊"
    },
    {
        value : "NI",
        Text : "นิ"
    },
    {
        value : "PATTY",
        Text : "แพตตี้"
    },
    {
        value : "KEE",
        Text : "กี้"
    }
    ,
    {
        value : "NAN",
        Text : "แนน"
    }
    ,
    {
        value : "NOK",
        Text : "นก"
    },
    {
        value : "KAINOI",
        Text : "พี่ไก่น้อย"
    },
    {
        value : "PEEPE3",
        Text : "พี่ปี 3 "
    },
    {
        value : "PEEJAIW",
        Text : "พี่แจ๋ว"
    }
    ,
    {
        value : "PEEPENOITONG",
        Text : "พี่ปี-นอยลาว(โต้ง)"
    },
    {
        value : "SORPEN",
        Text : "ซ้อเพ็ญ"
    },
    {
        value : "KULAB",
        Text : "กุหลาบ"
    },
    {
        value : "SOR",
        Text : "สอ"
    },
    {
        value : "BIW",
        Text : "บิว"
    },
    {
        value : "POM",
        Text : "บ๋อม"
    },
    {
        value : "MOOK",
        Text : "มุก"
    },
    {
        value : "AUW",
        Text : "อิ๋ว"
    },
    {
        value : "JUNDA",
        Text : "จันดา"
    },
    {
        value : "ANNA",
        Text : "แอนนา"
    },
    {
        value : "NABUM",
        Text : "น้าบุ๋ม"
    },
    {
        value : "TUKTA",
        Text : "ตุ๊กตา"
    },
    {
        value : "AAD",
        Text : "แอ๊ด"
    },
    {
        value : "JAKAOWN",
        Text : "เจ้ขวัญเกาหลี"
    },
    {
        value : "SONHOOGTHAI",
        Text : "ส่งออกไทย"
    },                        {
        value : "KuPajeaw",
        Text : "ครูป้าแจ๋ว"
    },
    {
        value : "JAN",
        Text : "เจน"
    },                                                {
                            value : "TAI",
                            Text : "ต่าย"
                        },

]

listCustomer.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
  

var listCustomer_02 = [
   {
                            value : "",
                            Text : "-โปรดเลือก-"
                        },
                        {
                            value : "PEEJAIW",
                            Text : "พี่แจ๋ว"
                        },
                        {
                            value : "JUNDA",
                            Text : "จันดา"
                        },
                        {
                            value : "ANNA",
                            Text : "แอนนา"
                        },
                        {
                            value : "JAKAOWN",
                            Text : "เจ้ขวัญเกาหลี"
                        },
                        {
                            value : "SONHOOGTHAI",
                            Text : "ส่งออกไทย"
                        },{
        value : "NABUM",
        Text : "น้าบุ๋ม"
    },
    
]

listCustomer_02 = listCustomer_02.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });

var listCustomer_03 = [
    {
                            value : "",
                            Text : "-โปรดเลือก-"
                        },
                        {
                            value : "PAJOI",
                            Text : "ป้าจ่อย"
                        },
                        {
                            value : "JHIM",
                            Text : "จิ๋ม"
                        },
                        {
                            value : "KAINU",
                            Text : "ไก่นุ"
                        }, 
                        {
                            value : "PIT",
                            Text : "พิต"
                        }, 
                        {
                            value : "PAMALINEE",
                            Text : "ป้ามาลินี"
                        },
                        {
                            value : "KuPajeaw",
                            Text : "ครูป้าแจ๋ว"
                        }, 
                        {
                            value : "SUPUNNEE",
                            Text : "สุพรรณี"
                        },
                        {
                            value : "DAINAMO",
                            Text : "ไดนาโม"
                        },
                        {
                            value : "PIM",
                            Text : "พิมพ์"
                        },
                        {
                            value : "TOY",
                            Text : "ต้อย"
                        },
                        {
                            value : "PAE",
                            Text : "เป้"
                        },                                                {
                            value : "TAI",
                            Text : "ต่าย"
                        },

]
listCustomer_03 = listCustomer_03.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_04 = [
    {
        value : "",
        Text : "โปรดเลือก"
    }
]

listCustomer_04 = listCustomer_04.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_05 = [
     {
                            value : "",
                            Text : "-โปรดเลือก-"
                        },
                                                {
                            value : "SOR",
                            Text : "สอ"
                        },
                        {
                            value : "BIW",
                            Text : "บิว"
                        },
                        {
                            value : "POM",
                            Text : "บ๋อม"
                        },
                        {
                            value : "MOOK",
                            Text : "มุก"
                        },
                        {
                            value : "AUW",
                            Text : "อิ๋ว"
                        }
                        ,
                        {
                            value : "TUKTA",
                            Text : "ตุ๊กตา"
                        },
                        {
                            value : "JAN",
                            Text : "เจน"
                        },                        {
                            value : "KULAB",
                            Text : "กุหลาบ"
                        },

]

listCustomer_05 = listCustomer_05.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_06 = [
    {
        value : "",
        Text : "โปรดเลือก"
    },
    {
        value : "TAD",
        Text : "แทด"
    }
    ,
    {
        value : "MIT",
        Text : "มิตร"
    }
    ,
    {
        value : "PEEPENOITONG",
        Text : "พี่ปี-นอยลาว(โต้ง)"
    },
    {
        value : "PEEPE3",
        Text : "พี่ปี 3 "
    }
    

]

listCustomer_06 = listCustomer_06.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_07 = [
    {
        value : "",
        Text : "โปรดเลือก"
    }
]

listCustomer_07 = listCustomer_07.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_09 = [
    {
        value : "",
        Text : "โปรดเลือก"
    }
]
listCustomer_09 = listCustomer_09.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });
var listCustomer_08 = [
     {
                            value : "",
                            Text : "-โปรดเลือก-"
                        },
                        {
                            value : "BHUM",
                            Text : "บุ๋ม"
                        },
                        {
                            value : "PAJAIW",
                            Text : "ป้าแจ๋ว"
                        },
                         {
                            value : "KEE",
                            Text : "กี้"
                        },
                      {
        value : "JAIB",
        Text : "เจี๊ยบ"
    },{
        value : "NI",
        Text : "นิ"
    },{
        value : "NAN",
        Text : "แนน"
    },{
        value : "PENOM",
        Text : "พี่นอม"
    },{
        value : "KOB",
        Text : "กบ"
    }, {
        value : "PATTY",
        Text : "แพตตี้"
    }, {
        value : "WILAILUX",
        Text : "วิไลลักษณ์"
    },    {
        value : "BANK",
        Text : "แบงค์"
    },{
        value : "AAD",
        Text : "แอ๊ด"
    },

    
]

listCustomer_08 = listCustomer_08.sort(function (a, b) {
    if (a.Text < b.Text) {
      return -1;
    }
    if (a.Text > b.Text) {
      return 1;
    }
    return 0;
  });


const TableCountBill = document.getElementById("TableCountBill") 
const TableCountBill_02 = document.getElementById("TableCountBill_02") 
const TableCountBill_03 = document.getElementById("TableCountBill_03") 
//const TableCountBill_04 = document.getElementById("TableCountBill_04") 
const TableCountBill_05 = document.getElementById("TableCountBill_05") 
const TableCountBill_06 = document.getElementById("TableCountBill_06") 
//const TableCountBill_07 = document.getElementById("TableCountBill_07") 
//const TableCountBill_09 = document.getElementById("TableCountBill_09") 
const TableCountBill_08 = document.getElementById("TableCountBill_08") 

addDDlCust(listCustomer);
function addDDlCust( ListCustoners ){
    //console.log(listCustomer);
    CustName.innerHTML = "";
    var  lengthddl = ListCustoners.length;
    for(var i = 0 ; i < lengthddl ;i ++){
        var option = document.createElement("option");
        option.value = ListCustoners[i].value;
        option.text = ListCustoners[i].Text;
        CustName.appendChild(option);

    }
   
}



function createTableCountBill( ListCustoners ){
    //console.log(listCustomer);
    CustName.innerHTML = "";
    /*var  lengthddl = ListCustoners.length;

    const row = TableCountBill.insertRow(-1)
    const col = row.insertCell(0)
    var ListData = "";
    for(var i = 0 ; i < lengthddl ;i ++){
        if(ListCustoners[i].value != ""){

            ListData += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+ListCustoners[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+ListCustoners[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData+="";
    col.innerHTML = ListData;
    */


    var  lengthddl_02 = listCustomer_02.length;
    const row_02 = TableCountBill_02.insertRow(-1)
    const col_02 = row_02.insertCell(0)
    var ListData_02 = "";
    for(var i = 0 ; i < lengthddl_02 ;i ++){
        if(listCustomer_02[i].value != ""){

            ListData_02 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_02[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_02[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_02+="";
    col_02.innerHTML = ListData_02;


    var  lengthddl_03 = listCustomer_03.length;
    const row_03 = TableCountBill_03.insertRow(-1)
    const col_03 = row_03.insertCell(0)
    var ListData_03 = "";
    for(var i = 0 ; i < lengthddl_03 ;i ++){
        if(listCustomer_03[i].value != ""){

            ListData_03 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_03[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_03[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_03+="";
    col_03.innerHTML = ListData_03;


    /*var  lengthddl_04 = listCustomer_04.length;
    const row_04 = TableCountBill_04.insertRow(-1)
    const col_04 = row_04.insertCell(0)
    var ListData_04 = "";
    for(var i = 0 ; i < lengthddl_04 ;i ++){
        if(listCustomer_04[i].value != ""){

            ListData_04 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_04[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_04[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_04+="";
    col_04.innerHTML = ListData_04;*/


    
    var  lengthddl_05 = listCustomer_05.length;
    const row_05 = TableCountBill_05.insertRow(-1)
    const col_05 = row_05.insertCell(0)
    var ListData_05 = "";
    for(var i = 0 ; i < lengthddl_05 ;i ++){
        if(listCustomer_05[i].value != ""){

            ListData_05 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_05[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_05[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_05+="";
    col_05.innerHTML = ListData_05;

    var  lengthddl_06 = listCustomer_06.length;
    const row_06 = TableCountBill_06.insertRow(-1)
    const col_06 = row_06.insertCell(0)
    var ListData_06 = "";
    for(var i = 0 ; i < lengthddl_06 ;i ++){
        if(listCustomer_06[i].value != ""){

            ListData_06 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_06[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_06[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_06+="";
    col_06.innerHTML = ListData_06;



    /*var  lengthddl_07 = listCustomer_07.length;
    const row_07 = TableCountBill_07.insertRow(-1)
    const col_07 = row_07.insertCell(0)
    var ListData_07 = "";
    for(var i = 0 ; i < lengthddl_07 ;i ++){
        if(listCustomer_07[i].value != ""){

            ListData_07 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_07[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_07[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_07+="";
    col_07.innerHTML = ListData_07;*/

    /*var  lengthddl_09 = listCustomer_09.length;
    const row_09 = TableCountBill_09.insertRow(-1)
    const col_09 = row_09.insertCell(0)
    var ListData_09 = "";
    for(var i = 0 ; i < lengthddl_09 ;i ++){
        if(listCustomer_09[i].value != ""){

            ListData_09 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_09[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_09[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_09+="";
    col_09.innerHTML = ListData_09;*/



    var  lengthddl_08 = listCustomer_08.length;
    const row_08 = TableCountBill_08.insertRow(-1)
    const col_08 = row_08.insertCell(0)
    var ListData_08 = "";
    for(var i = 0 ; i < lengthddl_08 ;i ++){
        if(listCustomer_08[i].value != ""){

            ListData_08 += "<PP style = \"width: 140px;height: 100px; display: inline-grid;\"><label>"+listCustomer_08[i].Text+"</label><input type=\"text\" class = \"BillCount\" id =\"Bill_"+listCustomer_08[i].value+"\" value = \"0\" readonly></input></PP>";
        }
    }
    ListData_08+="";
    col_08.innerHTML = ListData_08;



}



function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const TwoNumbertable1 = document.getElementById("TableTwoNumber_1") 
const TwoNumbertable2 = document.getElementById("TableTwoNumber_2") 
function createTableforTwoNumber(){
var switfTableTwoNumbers = 1;
    var indexcol = 1;
    for(var i = 0 ; i < 10 ;i ++){
        for(var j = indexcol ; j < 10 ; j++){
        //console.log(i+""+j+" = " +j+""+i);
        const row = TwoNumbertable1.insertRow(-1)
        const Numbercol = row.insertCell(0)
        const TopMcol = row.insertCell(1)
        const BotMcol = row.insertCell(2)
    
        Numbercol.id = "TwoNumber_"+i+""+j;
        //TopMcol.id = "TwoTopcol_"+i+""+j;
        //BotMcol.id = "TwoBotcol_"+i+""+j;
    
        //Numbercol.style.color = "blue";
        Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px;"
        /*    text-align: center;
    font-size: 20px;
    padding-bottom: 0px;*/
        TopMcol.style = "text-align: right;";
        BotMcol.style = "text-align: right;";

        

        Numbercol.value = i+""+j;
        TopMcol.value = 0;
        BotMcol.value = 0;

        var tbntowNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoTopcol_"+i+""+j+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcol2_"+i+""+j+"\" style = \"display:none;\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcolKeep_"+i+""+j+"\" style = \"\" value = \"0\"  hidden readonly></input></div>";
        var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoBotcol_"+i+""+j+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcol2_"+i+""+j+"\" style = \"display:none;\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcolKeep_"+i+""+j+"\" style = \"\" value = \"0\"  hidden readonly></input></div>";

        Numbercol.innerHTML = i+""+j;
        TopMcol.innerHTML = tbntowNum;
        BotMcol.innerHTML = tbnBotNum;
     

        const row2 = TwoNumbertable2.insertRow(-1)
        const Numbercol2 = row2.insertCell(0)
        const TopMcol2 = row2.insertCell(1)
        const BotMcol2 = row2.insertCell(2)
    
        Numbercol2.id = "TwoNumber_"+j+""+i;
        //TopMcol2.id = "TwoTopcol_"+j+""+i;
        //BotMcol2.id = "TwoBotcol_"+j+""+i;
    
        //Numbercol2.style.color = "blue";
        Numbercol2.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "

        TopMcol2.style = "text-align: right;";
        BotMcol2.style = "text-align: right;";

        var tbntowNum2 = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoTopcol_"+j+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcol2_"+j+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input><input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcolKeep_"+j+""+i+"\" style = \"\" value = \"0\"  hidden readonly></input></div>";
        var tbnBotNum2 = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoBotcol_"+j+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcol2_"+j+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input><input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcolKeep_"+j+""+i+"\" style = \"\" value = \"0\"  hidden readonly></input></div>";

        Numbercol2.innerHTML = j+""+i
        TopMcol2.innerHTML = tbntowNum2
        BotMcol2.innerHTML = tbnBotNum2

        Numbercol2.value = j+""+i
        TopMcol2.value = 0;
        BotMcol2.value = 0;


        }
        indexcol++;
    }


    for(var i = 0 ; i < 10 ; i++){

        if(switfTableTwoNumbers == 1 ){

            const row = TwoNumbertable1.insertRow(-1)
            const Numbercol = row.insertCell(0)
            const TopMcol = row.insertCell(1)
            const BotMcol = row.insertCell(2)
        
            Numbercol.id = "TwoNumber_"+i+""+i;
            //TopMcol.id = "TwoTopcol_"+i+""+i;
           // BotMcol.id = "TwoBotcol_"+i+""+i;
        
            //Numbercol.style.color = "blue";
            Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "

            TopMcol.style = "text-align: right;";
            BotMcol.style = "text-align: right;";
    
            Numbercol.value = i+""+i;
            TopMcol.value = 0;
            BotMcol.value = 0;
    
            var tbntowNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoTopcol_"+i+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcol2_"+i+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcolKeep_"+i+""+i+"\" style = \"\" value = \"0\" hidden readonly></input></div>";
            var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoBotcol_"+i+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcol2_"+i+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcolKeep_"+i+""+i+"\" style = \"\" value = \"0\" hidden readonly></input></div>";
    
            Numbercol.innerHTML = i+""+i;
            TopMcol.innerHTML = tbntowNum;
            BotMcol.innerHTML = tbnBotNum;

            switfTableTwoNumbers++;
        }else{
            const row2 = TwoNumbertable2.insertRow(-1)
            const Numbercol2 = row2.insertCell(0)
            const TopMcol2 = row2.insertCell(1)
            const BotMcol2 = row2.insertCell(2)
        
            Numbercol2.id = "TwoNumber_"+i+""+i;
            //TopMcol2.id = "TwoTopcol_"+i+""+i;
            //BotMcol2.id = "TwoBotcol_"+i+""+i;
        
            //Numbercol2.style.color = "blue";
            Numbercol2.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "

            TopMcol2.style = "text-align: right;";
            BotMcol2.style = "text-align: right;";
    
            var tbntowNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoTopcol_"+i+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcol2_"+i+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input><input type = \"text\" class = \"ShowNumber_2\" id = \"TwoTopcolKeep_"+i+""+i+"\" style = \"\" value = \"0\" hidden readonly></input></div>";
            var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TwoBotcol_"+i+""+i+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcol2_"+i+""+i+"\" style = \"display:none;\" value = \"0\" readonly></input><input type = \"text\" class = \"ShowNumber_2\" id = \"TwoBotcolKeep_"+i+""+i+"\" style = \"\" value = \"0\" hidden readonly></input></div>";

            Numbercol2.innerHTML = i+""+i
            TopMcol2.innerHTML = tbntowNum
            BotMcol2.innerHTML = tbnBotNum
    

            Numbercol2.value = i+""+i
            TopMcol2.value = 0;
            BotMcol2.value = 0;
    


            switfTableTwoNumbers--;
        }

    }
}

const ThreeNumbertable1 = document.getElementById("TableThreeNumber_1") 
const ThreeNumbertable2 = document.getElementById("TableThreeNumber_2") 
function createTableforThreeNumber(){

    var countingnumbers = 0 ;
    for(var first = 0 ; first < 10 ; first ++){
        for(var sec = 0 ; sec < 10 ; sec ++){
            for(var thr = 0 ; thr < 10 ; thr ++){

                if(countingnumbers < 500){
                    //ThreeNumbertable1
                    const row = ThreeNumbertable1.insertRow(-1)
                    const Numbercol = row.insertCell(0)
                    const TopMcol = row.insertCell(1)
                    const PRTopMcol = row.insertCell(2)
                    const BotMcol = row.insertCell(3)
                    const PRBotMcol = row.insertCell(4)

                    
                    var threenumber = first+""+sec+""+thr;
                    var tbntopNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"BotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"BotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        


                    var PRtbntopNum = "<div  class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRTopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRTopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var PRtbnBotNum = "<div  class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRBotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRBotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        
                    PRTopMcol.innerHTML = PRtbntopNum //formatNumber(TopMoney)
                    PRBotMcol.innerHTML = PRtbnBotNum //formatNumber(BotMoney)                

                    PRTopMcol.style = "background-color: #ffc107  !important;text-align: right;";
                    PRBotMcol.style = "background-color: #ffc107  !important;text-align: right;";

                    Numbercol.innerHTML = threenumber
                    TopMcol.innerHTML = tbntopNum //formatNumber(TopMoney)
                    BotMcol.innerHTML = tbnBotNum //formatNumber(BotMoney)                
                    Numbercol.id = "ThreeNumber_"+threenumber;
                    row.id = "3Row_"+threenumber;

                
                    Numbercol.value = threenumber;

                    //row.style = "display: none;"
                    Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "
        
                    TopMcol.style = "text-align: right;";
                    BotMcol.style = "text-align: right;";
        
                }else{
                    //ThreeNumbertable2
                    const row = ThreeNumbertable2.insertRow(-1)
                    const Numbercol = row.insertCell(0)
                    const TopMcol = row.insertCell(1)
                    const PRTopMcol = row.insertCell(2)
                    const BotMcol = row.insertCell(3)
                    const PRBotMcol = row.insertCell(4)
                    var threenumber = first+""+sec+""+thr;
                    var tbntopNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"BotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"BotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        

                    var PRtbntopNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRTopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRTopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var PRtbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRBotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRBotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        
                    PRTopMcol.innerHTML = PRtbntopNum //formatNumber(TopMoney)
                    PRBotMcol.innerHTML = PRtbnBotNum //formatNumber(BotMoney)    
                    PRTopMcol.style = "background-color: #ffc107  !important;text-align: right;";
                    PRBotMcol.style = "background-color: #ffc107  !important;text-align: right;";
    


                    Numbercol.innerHTML = threenumber
                    TopMcol.innerHTML = tbntopNum //formatNumber(TopMoney)
                    BotMcol.innerHTML = tbnBotNum //formatNumber(BotMoney)
                
                    Numbercol.id = "ThreeNumber_"+threenumber;
                    row.id = "3Row_"+threenumber;

                
                    Numbercol.value = threenumber;

                    Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "
                    //row.style = "display: none;"

                    TopMcol.style = "text-align: right;";
                    BotMcol.style = "text-align: right;";

                }
                countingnumbers++;

            }

        }

    }



}


const TableRunningNumbers = document.getElementById("TableRunningNumbers") 
function createTableRunningnumber(){

    for(var i = 0 ; i < 10 ; i ++){
        const row = TableRunningNumbers.insertRow(-1);
        const Numbercol = row.insertCell(0);
        const TopMcol = row.insertCell(1);
        const BotMcol = row.insertCell(2);
    
        Numbercol.id = "RunningNumber_"+i;
        //TopMcol.id = "TopcolRun_"+i;
        //BotMcol.id = "BotcolRun_"+i;
    
        Numbercol.style.color = "blue";
        TopMcol.style = "text-align: right;";
        BotMcol.style = "text-align: right;";

        Numbercol.value = i;
        TopMcol.value = 0;
        BotMcol.value = 0;

        var tbntowNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"TopcolRun_"+i+"\" value = \"0\"></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"TopcolRun2_"+i+"\" style = \"display:none;\" value = \"0\"></input></div>";
        var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"BotcolRun_"+i+"\" value = \"0\"></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"BotcolRun2_"+i+"\" style = \"display:none;\" value = \"0\"></input><div>";

        Numbercol.innerHTML = i;
        TopMcol.innerHTML = tbntowNum;
        BotMcol.innerHTML = tbnBotNum;

    }
    

}
var tbxData = document.getElementById("datepicker");
var ddlListHui = document.getElementById("ddlListHui");
const DisTotal = document.getElementById("DisTotal") 
const DisTotal2 = document.getElementById("DisTotal2") 
const DisTotal3 = document.getElementById("DisTotal3") 
const TableLog = document.getElementById("TableLog") 

const TableLog_01 = document.getElementById("TableLog_01") 

// สร้างตารางทันทีตอนโหลดหน้า ไม่ต้องรอกดปุ่ม
createTableforTwoNumber();
createTableRunningnumber();
createTableforThreeNumber();
createTableCountBill(listCustomer);

$("#btnShowData").click(() => {
    if(tbxData.value == "") return;
    if(ddlListHui.value == "") return;

    // reset ยอดทั้งหมด
    DisTotal.value = 0; DisTotal2.value = 0; DisTotal3.value = 0;
    DisTotal.innerHTML = "0"; DisTotal2.innerHTML = "0"; DisTotal3.innerHTML = "0";

    // reset ข้อมูลในตาราง (ไม่ต้องสร้างใหม่)
    TwoNumbertable1.querySelectorAll('input').forEach(i => i.value = "0");
    TwoNumbertable2.querySelectorAll('input').forEach(i => i.value = "0");
    TableRunningNumbers.querySelectorAll('input').forEach(i => i.value = "0");
    ThreeNumbertable1.querySelectorAll('input').forEach(i => i.value = "0");
    ThreeNumbertable2.querySelectorAll('input').forEach(i => i.value = "0");
    TableCountBill.innerHTML = "";
    // reset ตารางนับบิลลูกค้าที่แสดงผลจริง
    TableCountBill_02.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_03.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_05.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_06.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_08.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    // reset ตารางตรวจสอบเลข 3 ตัว, ตาราง cut, และ state ที่เกี่ยวข้อง
    Tablechknum.innerHTML = "";
    TableCutTreeNumber.innerHTML = "";
    count_cut = 1;
    ListCutNumber = [];
    // reset ShowNumber_2 display (ยอดเกิน) ให้ซ่อนกลับ
    document.querySelectorAll('.ShowNumber_2').forEach(i => { i.value = "0"; i.style.display = "none"; });
    TableLog.innerHTML = "";
    TableLog_01.innerHTML = "";

    getdata();
});





$("#btnAVG").click(() => {
   /* var Total = parseFloat(DisTotal.innerHTML.replace(/,/g, ''));
    var TotalatPercen = Total - (Total*30/100);
    console.log("Total : " + Total + " 30% => " + TotalatPercen);

    var Keeping = 0;
    var SendingOut = 0;

    var LOCK_ROUND = 0 ;
    var checkMoney = true;
    var nrow = 1 ;
    while(checkMoney){
        //TwoTopcol_01
        //TwoBotcol_01
        //LOCK_ROUND = 0;
        Keeping += parseInt(((TotalatPercen - SendingOut) /100 ) / 2) ;
        SendingOut = 0 ;
        for(var i = 0 ; i<= 9 ; i++){
            for(var j = 0 ; j<= 9 ; j++){
                var topMoney = document.getElementById("TwoTopcol_"+ i + ""+j).value.replaceAll(",","");
                var BotMoney = document.getElementById("TwoBotcol_"+ i + ""+j).value.replaceAll(",","");

                var topkeep = document.getElementById("TwoTopcolKeep_"+ i + ""+j).value.replaceAll(",","")
                var Botkeep = document.getElementById("TwoBotcolKeep_"+ i + ""+j).value.replaceAll(",","")

                var check_TwoTop = parseInt(topMoney) ;
                var check_TwoBot = parseInt(BotMoney) ;

                if(check_TwoTop > Keeping ){
                    var caltop = parseInt(check_TwoTop -parseInt(topkeep)  - Keeping);
                    document.getElementById("TwoTopcolKeep_"+ i + ""+j).value = formatNumber(Keeping);
                    SendingOut += caltop;
                }else{
                    document.getElementById("TwoTopcolKeep_"+ i + ""+j).value = formatNumber("0");


                }
                if(check_TwoBot > Keeping){

                    var calBot = parseInt(check_TwoBot - parseInt(Botkeep) -  (Keeping ));
                    document.getElementById("TwoBotcolKeep_"+ i + ""+j).value  = formatNumber(calBot);
                    SendingOut += calBot;
                }else{
                    document.getElementById("TwoBotcolKeep_"+ i + ""+j).value  = formatNumber("0");
                }
                //console.log(i+""+j + ": บน " + check_TwoTop + " ล่าง " + check_TwoBot);

            }

        }

        console.log( nrow+".KEEPING : " + formatNumber(Keeping) + ".ยอดส่งออก : " + formatNumber(SendingOut));
        nrow++;

        if(LOCK_ROUND >= 4 ){

            checkMoney = false;

        }
        LOCK_ROUND++;

    }

*/
    
});


let _unsubscribeSnapshot = null; // เก็บ unsubscribe function

function getdata(){
    // unsubscribe listener เดิมก่อนสร้างใหม่ (ป้องกัน listener ซ้อน)
    if (_unsubscribeSnapshot) {
        _unsubscribeSnapshot();
        _unsubscribeSnapshot = null;
    }

    var strDB = tbxData.value.replaceAll("/","") +"_" +ddlListHui.value;

    let qry = query(collection(db, strDB));
    _unsubscribeSnapshot = onSnapshot(qry, (querySnapshot) => {
        // ถ้ามี removed หรือ modified → reset และโหลดใหม่ทั้งหมด
        var hasChange = querySnapshot.docChanges().some(
            c => c.type === "removed" || c.type === "modified"
        );

        if(hasChange) {
            resetAllValues();
            TableLog.innerHTML = "";
            TableLog_01.innerHTML = "";
            // โหลดข้อมูลใหม่จาก snapshot ปัจจุบัน (ไม่ต้อง query ซ้ำ)
            querySnapshot.docs.forEach(doc => {
                if(doc.data().CustCode == "LEKSAMTUAR"){
                    ShowMoney_AddPR({data: () => doc.data(), id: doc.id});
                } else {
                    ShowMoney_Add({data: () => doc.data(), id: doc.id});
                }
            });
            // sync UI หลังเขียนข้อมูลเสร็จ
            if (typeof window.syncCombined === "function") window.syncCombined();
            if (typeof window.syncBillCards === "function") window.syncBillCards();
            return;
        }

        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                if(change.doc.data().CustCode == "LEKSAMTUAR"){
                    ShowMoney_AddPR(change.doc)
                }else{
                    ShowMoney_Add(change.doc)
                }
            }
        });
        // sync UI หลังเขียนข้อมูลเสร็จ
        if (typeof window.syncCombined === "function") window.syncCombined();
        if (typeof window.syncBillCards === "function") window.syncBillCards();
    });
}

function resetAllValues() {
    DisTotal.value = 0; DisTotal2.value = 0; DisTotal3.value = 0;
    DisTotal.innerHTML = "0"; DisTotal2.innerHTML = "0"; DisTotal3.innerHTML = "0";
    TwoNumbertable1.querySelectorAll('input').forEach(i => i.value = "0");
    TwoNumbertable2.querySelectorAll('input').forEach(i => i.value = "0");
    TableRunningNumbers.querySelectorAll('input').forEach(i => i.value = "0");
    ThreeNumbertable1.querySelectorAll('input').forEach(i => i.value = "0");
    ThreeNumbertable2.querySelectorAll('input').forEach(i => i.value = "0");
    TableCountBill.innerHTML = "";
    // reset ตารางนับบิลลูกค้าที่แสดงผลจริง
    TableCountBill_02.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_03.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_05.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_06.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    TableCountBill_08.querySelectorAll('input.BillCount').forEach(i => i.value = "0");
    // reset ตารางตรวจสอบเลข 3 ตัว, ตาราง cut, และ state ที่เกี่ยวข้อง
    Tablechknum.innerHTML = "";
    TableCutTreeNumber.innerHTML = "";
    count_cut = 1;
    ListCutNumber = [];
    // reset ShowNumber_2 display (ยอดเกิน) ให้ซ่อนกลับ
    document.querySelectorAll('.ShowNumber_2').forEach(i => { i.value = "0"; i.style.display = "none"; });
}



function ShowMoney_Add(Datas){

    var DataNumbers = Datas.data().Numbers;

    var NameUser = "";
    if(Datas.data().UserName == "02"){
        NameUser = "พี่ไก่น้อย"
    }
    if(Datas.data().UserName == "03"){
        NameUser = "พี่แนน"
    }
    if(Datas.data().UserName == "04"){
        NameUser = "พี่นก"
    }
    if(Datas.data().UserName == "05"){
        NameUser = "พี่เวียง"
    }
    if(Datas.data().UserName == "06"){
        NameUser = "พี่อิ๋ม"
    }
    if(Datas.data().UserName == "07"){
        NameUser = "พี่อ้อ"
    }
    if(Datas.data().UserName == "09"){
        NameUser = "น้องออย"
    }

    for(var i = 0 ; i <DataNumbers.length ;i++){

        var sprData = DataNumbers[i].split('='); // [ "10,01" , " 100*100"]
        var A_number = sprData[0].split(','); // [10,01]
        var FindBill = document.getElementById("Bill_"+Datas.data().CustCode);

        if(FindBill) {
            var RecommaBill = FindBill.value.replaceAll(",","");
            var Billnew = Datas.data().Bill;
            if(Billnew > RecommaBill){
                FindBill.value = formatNumber(Billnew);
            }else{
                FindBill.value = formatNumber(RecommaBill);
            }
        }

        // 4. ตรวจจับเลขขนาดปนกันในชุดเดียว เช่น 10,01,3,02 หรือ 123,12
        var validNums = A_number.filter(n => n.trim() !== "");
        if(validNums.length > 1){
            var lengths = validNums.map(n => n.trim().length);
            var hasMultiSize = lengths.some(l => l !== lengths[0]);
            if(hasMultiSize){
                const r = TableLog_01.insertRow(-1);
                const c = r.insertCell(0);
                c.innerHTML = "⚠️ เลขขนาดปนกัน | " + Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+sprData[0] + "  = " + sprData[1];
                c.style = "color: #e65100;";
            }
        }

        // helper: เช็คยอดเงินแปลกสำหรับทุก case (เลข 1/2/3 ตัว) — ขึ้นแค่รายการเดียวต่อบรรทัด
        function checkWeirdMoney(numStr, moneyStr, bill, custname, username, nameUser) {
            var sp = moneyStr.split('*');
            var top = parseInt(sp[0]) || 0;
            var bot = parseInt(sp[1]) || 0;
            if(top === 0 && bot === 0) return;

            var msg = null;
            var color = "orange";

            // priority 0: ยอดสูงมาก ≥ 10,000
            if(top >= 10000 || bot >= 10000){
                var highParts = [];
                if(top >= 10000) highParts.push("บน " + formatNumber(top));
                if(bot >= 10000) highParts.push("ล่าง " + formatNumber(bot));
                msg = "🚨 ยอดสูงมาก (" + highParts.join(", ") + ")";
                color = "#b71c1c";
            }

            // priority 1: ยอดต่างกันมาก > 5 เท่า
            if(!msg && top > 0 && bot > 0){
                var ratio = Math.max(top, bot) / Math.min(top, bot);
                if(ratio > 5){ msg = "⚠️ ยอดต่างกันมาก"; color = "red"; }
            }

            // priority 2: ยอดต่างกันหลายหลัก (ถ้ายังไม่มี msg)
            if(!msg && top > 0 && bot > 0 && top !== bot){
                var lt = sp[0].trim().length, lb = sp[1].trim().length;
                if(Math.abs(lt - lb) > 0){ msg = "⚠️ ยอดต่างหลัก"; color = lt > 3 || lb > 3 ? "red" : "orange"; }
            }

            // priority 3: ยอดเป็นตัวเลขแปลก ไม่หาร 5 ลงตัว (ถ้ายังไม่มี msg)
            if(!msg){
                var isOddTop = top > 0 && (top % 5 !== 0);
                var isOddBot = bot > 0 && (bot % 5 !== 0);
                if(isOddTop || isOddBot){ msg = "⚠️ ยอดเงินแปลก"; color = "orange"; }
            }

            if(msg){
                var r = TableLog_01.insertRow(-1);
                var c = r.insertCell(0);
                c.innerHTML = username + " " + nameUser + " => บิลที่ " + bill + " , " + custname + " , " + numStr + " = " + moneyStr;
                c.style = "color: " + color + ";" + (color === "#b71c1c" ? " font-weight: bold;" : "");
            }
        }

        for(var j = 0 ; j <A_number.length ;j++){
            if(A_number[j].trim() == "" ){
                continue;
            }
            //var ParseNumber = parseInt(A_number[j]);
            var lengthA_number = A_number[j].length; //เช็คว่าตัวเลขเป็นแบบ 1 ตัว 2 ตัว 3 ตัว UserName
            
            if(lengthA_number == 1 ){
                console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,วิ่ง "+A_number[j] + "  = " + sprData[1]);
                const rowTableLog = TableLog.insertRow(-1);
                const colTableLog = rowTableLog.insertCell(0);
                colTableLog.innerHTML = Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,วิ่ง "+A_number[j] + "  = " + sprData[1];

                        var sprMoney = sprData[1].split('*');
                        var TopMoney = parseInt(sprMoney[0]);
                        var BotMoney = parseInt(sprMoney[1]);
            
                        //for (var n = 0 ; n < A_number.length ; n++){
                            //A_number[n]
                            var FindNumber = document.getElementById("RunningNumber_"+A_number[j]).value;
                            if(FindNumber == A_number[j]){
                                var tmptop = document.getElementById("TopcolRun_"+A_number[j]).value.replaceAll(",","");
                                var tmpBot = document.getElementById("BotcolRun_"+A_number[j]).value.replaceAll(",","");


                                var getTopMoney = parseInt(tmptop) + TopMoney;
                                var getBotMoney = parseInt(tmpBot) + BotMoney;
                                document.getElementById("TopcolRun_"+A_number[j]).value = formatNumber(getTopMoney)
                                document.getElementById("BotcolRun_"+A_number[j]).value = formatNumber(getBotMoney)
            

                                var tmpDisTotal  = parseInt(DisTotal3.value) + TopMoney + BotMoney;
                                DisTotal3.value = tmpDisTotal;
                                DisTotal3.innerHTML = formatNumber(DisTotal3.value) ;
                            }

                            if(TopMoney < 500 && BotMoney< 500){
                                const rowTableLog_01 = TableLog_01.insertRow(-1);
                                const colTableLog_01 = rowTableLog_01.insertCell(0);
                                colTableLog_01.innerHTML = Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,<runn style = 'color: #bc3fff;'>วิ่ง</runn> "+A_number[j] + "  = " + sprData[1];
                            }
            
            
            }else if (lengthA_number == 2){
                console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,Numbers "+A_number[j] + "  = " + sprData[1]);
                const rowTableLog = TableLog.insertRow(-1);
                const colTableLog = rowTableLog.insertCell(0);
                colTableLog.innerHTML =Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = " + sprData[1];
                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
    
                    var FindNumber = document.getElementById("TwoNumber_"+A_number[j]).value;
                    if(FindNumber == A_number[j]){
                        var tmptop = document.getElementById("TwoTopcol_"+A_number[j]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("TwoBotcol_"+A_number[j]).value.replaceAll(",","");
                        //console.log("find : " + FindNumber + " == " + NumberList[i]);
                        var getTopMoney = parseInt(tmptop) + TopMoney;
                        var getBotMoney = parseInt(tmpBot) + BotMoney;
                        document.getElementById("TwoTopcol_"+A_number[j]).value = formatNumber(getTopMoney)
                        document.getElementById("TwoBotcol_"+A_number[j]).value = formatNumber(getBotMoney)
    
                        //document.getElementById("TwoTopcol_"+A_number[j]).innerHTML = formatNumber(getTopMoney)
                        //document.getElementById("TwoBotcol_"+A_number[j]).innerHTML = formatNumber(getBotMoney)
                        //PoitMoney

                        if(getTopMoney > PoitMoney.value && PoitMoney.value > 0){
                            var total = parseInt(PoitMoney.value) - getTopMoney;
                            document.getElementById("TwoTopcol2_"+A_number[j]).value = formatNumber(total)
                            document.getElementById("TwoTopcol2_"+A_number[j]).style.display = "";
                        }
            
                        if(getBotMoney > PoitMoney.value && PoitMoney.value > 0){
                            var total = parseInt(PoitMoney.value) - getBotMoney;
                            document.getElementById("TwoBotcol2_"+A_number[j]).value = formatNumber(total)
                            document.getElementById("TwoBotcol2_"+A_number[j]).style.display = "";
                        }
                        //console.log(A_number[j] + " : " + " " +TopMoney + " * " + BotMoney);

                        var tmpDisTotal  = parseInt(DisTotal.value) + TopMoney + BotMoney;
                        DisTotal.value = tmpDisTotal;
                        DisTotal.innerHTML = formatNumber(DisTotal.value) ;

    
                    }



                    //CHECK ยอดแปลก ๆ — ย้ายออกมาเรียกหลังลูป j แล้ว
                    
                    
            }else if(lengthA_number == 3){

                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
                //console.log(A_number[j] + " = " + TopMoney + " * " + BotMoney);
                if(BotMoney == 3 || BotMoney == 6){
                
                    var This_Number = A_number[j];
                    var numb0 = (This_Number).charAt((0));
                    var numb1 = (This_Number).charAt((1));
                    var numb2 = (This_Number).charAt((2));

                    let listnumb = [
                        numb0+numb1+numb2,
                        numb0+numb2+numb1,
                        numb1+numb2+numb0,
                        numb1+numb0+numb2,
                        numb2+numb0+numb1,
                        numb2+numb1+numb0,
                    ];
                    var unique_Number = listnumb.filter(onlyUnique);
                    //console.log(unique_Number);

                    for(var u = 0 ; u < unique_Number.length ; u++){
                        //3Row_

                        //console.log(unique_Number[u] + " = " + TopMoney );
                        console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,Numbers "+unique_Number[u] + "  = " + sprData[1]);
                        const rowTableLog = TableLog.insertRow(-1);
                        const colTableLog = rowTableLog.insertCell(0);
                        colTableLog.innerHTML =Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+unique_Number[u] + "  = " + TopMoney + " * 0" ;
                        var tmptop = document.getElementById("TopMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("BotMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var getTopMoney = parseInt(tmptop) + TopMoney;
                        //var getBotMoney = parseInt(tmpBot) + BotMoney;
                        document.getElementById("TopMcol_"+unique_Number[u]).value = formatNumber(getTopMoney);
                        //document.getElementById("BotMcol_"+A_number[j]).value = formatNumber(getBotMoney)
                        if(PoitMoney2.value <= 0){
                            //document.getElementById("3Row_"+unique_Number[u]).style.display = "";
                        }
                        if(getTopMoney > PoitMoney2.value && PoitMoney2.value > 0){
                            var total = parseInt(PoitMoney2.value) - getTopMoney;
                            document.getElementById("TopMcol2_"+unique_Number[u]).value = formatNumber(total)
                            document.getElementById("TopMcol2_"+unique_Number[u]).style.display = "";
                            //document.getElementById("3Row_"+unique_Number[u]).style.display = "";
                            CuttreeNumbers(unique_Number[u],getTopMoney,tmpBot,TopMoney,0);


                        }

                        var tmpDisTotal  = parseInt(DisTotal2.value) + TopMoney;
                        DisTotal2.value = tmpDisTotal;
                        DisTotal2.innerHTML = formatNumber(DisTotal2.value) ;
                    }

                }else{

                    var tmptop = document.getElementById("TopMcol_"+A_number[j]).value.replaceAll(",","");
                    var tmpBot = document.getElementById("BotMcol_"+A_number[j]).value.replaceAll(",","");
                    var getTopMoney = parseInt(tmptop) + TopMoney;
                    var getBotMoney = parseInt(tmpBot) + BotMoney;

                    var CheckCutNumber = false;

                    //console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,Numbers "+A_number[j] + "  = " + TopMoney + " * " + BotMoney);
                    const rowTableLog = TableLog.insertRow(-1);
                    const colTableLog = rowTableLog.insertCell(0);
                    colTableLog.innerHTML =Datas.data().UserName +" " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = " + TopMoney + " * " + BotMoney;
                    document.getElementById("TopMcol_"+A_number[j]).value = formatNumber(getTopMoney)
                    //document.getElementById("BotMcol_"+A_number[j]).value = formatNumber(getBotMoney)

                    if(PoitMoney2.value <= 0){
                        //document.getElementById("3Row_"+A_number[j]).style.display = "";
                    }
                    if(getTopMoney > PoitMoney2.value && PoitMoney2.value > 0){
                        var total = parseInt(PoitMoney2.value) - getTopMoney;
                        document.getElementById("TopMcol2_"+A_number[j]).value = formatNumber(total)
                        document.getElementById("TopMcol2_"+A_number[j]).style.display = "";
                       //document.getElementById("3Row_"+A_number[j]).style.display = "";
                       CheckCutNumber = true;

                    }
                    if(BotMoney > 0){

                        //console.log("BOTTOM THREENUM : "+ A_number[j])
                        var This_Number = A_number[j];
                        var numb0 = (This_Number).charAt((0));
                        var numb1 = (This_Number).charAt((1));
                        var numb2 = (This_Number).charAt((2));
    
                        let listnumb = [
                            numb0+numb1+numb2,
                            numb0+numb2+numb1,
                            numb1+numb2+numb0,
                            numb1+numb0+numb2,
                            numb2+numb0+numb1,
                            numb2+numb1+numb0,
                        ];
                        var unique_Number = listnumb.filter(onlyUnique);
                        for(var u = 0 ; u < unique_Number.length ; u++){
                            var tmpBot2 = document.getElementById("BotMcol_"+unique_Number[u]).value.replaceAll(",","");
                            var getBotMoney2 = parseInt(tmpBot2) + BotMoney;
                            document.getElementById("BotMcol_"+unique_Number[u]).value = formatNumber(getBotMoney2)

                            if(getBotMoney2 > PoitMoney2.value && PoitMoney2.value > 0){
                                var total = parseInt(PoitMoney2.value) - getBotMoney2;
                                document.getElementById("BotMcol2_"+unique_Number[u]).value = formatNumber(total)
                                document.getElementById("BotMcol2_"+unique_Number[u]).style.display = "";
                               CheckCutNumber = true;
                            }
                        }
                    }

                    if(CheckCutNumber){
                        CuttreeNumbers(A_number[j],getTopMoney,getBotMoney,TopMoney,BotMoney);
                    }

                    var tmpDisTotal  = parseInt(DisTotal2.value) + TopMoney + BotMoney;
                    DisTotal2.value = tmpDisTotal;
                    DisTotal2.innerHTML = formatNumber(DisTotal2.value) ;

                    // เช็คยอดแปลกสำหรับเลข 3 ตัว — ย้ายออกมาเรียกหลังลูป j แล้ว
                    

                }



            }

        } // end for j

        // เช็คยอดแปลกครั้งเดียวต่อบรรทัด (ไม่ซ้ำตามจำนวนตัวเลขใน A_number)
        var validFirst = A_number.find(n => n.trim() !== "");
        if(validFirst) {
            var labelNums = A_number.filter(n => n.trim() !== "").join(",");
            checkWeirdMoney(labelNums, sprData[1], Datas.data().Bill, Datas.data().Custname, Datas.data().UserName, NameUser);
        }

    } // end for i

}


function ShowMoney_Remove(Datas){
    var DataNumbers = Datas.data().Numbers;

    var NameUser = "";
    if(Datas.data().UserName == "02"){
        NameUser = "พี่ไก่น้อย"
    }
    if(Datas.data().UserName == "03"){
        NameUser = "พี่แนน"
    }
    if(Datas.data().UserName == "04"){
        NameUser = "พี่นก"
    }
    if(Datas.data().UserName == "05"){
        NameUser = "พี่เวียง"
    }
    if(Datas.data().UserName == "06"){
        NameUser = "พี่อิ๋ม"
    }
    if(Datas.data().UserName == "07"){
        NameUser = "พี่อ้อ"
    }
    if(Datas.data().UserName == "09"){
        NameUser = "น้องออย"
    }

    for(var i = 0 ; i <DataNumbers.length ;i++){

        var sprData = DataNumbers[i].split('='); // [ "10,01" , " 100*100"]
        var A_number = sprData[0].split(','); // [10,01]

        for(var j = 0 ; j <A_number.length ;j++){
            if(A_number[j].trim() == "" ){
                continue;
            }
            //var ParseNumber = parseInt(A_number[j]);
            var lengthA_number = A_number[j].length; //เช็คว่าตัวเลขเป็นแบบ 1 ตัว 2 ตัว 3 ตัว
            
            //console.log(Datas.data().Bill + " , " +Datas.data().Custname + " ,TopMcol_"+A_number[j]);
            if(lengthA_number == 1 ){
                        var sprMoney = sprData[1].split('*');
                        var TopMoney = parseInt(sprMoney[0]);
                        var BotMoney = parseInt(sprMoney[1]);
                        //background-color: #dc35455e !important;
                        const rowTableLog = TableLog.insertRow(-1);
                        rowTableLog.style= "background-color: #dc35455e !important;"
                        const colTableLog = rowTableLog.insertCell(0);
                        colTableLog.innerHTML ="ลบบิล "+  Datas.data().UserName + " " +NameUser+" =>บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,วิ่ง "+A_number[j] + "  = -" + TopMoney +" * -" +BotMoney ;
        
                        //for (var n = 0 ; n < A_number.length ; n++){
                            //A_number[n]
                            var FindNumber = document.getElementById("RunningNumber_"+A_number[j]).value;
                            if(FindNumber == A_number[j]){
                                var tmptop = document.getElementById("TopcolRun_"+A_number[j]).value.replaceAll(",","");
                                var tmpBot = document.getElementById("BotcolRun_"+A_number[j]).value.replaceAll(",","");


                                var getTopMoney = parseInt(tmptop) - TopMoney;
                                var getBotMoney = parseInt(tmpBot) - BotMoney;
                                document.getElementById("TopcolRun_"+A_number[j]).value = formatNumber(getTopMoney)
                                document.getElementById("BotcolRun_"+A_number[j]).value = formatNumber(getBotMoney)
            

                                var tmpDisTotal  = parseInt(DisTotal3.value) - (TopMoney + BotMoney);
                                DisTotal3.value = tmpDisTotal;
                                DisTotal3.innerHTML = formatNumber(DisTotal3.value) ;
                            }
                                
                        //}
            
            
            }else if (lengthA_number == 2){
                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
    
                const rowTableLog = TableLog.insertRow(-1);
                rowTableLog.style= "background-color: #dc35455e !important;"

                const colTableLog = rowTableLog.insertCell(0);
                colTableLog.innerHTML ="ลบบิล "+ Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = -" + TopMoney + " * -" + BotMoney;

                    var FindNumber = document.getElementById("TwoNumber_"+A_number[j]).value;
                    if(FindNumber == A_number[j]){
                        var tmptop = document.getElementById("TwoTopcol_"+A_number[j]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("TwoBotcol_"+A_number[j]).value.replaceAll(",","");
                        //console.log("find : " + FindNumber + " == " + NumberList[i]);
                        var getTopMoney = parseInt(tmptop) - TopMoney;
                        var getBotMoney = parseInt(tmpBot) - BotMoney;
                        document.getElementById("TwoTopcol_"+A_number[j]).value = formatNumber(getTopMoney)
                        document.getElementById("TwoBotcol_"+A_number[j]).value = formatNumber(getBotMoney)
    
                        //document.getElementById("TwoTopcol_"+A_number[j]).innerHTML = formatNumber(getTopMoney)
                        //document.getElementById("TwoBotcol_"+A_number[j]).innerHTML = formatNumber(getBotMoney)
                        //PoitMoney

                        if(getTopMoney > PoitMoney.value && PoitMoney.value > 0){
                            var total = parseInt(PoitMoney.value) - getTopMoney;
                            document.getElementById("TwoTopcol2_"+A_number[j]).value = formatNumber(total)
                            document.getElementById("TwoTopcol2_"+A_number[j]).style.display = "";
                        }else{
                            document.getElementById("TwoTopcol2_"+A_number[j]).style.display = "none";

                        }
            
                        if(getBotMoney > PoitMoney.value && PoitMoney.value > 0){
                            var total = parseInt(PoitMoney.value) - getBotMoney;
                            document.getElementById("TwoBotcol2_"+A_number[j]).value = formatNumber(total)
                            document.getElementById("TwoBotcol2_"+A_number[j]).style.display = "";
                        }else{
                            document.getElementById("TwoBotcol2_"+A_number[j]).style.display = "none";


                        }
                        //console.log(A_number[j] + " : " + " " +TopMoney + " * " + BotMoney);

                        var tmpDisTotal  = parseInt(DisTotal.value) - (TopMoney + BotMoney);
                        DisTotal.value = tmpDisTotal;
                        DisTotal.innerHTML = formatNumber(DisTotal.value) ;

    
                    }
            }else if(lengthA_number == 3){
                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
                if(BotMoney == 3 || BotMoney == 6){
                
                    var This_Number = A_number[j];
                    var numb0 = (This_Number).charAt((0));
                    var numb1 = (This_Number).charAt((1));
                    var numb2 = (This_Number).charAt((2));

                    let listnumb = [
                        numb0+numb1+numb2,
                        numb0+numb2+numb1,
                        numb1+numb2+numb0,
                        numb1+numb0+numb2,
                        numb2+numb0+numb1,
                        numb2+numb1+numb0,
                    ];
                    var unique_Number = listnumb.filter(onlyUnique);
                    for(var u = 0 ; u < unique_Number.length ; u++){

                        const rowTableLog = TableLog.insertRow(-1);
                        rowTableLog.style= "background-color: #dc35455e !important;"

                        const colTableLog = rowTableLog.insertCell(0);
                        colTableLog.innerHTML ="ลบบิล "+Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+unique_Number[u] + "  = -" + TopMoney + " * 0" ;

                        var tmptop = document.getElementById("TopMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("BotMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var getTopMoney = parseInt(tmptop) - TopMoney;
                        //var getBotMoney = parseInt(tmpBot) + BotMoney;
                        document.getElementById("TopMcol_"+unique_Number[u]).value = formatNumber(getTopMoney);
                        //document.getElementById("BotMcol_"+A_number[j]).value = formatNumber(getBotMoney)
                        RemoveCuttreeNumbers(unique_Number[u],getTopMoney,tmpBot,TopMoney,0);

                        if(getTopMoney > PoitMoney2.value && PoitMoney2.value > 0){
                            var total = parseInt(PoitMoney2.value) - getTopMoney;
                            document.getElementById("TopMcol2_"+unique_Number[u]).value = formatNumber(total)
                            document.getElementById("TopMcol2_"+unique_Number[u]).style.display = "";
                        }else{
                            document.getElementById("TopMcol2_"+unique_Number[u]).style.display = "none";
                            //document.getElementById("3Row_"+unique_Number[j]).style.display = "none";

                        }

                        var tmpDisTotal  = parseInt(DisTotal2.value) - TopMoney;
                        DisTotal2.value = tmpDisTotal;
                        DisTotal2.innerHTML = formatNumber(DisTotal2.value) ;
                    }

                }else{

                    const rowTableLog = TableLog.insertRow(-1);
                    rowTableLog.style= "background-color: #dc35455e !important;"

                    const colTableLog = rowTableLog.insertCell(0);
                    colTableLog.innerHTML ="ลบบิล "+Datas.data().UserName + " " +NameUser+" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = -" + TopMoney + " * -" + BotMoney;

                    var tmptop = document.getElementById("TopMcol_"+A_number[j]).value.replaceAll(",","");
                    var tmpBot = document.getElementById("BotMcol_"+A_number[j]).value.replaceAll(",","");
                    var getTopMoney = parseInt(tmptop) - TopMoney;
                    var getBotMoney = parseInt(tmpBot) - BotMoney;
                    document.getElementById("TopMcol_"+A_number[j]).value = formatNumber(getTopMoney)
                    //document.getElementById("BotMcol_"+A_number[j]).value = formatNumber(getBotMoney)

                    if(getTopMoney > PoitMoney2.value && PoitMoney2.value > 0){
                        var total = parseInt(PoitMoney2.value) - getTopMoney;
                        document.getElementById("TopMcol2_"+A_number[j]).value = formatNumber(total)
                        document.getElementById("TopMcol2_"+A_number[j]).style.display = "";
                    }else{

                        document.getElementById("TopMcol2_"+A_number[j]).style.display = "none";
                        //document.getElementById("3Row_"+A_number[j]).style.display = "none";
                    }


                    if(BotMoney > 0){

                        //console.log("BOTTOM THREENUM : "+ A_number[j])
                        var This_Number = A_number[j];
                        var numb0 = (This_Number).charAt((0));
                        var numb1 = (This_Number).charAt((1));
                        var numb2 = (This_Number).charAt((2));
    
                        let listnumb = [
                            numb0+numb1+numb2,
                            numb0+numb2+numb1,
                            numb1+numb2+numb0,
                            numb1+numb0+numb2,
                            numb2+numb0+numb1,
                            numb2+numb1+numb0,
                        ];
                        var unique_Number = listnumb.filter(onlyUnique);
                        for(var u = 0 ; u < unique_Number.length ; u++){
                            var tmpBot2 = document.getElementById("BotMcol_"+unique_Number[u]).value.replaceAll(",","");
                            var getBotMoney2 = parseInt(tmpBot2) - BotMoney;
                            document.getElementById("BotMcol_"+unique_Number[u]).value = formatNumber(getBotMoney2)

                            if(getBotMoney2 > PoitMoney2.value && PoitMoney2.value > 0){
                                var total = parseInt(PoitMoney2.value) - getBotMoney2;
                                document.getElementById("BotMcol2_"+unique_Number[u]).value = formatNumber(total)
                                document.getElementById("BotMcol2_"+unique_Number[u]).style.display = "";
                            }else{
                                document.getElementById("BotMcol2_"+unique_Number[u]).style.display = "none";
                                //document.getElementById("3Row_"+A_number[j]).style.display = "none";
                            }
                        }
                    }
        
                    RemoveCuttreeNumbers(A_number[j],getTopMoney,getBotMoney,TopMoney,BotMoney);


                    var tmpDisTotal  = parseInt(DisTotal2.value) - (TopMoney + BotMoney);
                    DisTotal2.value = tmpDisTotal;
                    DisTotal2.innerHTML = formatNumber(DisTotal2.value) ;

                }



            }



        }


    }

}




let DisPoitMoney = document.getElementById("Display-PoitMoney")
var PoitMoney = document.getElementById("PoitMoney")

let DisPoitMoney2 = document.getElementById("Display-PoitMoney2")
var PoitMoney2 = document.getElementById("PoitMoney2")

DisPoitMoney.addEventListener("change",(e)=>{
    if(DisPoitMoney.value == "" || DisPoitMoney.value == null){ 
        DisPoitMoney.value = 0 
    }
    PoitMoney.value = DisPoitMoney.value;
    var tmp = (parseInt(DisPoitMoney.value))

    DisPoitMoney.value = formatNumber(tmp);

    var indexcol = 1;
    for(var i = 0 ; i < 10 ;i ++){
        for(var j = indexcol ; j < 10 ; j++){
            var topMoney = document.getElementById("TwoTopcol_"+ i + ""+j).value.replaceAll(",","");
            var BopMoney = document.getElementById("TwoBotcol_"+ i + ""+j).value.replaceAll(",","");

            var tmp_topMoney = parseInt(topMoney);
            var tmp_BopMoney = parseInt(BopMoney);

            if(tmp_topMoney > tmp && tmp > 0){
                var tmptotal = tmp - tmp_topMoney;

                document.getElementById("TwoTopcol2_"+i + ""+j).value = formatNumber(tmptotal)
                document.getElementById("TwoTopcol2_"+i + ""+j).style.display = "";
            }
            else{
                //document.getElementById("TwoTopcol_"+ i + ""+j).style.color = "black";
                document.getElementById("TwoTopcol2_"+i + ""+j).style.display = "none";
    
            }

            if(tmp_BopMoney > tmp && tmp > 0){
                var tmptotal = tmp - tmp_BopMoney;

                document.getElementById("TwoBotcol2_"+i + ""+j).value = formatNumber(tmptotal)
                document.getElementById("TwoBotcol2_"+i + ""+j).style.display = "";
            }
            else{
                //document.getElementById("TwoBotcol_"+ i + ""+j).style.color = "black";
                document.getElementById("TwoBotcol2_"+i + ""+j).style.display = "none";

            }

            var topMoney2 = document.getElementById("TwoTopcol_"+ j + ""+i).value.replaceAll(",","");
            var BopMoney2 = document.getElementById("TwoBotcol_"+ j + ""+i).value.replaceAll(",","");

            var tmp_topMoney2 = parseInt(topMoney2);
            var tmp_BopMoney2 = parseInt(BopMoney2);

            if(tmp_topMoney2 > tmp && tmp > 0){
                //document.getElementById("TwoTopcol_"+ j + ""+i).style.color = "Red";
                var tmptotal = tmp - tmp_topMoney2;

                document.getElementById("TwoTopcol2_"+ j + ""+i).value = formatNumber(tmptotal)
                document.getElementById("TwoTopcol2_"+ j + ""+i).style.display = "";

            }else{
                //document.getElementById("TwoTopcol_"+ j + ""+i).style.color = "black";
                document.getElementById("TwoTopcol2_"+ j + ""+i).style.display = "none";

    
            }

            if(tmp_BopMoney2 > tmp && tmp > 0){
                //document.getElementById("TwoBotcol_"+ j + ""+i).style.color = "Red";
                var tmptotal = tmp - tmp_BopMoney2;

                document.getElementById("TwoBotcol2_"+ j + ""+i).value = formatNumber(tmptotal)
                document.getElementById("TwoBotcol2_"+ j + ""+i).style.display = "";
            }else{
                //document.getElementById("TwoBotcol2_"+ j + ""+i).style.color = "black";
                document.getElementById("TwoBotcol2_"+ j + ""+i).style.display = "none";

    
            }
        }
        indexcol++;
    }


    for(var i = 0 ; i < 10 ; i ++){
        var topMoney = document.getElementById("TwoTopcol_"+ i + ""+i).value.replaceAll(",","");
        var BopMoney = document.getElementById("TwoBotcol_"+ i + ""+i).value.replaceAll(",","");

        var tmp_topMoney = parseInt(topMoney);
        var tmp_BopMoney = parseInt(BopMoney);

        if(tmp_topMoney > tmp && tmp > 0){
            //document.getElementById("TwoTopcol_"+ i + ""+i).style.color = "Red";
            var tmptotal = tmp - tmp_topMoney;
            document.getElementById("TwoTopcol2_"+ i + ""+i).style.backgroundColor = "#ff0202b8";
            document.getElementById("TwoTopcol2_"+ i + ""+i).style.color = "white";
            document.getElementById("TwoTopcol2_"+ i + ""+i).value = formatNumber(tmptotal)
            document.getElementById("TwoTopcol2_"+ i + ""+i).style.display = "";
        }else{
            //document.getElementById("TwoTopcol_"+ i + ""+i).style.color = "black";
            document.getElementById("TwoTopcol2_"+ i + ""+i).style.display = "none";


        }

        if(tmp_BopMoney > tmp && tmp > 0){
            //document.getElementById("TwoBotcol_"+ i + ""+i).style.color = "Red";
            var tmptotal = tmp - tmp_BopMoney;
            document.getElementById("TwoBotcol2_"+ i + ""+i).style.backgroundColor = "#ff0202b8";
            document.getElementById("TwoBotcol2_"+ i + ""+i).style.color = "white";
            document.getElementById("TwoBotcol2_"+ i + ""+i).value = formatNumber(tmptotal)
            document.getElementById("TwoBotcol2_"+ i + ""+i).style.display = "";
        }else{
            //document.getElementById("TwoBotcol_"+ i + ""+i).style.color = "black";
            document.getElementById("TwoBotcol2_"+ i + ""+i).style.display = "none";


        }

    }


})

// sync combined table หลังเปลี่ยนยอดคัดออก 2 ตัว
DisPoitMoney.addEventListener("change", () => {
    if (typeof window.syncCombined === "function") window.syncCombined();
});

DisPoitMoney2.addEventListener("change",(e)=>{
    count_cut = 1 ;
    ListCutNumber = [];
    TableCutTreeNumber.innerHTML = "";
    if(DisPoitMoney2.value == "" || DisPoitMoney2.value == null){ 
        DisPoitMoney2.value = 0 
    }
    PoitMoney2.value = DisPoitMoney2.value;
    var tmp = (parseInt(DisPoitMoney2.value))

    DisPoitMoney2.value = formatNumber(tmp);

    var indexcol = 1;
    for(var i = 0 ; i < 10 ;i ++){
        for(var j = 0 ; j < 10 ; j++){
            for(var k = 0 ; k < 10 ; k++){
                var TmpNumbers = i+""+j+""+k;
                var checkcutnumber = false;
                var topMoney = document.getElementById("TopMcol_"+TmpNumbers).value.replaceAll(",","");
                var BopMoney = document.getElementById("BotMcol_"+TmpNumbers).value.replaceAll(",","");
                var tmp_topMoney = parseInt(topMoney);
                var tmp_BopMoney = parseInt(BopMoney);
                if(tmp_topMoney >= tmp && tmp > 0){
                    var tmptotal = tmp - tmp_topMoney;
    
                    document.getElementById("TopMcol2_"+TmpNumbers).value = formatNumber(tmptotal)
                    document.getElementById("TopMcol2_"+TmpNumbers).style.display = "";
                    checkcutnumber = true;

                }
                else{
                    //document.getElementById("TwoTopcol_"+ i + ""+j).style.color = "black";
                    document.getElementById("TopMcol2_"+TmpNumbers).style.display = "none";

        
                }

                if(tmp_BopMoney >= tmp && tmp > 0){
                    var tmptotal = tmp - tmp_BopMoney;
    
                    document.getElementById("BotMcol2_"+TmpNumbers).value = formatNumber(tmptotal)
                    document.getElementById("BotMcol2_"+TmpNumbers).style.display = "";
                    checkcutnumber = true;



                }
                else{
                    //document.getElementById("TwoBotcol_"+ i + ""+j).style.color = "black";
                    document.getElementById("BotMcol2_"+TmpNumbers).style.display = "none";

    
                }
                if(tmp <= 0){
                    //document.getElementById("3Row_"+TmpNumbers).style.display = "";
                }

                if(checkcutnumber){
                    //document.getElementById("3Row_"+TmpNumbers).style.display = "";
                    CuttreeNumbers(TmpNumbers,topMoney,BopMoney , 0 , 0);

                }else{
                    if( tmp > 0){
                        //document.getElementById("3Row_"+TmpNumbers).style.display = "none";
                    }

                }



            }

        }
        indexcol++;
    }


})

var count_cut = 1 ;
var TableCutTreeNumber = document.getElementById("TableCutTreeNumber")
var ListCutNumber = [];

function CuttreeNumbers(treeNumber,Top,Bot,addTop , addBot){
    var findNumber = ListCutNumber.filter(obj => obj == treeNumber )
    var tmpRowID =  "CutTreeNum_" + count_cut;
    if(findNumber.length <= 0){
        ListCutNumber.push(treeNumber);
        console.log("CuttreeNumbers : " + treeNumber);
        const row = TableCutTreeNumber.insertRow(-1);
        const Running = row.insertCell(0);
        const Numbercol = row.insertCell(1);
        const Topcol = row.insertCell(2);
        const Botcol = row.insertCell(3);
        row.id = tmpRowID;
        Numbercol.innerHTML = treeNumber;
        Topcol.innerHTML =  formatNumber(Top);
        Botcol.innerHTML =  formatNumber(Bot);

        Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;";
        Topcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
        Botcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"

        var tagtop = "<Prtoptag  style =\" background-color: yellow;\" class =\"PRClasstreeTop_"+treeNumber+"\"></Prtoptag>";
        Topcol.innerHTML+=tagtop;

        var tagBot = "<Prtoptag style =\" background-color: yellow;\"  class =\"PRClasstreeBot_"+treeNumber+"\"></Prtoptag>";
        Botcol.innerHTML+=tagBot;


        setOutTreeNumber(treeNumber);
        setOutTreeNumberForBottom(treeNumber);


        /*    color: blue;*/

        let btn =document.createElement('button')
        btn.textContent="Log"
        btn.setAttribute('class','btn btn-dark')
        btn.setAttribute('data-id',tmpRowID)
        Running.style = "width: 100px;";
        Running.appendChild(btn)
        
        btn.addEventListener('click',(e)=>{
            btn.style.display = "none"
            row.style = "background-color: gray;";
            Numbercol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Topcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Botcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"

        })


        

    }else{
        const row = TableCutTreeNumber.insertRow(-1);
        const Running = row.insertCell(0);
        const Numbercol = row.insertCell(1);
        const Topcol = row.insertCell(2);
        const Botcol = row.insertCell(3);
        row.id = tmpRowID;
        Numbercol.innerHTML = treeNumber;

        console.log(treeNumber + " = " + Top + " * " + Bot + " ADD " + addTop + " * " + addBot );
        if(addTop >  0){
            Topcol.innerHTML = "<pPlust style=\"color : #02ba01;\">+เพิ่ม "+formatNumber(addTop)+ "</pPlust>  = " + formatNumber(Top);
        }else{
            Topcol.innerHTML =  formatNumber(Top);
        }

        if(addBot > 0){
            Botcol.innerHTML = "<pPlust style=\"color : #02ba01;\">+เพิ่ม " +formatNumber(addBot)+ "</pPlust>  = " + formatNumber(Bot);
        }else{
            Botcol.innerHTML =  formatNumber(Bot);

        }

        var tagtop = "<Prtoptag  style =\" background-color: yellow;\" class =\"PRClasstreeTop_"+treeNumber+"\"></Prtoptag>";
        Topcol.innerHTML+=tagtop;
        var tagBot = "<Prtoptag style =\" background-color: yellow;\"  class =\"PRClasstreeBot_"+treeNumber+"\"></Prtoptag>";
        Botcol.innerHTML+=tagBot;


        setOutTreeNumber(treeNumber);
        setOutTreeNumberForBottom(treeNumber);



        Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;";
        Topcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
        Botcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"


        /*    color: blue;*/

        let btn =document.createElement('button')
        btn.textContent="Log"
        btn.setAttribute('class','btn btn-dark')
        btn.setAttribute('data-id',tmpRowID)
        Running.style = "width: 100px;";
        Running.appendChild(btn)
        
        btn.addEventListener('click',(e)=>{
            btn.style.display = "none"
            row.style = "background-color: gray;";
            Numbercol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Topcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Botcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"

            if(addTop != "0"){
                Topcol.innerHTML = "<pPlust style=\"color : white;\">+เพิ่ม "+formatNumber(addTop)+ "</pPlust>  = " + formatNumber(Top);
            }else{
                Topcol.innerHTML =  formatNumber(Top);
            }
    
            if(addBot != "0"){
                Botcol.innerHTML = "<pPlust style=\"color : white;\">+เพิ่ม " +formatNumber(addBot)+ "</pPlust>  = " + formatNumber(Bot);
            }else{
                Botcol.innerHTML =  formatNumber(Bot);
    
            }

        })



    }
    count_cut++;
    //Check InList
    /*const row = TableRunningNumbers.insertRow(-1);
    const Numbercol = row.insertCell(0);
    const TopMcol = row.insertCell(1);
    const BotMcol = row.insertCell(2);*/

}


function RemoveCuttreeNumbers(treeNumber,Top,Bot,addTop , addBot){
    var findNumber = ListCutNumber.filter(obj => obj == treeNumber )
    var tmpRowID =  "CutTreeNum_" + count_cut;
    if(findNumber.length > 0){
        const row = TableCutTreeNumber.insertRow(-1);
        const Running = row.insertCell(0);
        const Numbercol = row.insertCell(1);
        const Topcol = row.insertCell(2);
        const Botcol = row.insertCell(3);
        row.id = tmpRowID;
        Numbercol.innerHTML = treeNumber;
        if(addTop > 0){
            Topcol.innerHTML = "<pPlust style=\"color : red;\">-ลบ "+formatNumber(addTop)+ "</pPlust>  = " + formatNumber(Top);
        }else{
            Topcol.innerHTML =  formatNumber(Top);
        }

        if(addBot > 0){
            Botcol.innerHTML = "<pPlust style=\"color : red;\">-ลบ " +formatNumber(addBot)+ "</pPlust>  = " + formatNumber(Bot);
        }else{
            Botcol.innerHTML =  formatNumber(Bot);

        }


        var tagtop = "<Prtoptag  style =\" background-color: yellow;\" class =\"PRClasstreeTop_"+treeNumber+"\"></Prtoptag>";
        Topcol.innerHTML+=tagtop;
        var tagBot = "<Prtoptag style =\" background-color: yellow;\"  class =\"PRClasstreeBot_"+treeNumber+"\"></Prtoptag>";
        Botcol.innerHTML+=tagBot;

        setOutTreeNumber(treeNumber);
        setOutTreeNumberForBottom(treeNumber);



        Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;";
        Topcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
        Botcol.style = "color: black;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"


        /*    color: blue;*/

        let btn =document.createElement('button')
        btn.textContent="Log"
        btn.setAttribute('class','btn btn-dark')
        btn.setAttribute('data-id',tmpRowID)
        Running.style = "width: 100px;";
        Running.appendChild(btn)
        
        btn.addEventListener('click',(e)=>{
            btn.style.display = "none"
            row.style = "background-color: gray;";
            Numbercol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Topcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            Botcol.style = "color: white;text-align: center;font-size: 20px;padding-bottom: 0px;letter-spacing: 5px;"
            if(addTop != "0"){
                Topcol.innerHTML = "<pPlust style=\"color : white;\">-ลบ "+formatNumber(addTop)+ "</pPlust>  = " + formatNumber(Top);
            }else{
                Topcol.innerHTML =  formatNumber(Top);
            }
    
            if(addBot != "0"){
                Botcol.innerHTML = "<pPlust style=\"color : white;\">-ลบ " +formatNumber(addBot)+ "</pPlust>  = " + formatNumber(Bot);
            }else{
                Botcol.innerHTML =  formatNumber(Bot);
    
            }

        })

        


    }
    count_cut++;
    //Check InList
    /*const row = TableRunningNumbers.insertRow(-1);
    const Numbercol = row.insertCell(0);
    const TopMcol = row.insertCell(1);
    const BotMcol = row.insertCell(2);*/

}

var PRtable1 = document.getElementById("PR_TableThreeNumber_1")
var PRtable2 = document.getElementById("PR_TableThreeNumber_2")

/*function PRcreateTableforThreeNumber(){

    var countingnumbers = 0 ;
    for(var first = 0 ; first < 10 ; first ++){
        for(var sec = 0 ; sec < 10 ; sec ++){
            for(var thr = 0 ; thr < 10 ; thr ++){

                if(countingnumbers < 500){
                    //ThreeNumbertable1
                    const row = PRtable1.insertRow(-1)
                    const Numbercol = row.insertCell(0)
                    const TopMcol = row.insertCell(1)
                    const BotMcol = row.insertCell(2)
                
                    
                    var threenumber = first+""+sec+""+thr;
                    var tbntopNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRTopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRTopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRBotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRBotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        
                    Numbercol.innerHTML = threenumber
                    TopMcol.innerHTML = tbntopNum //formatNumber(TopMoney)
                    BotMcol.innerHTML = tbnBotNum //formatNumber(BotMoney)                
                    Numbercol.id = "PRThreeNumber_"+threenumber;
                    //row.id = "3Row_"+threenumber;

                
                    Numbercol.value = threenumber;

                    //row.style = "display: none;"
                    Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "
        
                    TopMcol.style = "text-align: right;";
                    BotMcol.style = "text-align: right;";
        
                }else{
                    //ThreeNumbertable2
                    const row = PRtable2.insertRow(-1)
                    const Numbercol = row.insertCell(0)
                    const TopMcol = row.insertCell(1)
                    const BotMcol = row.insertCell(2)
                
                    var threenumber = first+""+sec+""+thr;
                    var tbntopNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRTopMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRTopMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
                    var tbnBotNum = "<div class \"row\"><input type=\"text\" class = \"ShowNumber\" id =\"PRBotMcol_"+ threenumber+"\" value = \"0\" readonly></input> <input type = \"text\" class = \"ShowNumber_2\" id = \"PRBotMcol2_"+threenumber+"\" style = \"display:none;\" value = \"0\" readonly></input></div>";
        
                    Numbercol.innerHTML = threenumber
                    TopMcol.innerHTML = tbntopNum //formatNumber(TopMoney)
                    BotMcol.innerHTML = tbnBotNum //formatNumber(BotMoney)
                
                    Numbercol.id = "PRThreeNumber_"+threenumber;
                    //row.id = "3Row_"+threenumber;

                
                    Numbercol.value = threenumber;

                    Numbercol.style = "color: blue;text-align: center;font-size: 20px;padding-bottom: 0px; letter-spacing: 5px; "
                    //row.style = "display: none;"

                    TopMcol.style = "text-align: right;";
                    BotMcol.style = "text-align: right;";

                }
                countingnumbers++;

            }

        }

    }



}*/

function ShowMoney_AddPR(Datas){

    console.log("ShowMoney_AddPR");
    var DataNumbers = Datas.data().Numbers;

    for(var i = 0 ; i <DataNumbers.length ;i++){

        var sprData = DataNumbers[i].split('='); // [ "10,01" , " 100*100"]
        var A_number = sprData[0].split(','); // [10,01]


        for(var j = 0 ; j <A_number.length ;j++){
            if(A_number[j].trim() == "" ){
                continue;
            }
            //var ParseNumber = parseInt(A_number[j]);
            var lengthA_number = A_number[j].length; //เช็คว่าตัวเลขเป็นแบบ 1 ตัว 2 ตัว 3 ตัว UserName
             if(lengthA_number == 3){
                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
                //console.log(A_number[j] + " = " + TopMoney + " * " + BotMoney);
                if(BotMoney == 3 || BotMoney == 6){
                
                    var This_Number = A_number[j];
                    var numb0 = (This_Number).charAt((0));
                    var numb1 = (This_Number).charAt((1));
                    var numb2 = (This_Number).charAt((2));

                    let listnumb = [
                        numb0+numb1+numb2,
                        numb0+numb2+numb1,
                        numb1+numb2+numb0,
                        numb1+numb0+numb2,
                        numb2+numb0+numb1,
                        numb2+numb1+numb0,
                    ];
                    var unique_Number = listnumb.filter(onlyUnique);

                    for(var u = 0 ; u < unique_Number.length ; u++){

                        console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,Numbers "+unique_Number[u] + "  = " + sprData[1]);
                        const rowTableLog = TableLog.insertRow(-1);
                        const colTableLog = rowTableLog.insertCell(0);
                        colTableLog.innerHTML =Datas.data().UserName +" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+unique_Number[u] + "  = " + TopMoney + " * 0" ;
                        var tmptop = document.getElementById("PRTopMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("PRBotMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var getTopMoney = parseInt(tmptop) + TopMoney;
                        document.getElementById("PRTopMcol_"+unique_Number[u]).value = formatNumber(getTopMoney);

                        setOutTreeNumber(unique_Number[u]);

                    }

                }else{

                    var tmptop = document.getElementById("PRTopMcol_"+A_number[j]).value.replaceAll(",","");
                    var tmpBot = document.getElementById("PRBotMcol_"+A_number[j]).value.replaceAll(",","");
                    var getTopMoney = parseInt(tmptop) + TopMoney;
                    var getBotMoney = parseInt(tmpBot) + BotMoney;
                    //console.log("getTopMoney : " + getTopMoney);
                    //console.log("getBotMoney : " + getBotMoney);


                    console.log(Datas.data().UserName +" => "+ Datas.data().Bill + " , " +Datas.data().Custname + " ,Numbers "+A_number[j] + "  = " + TopMoney + " * " + BotMoney);
                    const rowTableLog = TableLog.insertRow(-1);
                    const colTableLog = rowTableLog.insertCell(0);
                    colTableLog.innerHTML =Datas.data().UserName +" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = " + TopMoney + " * " + BotMoney;
                    document.getElementById("PRTopMcol_"+A_number[j]).value = formatNumber(getTopMoney)
                    //document.getElementById("PRBotMcol_"+A_number[j]).value = formatNumber(getBotMoney)
                    setOutTreeNumber(A_number[j]);


                    if(BotMoney > 0){

                        var This_Number = A_number[j];
                        var numb0 = (This_Number).charAt((0));
                        var numb1 = (This_Number).charAt((1));
                        var numb2 = (This_Number).charAt((2));
    
                        let listnumb = [
                            numb0+numb1+numb2,
                            numb0+numb2+numb1,
                            numb1+numb2+numb0,
                            numb1+numb0+numb2,
                            numb2+numb0+numb1,
                            numb2+numb1+numb0,
                        ];
                        var unique_Number = listnumb.filter(onlyUnique);
                        for(var u = 0 ; u < unique_Number.length ; u++){
                            var tmpBot = document.getElementById("PRBotMcol_"+unique_Number[u]).value.replaceAll(",","");
                            var getBotMoney2 = parseInt(tmpBot) + BotMoney;
                            document.getElementById("PRBotMcol_"+unique_Number[u]).value = formatNumber(getBotMoney2)
                            setOutTreeNumberForBottom(unique_Number[u]);


                        }
                    }



                }



            }



        }


    }

}


function ShowMoney_RemovePR(Datas){
    var DataNumbers = Datas.data().Numbers;

    for(var i = 0 ; i <DataNumbers.length ;i++){

        var sprData = DataNumbers[i].split('='); // [ "10,01" , " 100*100"]
        var A_number = sprData[0].split(','); // [10,01]

        for(var j = 0 ; j <A_number.length ;j++){
            if(A_number[j].trim() == "" ){
                continue;
            }
            //var ParseNumber = parseInt(A_number[j]);
            var lengthA_number = A_number[j].length; //เช็คว่าตัวเลขเป็นแบบ 1 ตัว 2 ตัว 3 ตัว
            
            if(lengthA_number == 3){
                var sprMoney = sprData[1].split('*');
                var TopMoney = parseInt(sprMoney[0]);
                var BotMoney = parseInt(sprMoney[1]);
                if(BotMoney == 3 || BotMoney == 6){
                
                    var This_Number = A_number[j];
                    var numb0 = (This_Number).charAt((0));
                    var numb1 = (This_Number).charAt((1));
                    var numb2 = (This_Number).charAt((2));

                    let listnumb = [
                        numb0+numb1+numb2,
                        numb0+numb2+numb1,
                        numb1+numb2+numb0,
                        numb1+numb0+numb2,
                        numb2+numb0+numb1,
                        numb2+numb1+numb0,
                    ];
                    var unique_Number = listnumb.filter(onlyUnique);
                    for(var u = 0 ; u < unique_Number.length ; u++){

                        const rowTableLog = TableLog.insertRow(-1);
                        rowTableLog.style= "background-color: #dc35455e !important;"

                        const colTableLog = rowTableLog.insertCell(0);
                        colTableLog.innerHTML ="ลบบิล "+Datas.data().UserName +" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+unique_Number[u] + "  = -" + TopMoney + " * 0" ;

                        var tmptop = document.getElementById("PRTopMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var tmpBot = document.getElementById("PRBotMcol_"+unique_Number[u]).value.replaceAll(",","");
                        var getTopMoney = parseInt(tmptop) - TopMoney;
                        //var getBotMoney = parseInt(tmpBot) + BotMoney;
                        document.getElementById("PRTopMcol_"+unique_Number[u]).value = formatNumber(getTopMoney);
                        //document.getElementById("BotMcol_"+A_number[j]).value = formatNumber(getBotMoney)
                        setOutTreeNumber(unique_Number[u]);


                    }

                }else{

                    const rowTableLog = TableLog.insertRow(-1);
                    rowTableLog.style= "background-color: #dc35455e !important;"

                    const colTableLog = rowTableLog.insertCell(0);
                    colTableLog.innerHTML ="ลบบิล "+Datas.data().UserName +" => บิลที่ "+ Datas.data().Bill + " , " +Datas.data().Custname + " , "+A_number[j] + "  = -" + TopMoney + " * -" + BotMoney;

                    var tmptop = document.getElementById("PRTopMcol_"+A_number[j]).value.replaceAll(",","");
                    var tmpBot = document.getElementById("PRBotMcol_"+A_number[j]).value.replaceAll(",","");
                    var getTopMoney = parseInt(tmptop) - TopMoney;
                    //var getBotMoney = parseInt(tmpBot) - BotMoney;
                    document.getElementById("PRTopMcol_"+A_number[j]).value = formatNumber(getTopMoney)
                    //document.getElementById("PRBotMcol_"+A_number[j]).value = formatNumber(getBotMoney)
                    setOutTreeNumber(A_number[j]);


                    if(BotMoney > 0){

                        var This_Number = A_number[j];
                        var numb0 = (This_Number).charAt((0));
                        var numb1 = (This_Number).charAt((1));
                        var numb2 = (This_Number).charAt((2));
    
                        let listnumb = [
                            numb0+numb1+numb2,
                            numb0+numb2+numb1,
                            numb1+numb2+numb0,
                            numb1+numb0+numb2,
                            numb2+numb0+numb1,
                            numb2+numb1+numb0,
                        ];
                        var unique_Number = listnumb.filter(onlyUnique);
                        for(var u = 0 ; u < unique_Number.length ; u++){
                            var tmpBot = document.getElementById("PRBotMcol_"+unique_Number[u]).value.replaceAll(",","");
                            var getBotMoney2 = parseInt(tmpBot) - BotMoney;
                            document.getElementById("PRBotMcol_"+unique_Number[u]).value = formatNumber(getBotMoney2)
                            setOutTreeNumberForBottom(unique_Number[u]);

                        }
                    }



    
                }



            }



        }


    }

}


function setOutTreeNumber(PRtreeNumber){

    var GettopPrNum = document.getElementById("PRTopMcol_" + PRtreeNumber).value;
    //var GetBotPrNum = document.getElementById("PRBotMcol_" + PRtreeNumber).value;
    if(GettopPrNum != "0"){
        var selectclass = document.getElementsByClassName("PRClasstreeTop_"+PRtreeNumber);
        //console.log("GettopPrNum : " + GettopPrNum);
       // console.log(selectclass);
        for(var i = 0 ; i <selectclass.length ; i ++){
            selectclass[i].innerHTML = "    [" +GettopPrNum+"]";
        }
    }else{
        var selectclass = document.getElementsByClassName("PRClasstreeTop_"+PRtreeNumber);
        //console.log("GettopPrNum : " + GettopPrNum);
       // console.log(selectclass);
        for(var i = 0 ; i <selectclass.length ; i ++){
            selectclass[i].innerHTML = "";
        }

    }

    /*if(GetBotPrNum != "0"){
        var selectclass = document.getElementsByClassName("PRClasstreeBot_"+PRtreeNumber);
        //console.log("GetBotPrNum : " + GetBotPrNum);
        //console.log(selectclass);
        for(var i = 0 ; i < selectclass.length ; i ++){
            selectclass[i].innerHTML = "    [" +GetBotPrNum+"]";
        }

    }else{
        var selectclass = document.getElementsByClassName("PRClasstreeBot_"+PRtreeNumber);
        //console.log("GetBotPrNum : " + GetBotPrNum);
        //console.log(selectclass);
        for(var i = 0 ; i < selectclass.length ; i ++){
            selectclass[i].innerHTML = "";
        }

    }*/

}

function setOutTreeNumberForBottom(PRtreeNumber){

    var GetBotPrNum = document.getElementById("PRBotMcol_" + PRtreeNumber).value;
    console.log("setOutTreeNumberForBottom : " +PRtreeNumber + " : " + GetBotPrNum);

    if(GetBotPrNum != "0"){
        var selectclass = document.getElementsByClassName("PRClasstreeBot_"+PRtreeNumber);
        //console.log("GetBotPrNum : " + GetBotPrNum);
        //console.log(selectclass);
        for(var i = 0 ; i < selectclass.length ; i ++){
            selectclass[i].innerHTML = "    [" +GetBotPrNum+"]";
        }

    }else{
        var selectclass = document.getElementsByClassName("PRClasstreeBot_"+PRtreeNumber);
        //console.log("GetBotPrNum : " + GetBotPrNum);
        //console.log(selectclass);
        for(var i = 0 ; i < selectclass.length ; i ++){
            selectclass[i].innerHTML = "";
        }

    }

}

const Tablechknum = document.getElementById("TableCHECKINGNUMBER") 


$("#btnTop3Numbers").click(() => {
    Tablechknum.innerHTML = "";
    console.log("CHECK 3 ตัวตรง");
    var ChkMoney = parseInt($("#tbxTopCHECKINGNUMBER").val());
    if(ChkMoney > 0 ){
        for(var i = 0 ; i < 10 ;i ++){
            for(var j = 0 ; j < 10 ; j++){
                for(var k = 0 ; k < 10 ; k++){
                    var TmpNumbers = i+""+j+""+k;
                    var topMoney = document.getElementById("TopMcol_"+TmpNumbers).value.replaceAll(",","");
                    var tmp_topMoney = parseFloat(topMoney);
                    if(tmp_topMoney >= ChkMoney && ChkMoney > 0){
                        var sendingmoney = document.getElementById("PRTopMcol_"+TmpNumbers).value.replaceAll(",","");
                        var tmp_sendingmoney = parseFloat(sendingmoney);
                        const row = Tablechknum.insertRow(-1);
                        const Running = row.insertCell(0);
                        const Money = row.insertCell(1);
                        const spend_Mon = row.insertCell(2);
                        const sell_Mon = row.insertCell(3);

                        var caltotal = tmp_topMoney - tmp_sendingmoney;
                        Running.innerHTML = "ตรง : " + TmpNumbers;
                        Money.innerHTML =  formatNumber(tmp_topMoney);
                        spend_Mon.innerHTML =  formatNumber(tmp_sendingmoney) ;
                        sell_Mon.innerHTML = formatNumber(caltotal);
                        Running.style = "font-size: 20px;"

                        if(caltotal > ChkMoney){
                            sell_Mon.style = "color : red ; font-size: 20px;"

                        }
        
                    }
                }
    
            }
        }

    }
    
});


$("#btnBut3Numbers").click(() => {
    Tablechknum.innerHTML = "";
    var ChkMoney = parseInt($("#tbxButCHECKINGNUMBER").val());
    var treenumberlist =[];
    if(ChkMoney > 0 ){
        for(var i = 0 ; i < 10 ;i ++){
            for(var j = 0 ; j < 10 ; j++){
                for(var k = 0 ; k < 10 ; k++){
                    var TmpNumbers = i+""+j+""+k;
                    var chk_treenumber = treenumberlist.filter(obj => obj == TmpNumbers )
                    if(chk_treenumber.length <= 0 ){
                        treenumberlist.push(i+""+j+""+k);
                        treenumberlist.push(i+""+k+""+j);
                        treenumberlist.push(j+""+i+""+k);
                        treenumberlist.push(j+""+k+""+i);
                        treenumberlist.push(k+""+j+""+i);
                        treenumberlist.push(k+""+i+""+j);
    
    
                        var ButMoney = document.getElementById("BotMcol_"+TmpNumbers).value.replaceAll(",","");
                        var tmp_ButMoney = parseFloat(ButMoney);
                        if(tmp_ButMoney >= ChkMoney && ChkMoney > 0){
                            var sendingmoney = document.getElementById("PRBotMcol_"+TmpNumbers).value.replaceAll(",","");
                            var tmp_sendingmoney = parseFloat(sendingmoney);
                            const row = Tablechknum.insertRow(-1);
                            const Running = row.insertCell(0);
                            const Money = row.insertCell(1);
                            const spend_Mon = row.insertCell(2);
                            const sell_Mon = row.insertCell(3);
    
                            var caltotal = tmp_ButMoney - tmp_sendingmoney;
                            Running.innerHTML = "โต๊ด : " + TmpNumbers;
                            Money.innerHTML =  formatNumber(tmp_ButMoney);
                            spend_Mon.innerHTML =  formatNumber(tmp_sendingmoney) ;
                            sell_Mon.innerHTML = formatNumber(caltotal);
                            Running.style = "font-size: 20px;"
    
                            if(caltotal > ChkMoney){
                                sell_Mon.style = "color : red ; font-size: 20px;"
    
                            }
            
                        }

                    }


                }
    
            }
        }

    }
console.log(treenumberlist);
    
});


