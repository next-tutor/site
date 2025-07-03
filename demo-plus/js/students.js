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


    return {
        setStudentsClickEvents,
    }
})();

