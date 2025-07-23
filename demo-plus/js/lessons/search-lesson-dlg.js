const searchLessonDlg = (function () {

    const setSearchLessonDlgClickEvents = function () {
        $("#search-lesson-dlg .input-date").click((e) => {
            showDatePicker(e);
        });
        $("#search-lesson-dlg .dlg.search").click((e) => {
            closeDatePicker(e);
        });
    }

    //----------------------------------------------------

    const showDatePicker = function (e) {
        e.stopPropagation();
        $("#search-lesson-dlg .panel").removeClass("show");
        $(e.target).closest(".input-date").addClass("show-picker");
    };

    //----------------------------------------------------

    const closeDatePicker = function (e) {
        $("#search-lesson-dlg .input-date").removeClass("show-picker");
        $("#search-lesson-dlg .panel").addClass("show");
    };

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

