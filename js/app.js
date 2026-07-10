/*
============================================

予定ボード

File : app.js
Version : 0.3.0

============================================
*/

"use strict";

/*=========================================
  設定
=========================================*/

const currentDate = new Date();

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

function updateMonth() {

    document.getElementById("currentMonth").textContent =
        `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;

}


/*=========================================
  予定表生成
=========================================*/

function createBoard() {

    const board = document.getElementById("scheduleBoard");

    board.innerHTML = "";

    const table = document.createElement("table");

    table.className = "schedule-table";


    /* ---------- ヘッダー ---------- */

    const thead = document.createElement("thead");

    const headRow = document.createElement("tr");

    const staffHeader = document.createElement("th");
    staffHeader.textContent = "職員";

    headRow.appendChild(staffHeader);

    const days =
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

    for (let day = 1; day <= days; day++) {

        const th = document.createElement("th");

        th.textContent = day;

        headRow.appendChild(th);

    }

    thead.appendChild(headRow);

    table.appendChild(thead);


    /* ---------- 本体 ---------- */

    const tbody = document.createElement("tbody");

    let currentDepartment = "";

    staffList.forEach(staff => {

        if (staff.department !== currentDepartment) {

            currentDepartment = staff.department;

            const deptRow = document.createElement("tr");

            deptRow.className = "department-row";

            const deptCell = document.createElement("td");

            deptCell.colSpan = days + 1;

            deptCell.textContent = "▼ " + currentDepartment;

            deptRow.appendChild(deptCell);

            tbody.appendChild(deptRow);

        }

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        nameCell.textContent = staff.name;

        row.appendChild(nameCell);

        for (let i = 1; i <= days; i++) {

            const cell = document.createElement("td");

            cell.dataset.staff = staff.name;
            cell.dataset.day = i;

            row.appendChild(cell);

        }

        tbody.appendChild(row);

    });

    table.appendChild(tbody);

    board.appendChild(table);

}
