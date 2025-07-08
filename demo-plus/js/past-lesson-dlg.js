const pastLessonDlg = (function () {

    let currentPage = 0;

    const showCurrPage = function () {
        currentPage += 1;

        if (currentPage > 5) {
            currentPage = 1;
        }

        $(`.dlg-wrap.past-lesson-dlg .main-box`).removeClass("show");
        $(`.dlg-wrap.past-lesson-dlg .main-box.page${currentPage}`).addClass("show");
    }


    const setPastLessonDlgClickEvents = function () {

        $(`.dlg-wrap.past-lesson-dlg .steps-wrap .step`).click(() => {
            showCurrPage();
        })
    }

    const open = function () {

        currentPage = 0;

        showCurrPage();
        $(".dlg-wrap.past-lesson-dlg").addClass("open");
    }


    return {
        open,
        setPastLessonDlgClickEvents
    }
})();

