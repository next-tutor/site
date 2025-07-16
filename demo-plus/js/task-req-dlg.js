const taskReqDlg = (function () {


    let currentPage = 0;

    const showCurrPage = function () {
        currentPage += 1;

        if (currentPage > 2) {
            currentPage = 1;
        }

        $(`.dlg-wrap.task-req-dlg .main-box`).removeClass("show");
        $(`.dlg-wrap.task-req-dlg .main-box.page${currentPage}`).addClass("show");
    }


    const setTaskReqDlgClickEvents = function () {

        $(`.dlg-wrap.task-req-dlg .steps-wrap .step`).click(() => {
            showCurrPage();
        });

        $(`.dlg-wrap.task-req-dlg .btn.yes`).click(() => {
            openOffer();
        })
    }

    const open = function () {

        currentPage = 0;

        showCurrPage();
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

