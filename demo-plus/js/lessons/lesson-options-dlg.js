const lessonOptionsDlg = (function () {


    const onFindBtnClick = function () {
        $(".lesson-options-dlg").removeClass("open");
        searchLessonDlg.open();
    }

    //----------------------------------------------------

    const onPlusBtnClick = function () {
        $(".lesson-options-dlg").removeClass("open");
        newLessonDlg.open();
    }

    //----------------------------------------------------

    const setLessonOptionsDlgClickEvents = function () {
        $(".dlg-wrap.lesson-options-dlg .item.plus").click(() => {
            onPlusBtnClick();
        });
        $(".dlg-wrap.lesson-options-dlg .item.find").click(() => {
            onFindBtnClick();
        });
    }

    //----------------------------------------------------

    const open = function () {
        $(".dlg-wrap.lesson-options-dlg").addClass("open");
    }


    return {
        open,
        setLessonOptionsDlgClickEvents
    }
})();

