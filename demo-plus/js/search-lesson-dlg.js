const searchLessonDlg = (function () {

    const setSearchLessonDlgClickEvents = function () {

    }

    //----------------------------------------------------

    const open = function () {
        $("#search-lesson-dlg").addClass("open");
        $("#search-lesson-dlg .panel").addClass("show");
    }


    return {
        open,
        setSearchLessonDlgClickEvents
    }
})();

