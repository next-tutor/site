const students = (function () {


    //-------------------------------------------

    const setStudentsClickEvents = function () {

        $(".panel.students .search-input").click((e) => {
            openSearchBox(e);
        });

        $(".panel.students .search-box .popper").click((e) => {
            closeSearchBox(e);
        });
        $(`.panel.students .title`).click((event) => {
            openMoreOptionsMenu(event);
        });

        $(`.panel.students`).click((event) => {
            closeMoreOptionsMenu();
        });

        $(`.panel.students .pic`).click((event) => {
            openStudent();
        });

        $(`.panel.students .btn-plus`).click((event) => {
            openAddStudentDlg(event);
        });
        $(".panel.students .add-student-dlg .popper").click(() => {
            closeAddStudentDlg();
        });
    }

    //-------------------------------------------

    const openSearchBox = function (e) {
        e.stopPropagation();
        $(".panel.students .search-box").addClass("show");
    }

    //-------------------------------------------

    const closeSearchBox = function (e) {
        $(".panel.students .search-box").removeClass("show");
    }

    //-------------------------------------------

    const openMoreOptionsMenu = function (e) {
        e.stopPropagation();
        $(`.panel.students .inner`).addClass("show-options-menu");
    }

    //-------------------------------------------

    const closeMoreOptionsMenu = function () {
        $(`.panel.students .inner`).removeClass("show-options-menu");
    }

    //-------------------------------------------

    const openStudent = function () {
        $(`.student`).addClass("show");
        $(`.student .panel.lessons`).addClass("show");
    }

    //-------------------------------------------

    const openAddStudentDlg = function (e) {
        e.stopPropagation();
        $(".panel.students .add-student-dlg").addClass("show");
    }

    //-------------------------------------------

    const closeAddStudentDlg = function () {
        $(".panel.students .add-student-dlg").removeClass("show");
    }


    return {
        setStudentsClickEvents,
    }
})();

