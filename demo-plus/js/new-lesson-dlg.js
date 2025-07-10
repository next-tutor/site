const newLessonDlg = (function () {

    const setNewLessonDlgClickEvents = function () {
        $("#new-lesson-dlg .field.student-name").click(() => {
            showStudentSearchForm();
        });
        $("#new-lesson-dlg .field.date-time").click(() => {
            showPickDateForm();
        });
        $("#new-lesson-dlg .btn-close").click(() => {
            onCloseBtnClick();
        });
        $("#new-lesson-dlg .btn-back").click(() => {
            onBackBtnClick();
        });
        $("#new-lesson-dlg .btn-save").click(() => {
            onBackBtnClick();
        });
        $("#new-lesson-dlg .btn-select-student").click(() => {
            onBackBtnClick();
        });
    }

    //----------------------------------------------------

    const onCloseBtnClick = function () {
        $(".lessons").addClass("show");
        $("#new-lesson-dlg").removeClass("open");
    }

    //----------------------------------------------------

    const onBackBtnClick = function () {
        $("#new-lesson-dlg .form").removeClass("show");
        $("#new-lesson-dlg .form.main").addClass("show");
    }

    //----------------------------------------------------

    const showStudentSearchForm = function () {
        $("#new-lesson-dlg .form").removeClass("show");
        $("#new-lesson-dlg .form.students").addClass("show");
    }

    //----------------------------------------------------

    const showPickDateForm = function () {
        $("#new-lesson-dlg .form").removeClass("show");
        $("#new-lesson-dlg .form.dates").addClass("show");
    }

    //----------------------------------------------------

    const open = function () {
        $(".lessons").removeClass("show");
        $("#new-lesson-dlg").addClass("open");
        $("#new-lesson-dlg .form.main").addClass("show");
    }


    return {
        open,
        setNewLessonDlgClickEvents
    }
})();

