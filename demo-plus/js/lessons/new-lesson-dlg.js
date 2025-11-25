const newLessonDlg = (function () {

    const setNewLessonDlgClickEvents = function () {
        $("#new-lesson-dlg .field.student-name").click(() => {
            showStudentSearchDlg();
        });
        $("#new-lesson-dlg .field.date-time").click(() => {
            showPickDateDlg();
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

    const showStudentSearchDlg = function () {
        newLessonChooseStudentDlg.open();
    }

    //----------------------------------------------------

    const showPickDateDlg = function () {
        newLessonChooseDateDlg.open();
    }

    //----------------------------------------------------

    const open = function () {
        $("#new-lesson-dlg").addClass("open");
    }


    return {
        open,
        setNewLessonDlgClickEvents
    }
})();

