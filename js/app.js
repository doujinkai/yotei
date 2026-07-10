/*
============================================

予定ボード

File : app.js
Version : 0.4.1

============================================
*/

"use strict";


const now = new Date();



window.addEventListener("DOMContentLoaded", function(){

    showMonth();

    createSchedule();

});



/*
年月表示
*/

function showMonth(){

    const month =
        document.getElementById("currentMonth");


    if(month){

        month.textContent =
            now.getFullYear() +
            "年" +
            (now.getMonth()+1) +
            "月";

    }

}



/*
予定表作成
*/

function createSchedule(){

    const board =
        document.getElementById("scheduleBoard");


    if(!board){

        console.error(
            "scheduleBoardがありません"
        );

        return;

    }


    const table =
        document.createElement("table");


    table.className =
        "schedule-table";



    createHeader(table);

    createRows(table);



    board.appendChild(table);

}



/*
日付ヘッダー
*/

function createHeader(table){


    const tr =
        document.createElement("tr");


    const name =
        document.createElement("th");


    name.textContent =
        "職員";


    tr.appendChild(name);



    const days =
        getDays();



    for(let i=1;i<=days;i++){


        const th =
            document.createElement("th");


        th.textContent =
            i;


        tr.appendChild(th);

    }


    table.appendChild(tr);

}



/*
職員行
*/

function createRows(table){


    let beforeDepartment = "";


    staffList.forEach(function(staff){



        if(beforeDepartment !== staff.department){


            beforeDepartment =
                staff.department;



            const dept =
                document.createElement("tr");


            const td =
                document.createElement("td");


            td.colSpan =
                getDays()+1;


            td.textContent =
                "▼ " + staff.department;


            dept.appendChild(td);


            table.appendChild(dept);

        }



        const tr =
            document.createElement("tr");



        const name =
            document.createElement("td");


        name.textContent =
            staff.name;


        tr.appendChild(name);



        for(let day=1;day<=getDays();day++){


            const td =
                document.createElement("td");



            const date =
                makeDate(day);



            const plan =
                scheduleData.find(function(item){


                    return (
                        item.date === date &&
                        item.staff === staff.name
                    );


                });



            if(plan){


                td.textContent =
                    plan.title;


                if(plan.detail){

                    td.textContent +=
                        " ◢";

                }

            }



            tr.appendChild(td);

        }



        table.appendChild(tr);


    });


}



/*
月の日数
*/

function getDays(){

    return new Date(
        now.getFullYear(),
        now.getMonth()+1,
        0
    ).getDate();

}



/*
日付作成
*/

function makeDate(day){


    const y =
        now.getFullYear();


    const m =
        String(now.getMonth()+1)
        .padStart(2,"0");


    const d =
        String(day)
        .padStart(2,"0");



    return y+"-"+m+"-"+d;

}
