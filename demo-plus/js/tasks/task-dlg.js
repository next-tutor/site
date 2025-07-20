const taskDlg = (function () {

    const showCurrPage = function (page) {

        $(`.dlg-wrap.task-dlg .main-box .page`).removeClass("show");
        $(`.dlg-wrap.task-dlg .main-box .page.page${page}`).addClass("show");
    }

    const setTaskDlgClickEvents = function () {
        $(`.dlg-wrap.task-dlg .steps-wrap .step.page1`).click(() => {
            showCurrPage(2);
        });

        $(`.dlg-wrap.task-dlg .steps-wrap .step.page2`).click(() => {
            showCurrPage(1);
        });

        $(`.dlg-wrap.task-dlg .task-updates .update.item`).click(() => {
            openUpdateItemDlg();
        });
        $(`.dlg-wrap.task-dlg .task-title`).click(() => {
            openInfoTaskDlg(2);
        });
    }


    const openInfoTaskDlg = function () {
        taskInfoDlg.open();
    }

    const openUpdateItemDlg = function (page) {

        taskUpdateItemDlg.open();
    }

    const open = function () {

        $(".dlg-wrap.task-dlg").addClass("open");
    }

    return {
        open,
        setTaskDlgClickEvents
    }
})();

