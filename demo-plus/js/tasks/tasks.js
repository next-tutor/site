const tasks = (function () {


    //-------------------------------------------

    const setTasksClickEvents = function () {

        $(".panel.tasks .menu .requests").click(() => {
            showTasksList("requests");
        });

        $(".panel.tasks .menu .inprogress").click(() => {
            showTasksList("inprogress");
        });

        $(".panel.tasks .menu .completed").click(() => {
            showTasksList("completed");
        });

        $(`.panel.tasks .content .list.requests .list-item`).click(() => {
            openTaskReqDialog();
        });

        $(`.panel.tasks .content .list.inprogress .list-item`).click(() => {
            openTaskDialog();
        });

        $(`.panel.tasks`).click((e) => {
            closeMoreOptionsMenu(e);
        });

        $(`.panel.tasks .btn-more-req`).click((event) => {
            openMoreRequestsDlg();
        });

        $(`.panel.tasks .more-options .find`).click((event) => {
            openSearchBoxDlg();
        });
    }

    //-------------------------------------------

    const closeMoreOptionsMenu = function (e) {

        if ($(e.target).closest(".menu .item.requests").length == 0) {
            $(`.panel.tasks .inner .request-dropdown`).removeClass("show");
            $(`.panel.tasks .inner .content`).removeClass("hide");
            $(`.panel.tasks .inner .btn-corner`).removeClass("hide");
        }
    }

    //-------------------------------------------

    const showTasksList = function (listName) {

        if (listName !== "") {
            $(".panel.tasks .menu .item").removeClass("active");
            $(`.panel.tasks .menu .item.${listName}`).addClass("active");

            $(`.panel.tasks .content .list`).removeClass("show");
            $(`.panel.tasks .content .list.${listName}`).addClass("show");

            $(`.panel.tasks .inner .btn-more-req`).toggleClass("hide", listName !== "requests");
        }
    }

    //--------------------------------------------

    const openTaskReqDialog = function () {
        taskReqDlg.open();
    }

    //--------------------------------------------

    const openTaskDialog = function () {
        taskDlg.open();
    }


    //-------------------------------------------

    const openMoreRequestsDlg = function (listName) {
        moreTaskReqDlg.open();
    }

    //-------------------------------------------

    const openSearchBoxDlg = function (listName) {
        searchTasksDlg.open();
    }

    return {
        setTasksClickEvents,
    }
})();

