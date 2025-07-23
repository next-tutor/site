const taskUpdateItemDlg = (function () {

    const setTaskUpdateItemDlgClickEvents = function () {
        $(`.task-update-item-dlg .update-time`).click(() => {
            openStudentResponse();
        });
    }

    const openStudentResponse = function () {
        $(`.task-update-item-dlg .response`).toggleClass("open");
    }

    const open = function () {

        $(".dlg-wrap.task-update-item-dlg").addClass("open");
    }

    return {
        open,
        setTaskUpdateItemDlgClickEvents
    }
})();

