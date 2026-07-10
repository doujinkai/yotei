/*
================================================

予定ボード

File : app.js
Version : 0.4.1

================================================
*/

"use strict";


/*=========================================
  現在年月
=========================================*/

const currentDate = new Date();



/*=========================================
  職員データ

後でスプレッドシートから取得予定
=========================================*/

const staffList = [

    { department: "事務", name: "佐藤" },
    { department: "事務", name: "鈴木" },

    { department: "介護", name: "田中" },
    { department: "介護", name: "山田" },

    { department: "看護", name: "高橋" }

];



/*=========================================
 初期化
=========================================*/

window.addEventListener("DOMContentLoaded", () => {

    updateMonth();

    createBoard();

});



/*=========================================
 年月表示
=========================================*/

function updateMonth(){

    document.getElementById("currentMonth").textContent =
        `${currentDate.getFullYear()}年${currentDate.getMonth()+1}月`;

}



/*=========================================
 予定表作成
=========================================*/

function createBoard(){

    const board =
        document.getElementById("scheduleBoard");


    board.innerHTML="";


    const table =
        document.createElement("table");


    table.className="schedule-table";



    createHeader(table);


    createBody(table);



    board.appendChild(table);

}



/*=========================================
 ヘッダー作成
=========================================*/

function createHeader(table){


    const thead =
        document.createElement("thead");


    const row =
        document.createElement("tr");


    const nameHeader =
        document.createElement("th");


    nameHeader.textContent="職員";


    row.appendChild(nameHeader);



    const days =
        getDaysInMonth();



    for(let day=1; day<=days; day++){


        const th =
            document.createElement("th");


        th.textContent=day;


        row.appendChild(th);

    }



    thead.appendChild(row);


    table.appendChild(thead);

}



/*=========================================
 本体作成
=========================================*/

function createBody(table){


    const tbody =
        document.createElement("tbody");



    let department="";



    staffList.forEach(staff=>{


        if(department !== staff.department){


            department =
                staff.department;



            const deptRow =
                document.createElement("tr");


            deptRow.className="department-row";



            const td =
                document.createElement("td");


            td.colSpan =
                getDaysInMonth()+1;


            td.textContent =
                "▼ " + department;



            deptRow.appendChild(td);


            tbody.appendChild(deptRow);

        }



        const row =
            document.createElement("tr");



        const name =
            document.createElement("td");


        name.textContent =
            staff.name;


        row.appendChild(name);



        for(let day=1; day<=getDaysInMonth(); day++){


            const cell =
                document.createElement("td");



            const date =
                createDateString(day);



            const schedule =
                findSchedule(
                    date,
                    staff.name
                );



            if(schedule){


                cell.textContent =
                    schedule.title;



                if(schedule.detail){


                    cell.textContent += " ◢";

                }

            }



            row.appendChild(cell);

        }



        tbody.appendChild(row);


    });



    table.appendChild(tbody);

}



/*=========================================
 日数取得
=========================================*/

function getDaysInMonth(){

    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()+1,
        0
    ).getDate();

}



/*=========================================
 日付形式作成
=========================================*/

function createDateString(day){


    const y =
        currentDate.getFullYear();


    const m =
        String(
            currentDate.getMonth()+1
        ).padStart(2,"0");


    const d =
        String(day)
        .padStart(2,"0");



    return `${y}-${m}-${d}`;

}



/*=========================================
 予定検索
=========================================*/

function findSchedule(date,staff){


    return scheduleData.find(item=>{


        return (
            item.date === date &&
            item.staff === staff
        );


    });


}
