/*
============================================

予定ボード

File : app.js
Version : 1.3.0

============================================
*/


"use strict";



window.addEventListener("DOMContentLoaded", function(){

    createSchedule();

});





/*
====================================
保存データ
====================================
*/


let scheduleData = loadSchedule();







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
                "▼ " + staff.department;



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



            const saved =
                findSchedule(
                    staff.name,
                    day
                );



            if(saved){


                cell.textContent =
                    saved.title;


            }






            cell.addEventListener(
                "click",
                function(){


                    inputSchedule(
                        cell,
                        staff.name,
                        day
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
予定入力
====================================
*/


function inputSchedule(cell, staff, day){



    const current =
        findSchedule(
            staff,
            day
        );



    const title =
        prompt(
            "予定名を入力してください",
            current ? current.title : ""
        );



    if(title === null){

        return;

    }





    if(title === ""){


        removeSchedule(
            staff,
            day
        );


        cell.textContent = "";


        return;


    }





    const detail =
        prompt(
            "詳細を入力してください",
            current ? current.detail : ""
        );





    const exists =
        findSchedule(
            staff,
            day
        );



    if(exists){


        exists.title =
            title;


        exists.detail =
            detail;



    }
    else{


        scheduleData.push({

            staff:staff,

            day:day,

            title:title,

            detail:detail


        });


    }



    saveSchedule();



    cell.textContent =
        title;



}







/*
====================================
検索
====================================
*/


function findSchedule(staff, day){


    return scheduleData.find(function(item){


        return (

            item.staff === staff

            &&

            item.day === day

        );


    });


}







/*
====================================
削除
====================================
*/


function removeSchedule(staff, day){


    scheduleData =
        scheduleData.filter(function(item){


            return !(

                item.staff === staff

                &&

                item.day === day

            );


        });



    saveSchedule();



}






/*
====================================
保存
====================================
*/


function saveSchedule(){


    localStorage.setItem(

        "yoteiData",

        JSON.stringify(scheduleData)

    );


}







/*
====================================
読み込み
====================================
*/


function loadSchedule(){


    const data =
        localStorage.getItem(
            "yoteiData"
        );



    if(data){


        let result =
            JSON.parse(data);



        result =
            result.map(function(item){


                if(item.text){


                    return {

                        staff:item.staff,

                        day:item.day,

                        title:item.text,

                        detail:""

                    };


                }



                return item;



            });



        return result;


    }



    return [];



}
