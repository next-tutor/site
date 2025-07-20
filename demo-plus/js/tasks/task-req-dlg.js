const taskReqDlg = (function () {

    const showCurrPage = function (page) {

        $(`.dlg-wrap.task-req-dlg .main-box .page`).removeClass("show");
        $(`.dlg-wrap.task-req-dlg .main-box .page.page${page}`).addClass("show");
    }


    const setTaskReqDlgClickEvents = function () {

        $(`.dlg-wrap.task-req-dlg .steps-wrap .step`).click(() => {
            showCurrPage(2);
        });

        $(`.dlg-wrap.task-req-dlg .btn.yes`).click(() => {
            openOffer();
        })
        $(`.dlg-wrap.task-req-dlg .btn-back`).click(() => {
            showCurrPage(1);
        });
    }

    const open = function () {

        showCurrPage(1);
        $(".dlg-wrap.task-req-dlg").addClass("open");
    }

    const openOffer = function () {

        offerDlg.open();
    }


    return {
        open,
        setTaskReqDlgClickEvents
    }
})();

