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

        // $(`.panel.tasks .title`).click((event) => {
        //     openMoreOptionsMenu(event);
        // });

        $(`.panel.tasks`).click((event) => {
            closeMoreOptionsMenu();
        });

        $(`.panel.tasks .more-options .plus`).click((event) => {
            openTaskDlg();
        });

        $(`.panel.tasks .more-options .find`).click((event) => {
            openSearchBoxDlg();
        });
    }


    //-------------------------------------------

    const openMoreOptionsMenu = function (e) {
        e.stopPropagation();
        $(`.panel.tasks .inner`).addClass("show-options-menu");
    }

    //-------------------------------------------

    const closeMoreOptionsMenu = function () {

        $(`.panel.tasks .inner`).removeClass("show-options-menu");
    }

    //-------------------------------------------

    const showTasksList = function (listName) {

        if (listName !== "") {
            $(".panel.tasks .menu .item").removeClass("active");
            $(`.panel.tasks .menu .item.${listName}`).addClass("active");

            $(`.panel.tasks .content .list`).removeClass("show");
            $(`.panel.tasks .content .list.${listName}`).addClass("show");
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

    const openSearchBoxDlg = function (listName) {
        searchTasksDlg.open();
    }

    return {
        setTasksClickEvents,
    }
})();

