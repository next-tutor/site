const hidePanels = function () {
    $(".main-panel .panel").removeClass("show");
}

//-------------------------------------------

const setSidebarClickEvents = function () {

    $(".sidebar .item.students").click(() => {
        showPanel("students");
    })
    $(".sidebar .item.lessons").click(() => {
        showPanel("lessons");
    })
    $(".sidebar .item.tasks").click(() => {
        showPanel("tasks");
    })
    $(".sidebar .item.website").click(() => {
        showPanel("website");
    })
    $(".sidebar .item.reports").click(() => {
        showPanel("reports");
    })
    $(".sidebar .item.settings").click(() => {
        showPanel("settings");
    })
}

//-------------------------------------------

const showPanel = function (panelName) {
    $(".main-panel .panel").removeClass("show");
    $(`.sidebar .item`).removeClass("active");

    if (panelName !== "") {
        $(`.main-panel .panel.${panelName}`).addClass("show");
        $(`.sidebar .item.${panelName}`).addClass("active");
    }
}

//-------------------------------------------

const setLessonMenuClickEvents = function () {

    $(".panel.lessons .menu .upcoming").click(() => {
        showLessonList("upconing");
    })
    $(".panel.lessons .menu .past").click(() => {
        showLessonList("past");
    })
    $(".panel.lessons .menu .canceled").click(() => {
        showLessonList("canceled");
    })
}

//-------------------------------------------

const showLessonList = function (listName) {

}

//-------------------------------------------

const init = function () {
    setSidebarClickEvents();
    setLessonMenuClickEvents();

    hidePanels();
    showPanel("students");
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

