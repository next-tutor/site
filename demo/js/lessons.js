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

