const lessons = (function () {


    //-------------------------------------------

    const setLessonClickEvents = function () {

        $(".panel.lessons .menu .upcoming").click(() => {
            showLessonList("upcoming");
        });

        $(".panel.lessons .menu .past").click(() => {
            showLessonList("past");
        });

        $(".panel.lessons .menu .canceled").click(() => {
            showLessonList("canceled");
        });

        $(`.panel.lessons .content .list.past .list-item`).click(() => {
            showPastDialog();
        });

        $(`.panel.lessons .btn-more`).click((event) => {
            showMoreDialog();
        });

        $(`.panel.lessons`).click((event) => {
            closeMoreOptionsMenu();
        });

        $(`.panel.lessons .more-options .plus`).click((event) => {
            openLessonDlg();
        });

        $(`.panel.lessons .more-options .find`).click((event) => {
            openSearchBoxDlg();
        });

    }

    //-------------------------------------------

    const closeMoreOptionsMenu = function () {

        $(`.panel.lessons .inner`).removeClass("show-options-menu");
    }

    //-------------------------------------------

    const showLessonList = function (listName) {

        if (listName !== "") {
            $(".panel.lessons .menu .item").removeClass("active");
            $(`.panel.lessons .menu .item.${listName}`).addClass("active");

            $(`.panel.lessons .content .list`).removeClass("show");
            $(`.panel.lessons .content .list.${listName}`).addClass("show");
        }
    }

    //--------------------------------------------

    const showMoreDialog = function () {
        lessonOptionsDlg.open();
    }

    //--------------------------------------------

    const showPastDialog = function () {
        pastLessonDlg.open();
    }

    //-------------------------------------------

    const openLessonDlg = function (listName) {
        newLessonDlg.open();
    }

    //-------------------------------------------

    const openSearchBoxDlg = function (listName) {
        searchLessonDlg.open();
    }

    return {
        setLessonClickEvents,
    }
})();

