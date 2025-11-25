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
            moreTaskReqDlg.setMoreTaskReqDlgClickEvents();
            lessons.setLessonClickEvents();
            student.setStudentClickEvents();
            newLessonDlg.setNewLessonDlgClickEvents();
            newLessonChooseDateDlg.setNewLessonChooseDateDlgClickEvents();
            newLessonChooseStudentDlg.setNewLessonChooseStudentDlgClickEvents();
            searchLessonDlg.setSearchLessonDlgClickEvents();
            pastLessonDlg.setPastLessonDlgClickEvents();
            lessonOptionsDlg.setLessonOptionsDlgClickEvents();
            students.setStudentsClickEvents();
            settings.setSettingsClickEvents();

            hidePanels();
            showPanel("students");
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

