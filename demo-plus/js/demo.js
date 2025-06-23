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
            lessons.setLessonClickEvents();

            hidePanels();
            showPanel("students");
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

