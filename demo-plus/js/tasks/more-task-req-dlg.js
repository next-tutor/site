const moreTaskReqDlg = (function () {

    const setMoreTaskReqDlgClickEvents = function () {

    }

    const open = function () {

        $(".dlg-wrap.more-task-req-dlg").addClass("open");
        $(`.dlg.more-task-req-dlg .panel`).addClass("show");

        $(`.dlg.more-task-req-dlg .btn-more`).addClass("hide");
        $(`.dlg.more-task-req-dlg .btn-corner`).addClass("hide");

    }


    return {
        open,
        setMoreTaskReqDlgClickEvents
    }
})();

