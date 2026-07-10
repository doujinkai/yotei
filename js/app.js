/*
============================================

予定ボード

File : app.js
Version : test-0.1

============================================
*/


"use strict";


window.addEventListener("DOMContentLoaded", function(){


    const board =
        document.getElementById("scheduleBoard");


    if(!board){

        console.log("scheduleBoardがありません");

        return;

    }



    const table =
        document.createElement("table");


    table.className =
        "schedule-table";



    /*
    --------------------------
    日付ヘッダー
    --------------------------
    */


    const header =
        document.createElement("tr");


    const nameHeader =
        document.createElement("th");


    nameHeader.textContent =
        "職員";


    header.appendChild(nameHeader);



    for(let i = 1; i <= 31; i++){


        const th =
            document.createElement("th");


        th.textContent =
            i;


        header.appendChild(th);

    }


    table.appendChild(header);




    /*
    --------------------------
    職員データ
    --------------------------
    */


    const staff = [

        "佐藤",

        "鈴木",

        "田中",

        "山田",

        "高橋"

    ];




    staff.forEach(function(name){



        const row =
            document.createElement("tr");



        const nameCell =
            document.createElement("td");


        nameCell.textContent =
            name;


        row.appendChild(nameCell);




        for(let i = 1; i <= 31; i++){


            const cell =
                document.createElement("td");


            row.appendChild(cell);

        }



        table.appendChild(row);


    });




    board.appendChild(table);



    console.log("予定表作成完了");


});
