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

        $(`.panel.lessons .btn-more`).click((e) => {
            openMoreMenu(e);
        });
        $(`.panel.lessons`).click((event) => {
            closeMoreMenu(event);
        });
    }


    //-------------------------------------------

    const openMoreMenu = function (e) {
        e.stopPropagation();
        $(`.panel.lessons .menu-more`).addClass("open");
    }

    const closeMoreMenu = function (event) {
        $(`.panel.lessons .menu-more`).removeClass("open");
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

    const showPastDialog = function () {
        $(".dlg-wrap.past-lesson-dlg").addClass("open");
    }

    return {
        setLessonClickEvents,
    }
})();

