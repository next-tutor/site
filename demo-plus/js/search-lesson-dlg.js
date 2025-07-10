const searchLessonDlg = (function () {

    const setSearchLessonDlgClickEvents = function () {

    }

    //----------------------------------------------------

    const open = function () {
        $(".lessons").removeClass("show");
        $("#search-lesson-dlg").addClass("open");
        $("#search-lesson-dlg .form.main").addClass("show");
    }


    return {
        open,
        setSearchLessonDlgClickEvents
    }
})();

