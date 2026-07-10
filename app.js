/*
============================================

予定ボード

File : app.js
Version : 1.0.0

============================================
*/


"use strict";


window.addEventListener("DOMContentLoaded", function(){


    createSchedule();



});



/*
====================================
予定表作成
====================================
*/


function createSchedule(){


    const board =
        document.getElementById("scheduleBoard");



    const table =
        document.createElement("table");


    table.className =
        "schedule-table";



    createHeader(table);


    createStaff(table);



    board.appendChild(table);



}




/*
====================================
日付ヘッダー
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
職員表示
====================================
*/


function createStaff(table){



    const staffList = [


        {
            department:"事務",
            name:"佐藤"
        },


        {
            department:"事務",
            name:"鈴木"
        },


        {
            department:"介護",
            name:"田中"
        },


        {
            department:"介護",
            name:"山田"
        },


        {
            department:"看護",
            name:"高橋"
        }


    ];




    let beforeDepartment = "";




    staffList.forEach(function(staff){



        if(beforeDepartment !== staff.department){


            beforeDepartment =
                staff.department;



            const deptRow =
                document.createElement("tr");



            const deptCell =
                document.createElement("td");



            deptCell.colSpan =
                32;



            deptCell.textContent =
                "▼ "
                +
                staff.department;



            deptRow.appendChild(deptCell);



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


            row.appendChild(cell);



        }




        table.appendChild(row);



    });



}
