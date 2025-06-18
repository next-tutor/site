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
        showLessonList("upcoming");
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

    if (listName !== "") {
        $(".panel.lessons .menu .item").removeClass("active");
        $(`.panel.lessons .menu .item.${listName}`).addClass("active");

        $(`.panel.lessons .content .list`).removeClass("show");
        $(`.panel.lessons .content .list.${listName}`).addClass("show");
    }

}

//-------------------------------------------

const init = function () {
    htmlLoader.load()
        .then(() => {
            debugger;
            setSidebarClickEvents();
            setLessonMenuClickEvents();

            hidePanels();
            showPanel("students");
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

