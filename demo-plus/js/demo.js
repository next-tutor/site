const hidePanels = function () {
    $(".main-panel .panel").removeClass("show");
}

//-------------------------------------------

const showPanel = function (panelName) {
    $(".panel").removeClass("show");
    $(`.sidebar .item`).removeClass("active");

    if (panelName !== "") {
        $(`.panel.${panelName}`).addClass("show");
        $(`.sidebar .item.${panelName}`).addClass("active");
    }
}

//-------------------------------------------

const init = function () {
    htmlLoader.load()
        .then(() => {
            dlg.setDlgEvents();
            sidebar.setSidebarClickEvents();
            tasks.setTasksClickEvents();
            taskDlg.setTaskDlgClickEvents();
            taskReqDlg.setTaskReqDlgClickEvents();
            taskUpdateItemDlg.setTaskUpdateItemDlgClickEvents();
            taskInfoDlg.setTaskInfoDlgClickEvents();
            offerDlg.setOfferDlgClickEvents();
            lessons.setLessonClickEvents();
            student.setStudentClickEvents();
            newLessonDlg.setNewLessonDlgClickEvents();
            searchLessonDlg.setSearchLessonDlgClickEvents();
            pastLessonDlg.setPastLessonDlgClickEvents();
            students.setStudentsClickEvents();

            hidePanels();
            showPanel("students");
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

