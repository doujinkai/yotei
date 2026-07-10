/*
============================================

予定ボード

File : app.js
Version : 0.5.0

============================================
*/

"use strict";


const now = new Date();



window.addEventListener("DOMContentLoaded", function(){


    showMonth();

    createSchedule();


});




/*
====================================
年月表示
====================================
*/


function showMonth(){


    const month =
        document.getElementById("currentMonth");


    if(month){


        month.textContent =
            now.getFullYear()
            +
            "年"
            +
            (now.getMonth()+1)
            +
            "月";


    }


}




/*
====================================
予定表作成
====================================
*/


function createSchedule(){


    const board =
        document.getElementById("scheduleBoard");



    board.innerHTML = "";



    const table =
        document.createElement("table");



    table.className =
        "schedule-table";



    createHeader(table);



    createBody(table);



    board.appendChild(table);



}




/*
====================================
ヘッダー
====================================
*/


function createHeader(table){


    const row =
        document.createElement("tr");



    const name =
        document.createElement("th");



    name.textContent =
        "職員";



    row.appendChild(name);



    for(let day = 1; day <= 31; day++){


        const th =
            document.createElement("th");


        th.textContent =
            day;



        row.appendChild(th);


    }



    table.appendChild(row);



}




/*
====================================
本体
====================================
*/


function createBody(table){


    let department = "";



    staffList.forEach(function(staff){



        if(department !== staff.department){


            department =
                staff.department;



            const deptRow =
                document.createElement("tr");



            deptRow.className =
                "department-row";



            const dept =
                document.createElement("td");



            dept.colSpan =
                32;



            dept.textContent =
                "▼ "
                +
                department;



            deptRow.appendChild(dept);



            table.appendChild(deptRow);



        }





        const row =
            document.createElement("tr");



        const nameCell =
            document.createElement("td");



        nameCell.textContent =
            staff.name;



        row.appendChild(nameCell);






        for(let day = 1; day <= 31; day++){



            const cell =
                document.createElement("td");



            const date =
                createDate(day);



            const plan =
                getSchedule(
                    staff.name,
                    date
                );




            if(plan){


                cell.textContent =
                    plan.title;



                if(plan.detail){


                    cell.textContent +=
                        " ◢";


                }


            }





            cell.addEventListener(
                "click",
                function(){


                    openModal(

                        staff.name,

                        date,

                        plan ? plan.title : "",

                        plan ? plan.detail : ""

                    );


                }
            );




            row.appendChild(cell);



        }



        table.appendChild(row);



    });



}






/*
====================================
日付作成
====================================
*/


function createDate(day){


    const year =
        now.getFullYear();



    const month =
        String(
            now.getMonth()+1
        )
        .padStart(2,"0");



    const date =
        String(day)
        .padStart(2,"0");



    return (
        year
        +
        "-"
        +
        month
        +
        "-"
        +
        date
    );


}






/*
====================================
予定検索
====================================
*/


function getSchedule(staff,date){



    return scheduleData.find(function(item){



        return (

            item.staff === staff

            &&

            item.date === date

        );



    });



}
