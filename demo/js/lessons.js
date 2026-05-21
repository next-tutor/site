const lessons = (function () {

    //-------------------------------------------

    const setLessonClickEvents = function () {

        $(".panel.lessons .menu .upcoming").click(() => showLessonList("upcoming"));
        $(".panel.lessons .menu .past").click(() => showLessonList("past"));
        $(".panel.lessons .menu .canceled").click(() => showLessonList("canceled"));

        $(".dlg-wrap.past-lesson-dlg .dlg-close-btn, .dlg-wrap.past-lesson-dlg .popper").click(() => {
            closePastDialog();
        });

        // Attendance toggle — only past lesson first page
        $(document).on("click", ".dlg-wrap.past-lesson-dlg .attendance-item", function () {
            $(".dlg-wrap.past-lesson-dlg .attendance-item").removeClass("active");
            $(this).addClass("active");
        });

        $(".panel.lessons .content .list.past .list-item").click(function () {
            openDialog("past", this);
        });
        $(".panel.lessons .content .list.upcoming .list-item").click(function () {
            openDialog("upcoming", this);
        });
        $(".panel.lessons .content .list.canceled .list-item").click(function () {
            openDialog("canceled", this);
        });
    }

    //-------------------------------------------

    const openDialog = function (type, item) {
        const $wrap = $(".dlg-wrap.past-lesson-dlg");
        const name = $(item).find(".text").text().trim();
        const date = $(item).find(".date").text().trim();
        const time = $(item).find(".time").text().trim();
        const desc = date + " · " + time;

        const formatShortName = (n) => {
            const parts = n.split(" ");
            return parts.length >= 2 ? parts[0] + " " + parts[1][0].toUpperCase() + "." : n;
        };
        const displayName = type === "canceled" ? "Canceled lesson"
                          : type === "past"     ? formatShortName(name)
                          : name;
        $wrap.find(".dlg-header .name").text(displayName);
        $wrap.find(".dlg-header .desc").text(desc);

        // Populate type-specific dynamic fields
        $wrap.find(".dlg-date").text(date);
        $wrap.find(".dlg-time").text(time);

        // Reset attendance to Present on every open
        if (type === "past") {
            $wrap.find(".attendance-item").removeClass("active");
            $wrap.find(".attendance-item").first().addClass("active");
        }

        $wrap.removeClass("is-past is-upcoming is-canceled").addClass(`is-${type}`);
        $wrap.addClass("open");
    }

    //-------------------------------------------

    const closePastDialog = function () {
        const $wrap = $(".dlg-wrap.past-lesson-dlg");
        if (!$wrap.hasClass("open")) return;
        $wrap.removeClass("open").addClass("closing");
        setTimeout(() => $wrap.removeClass("closing"), 210);
    }

    //-------------------------------------------

    const moveTabIndicator = function (listName, animate = true) {
        const $item = $(`.panel.lessons .menu .item.${listName}`);
        if (!$item.length) return;
        if (!animate) {
            $(`.panel.lessons .menu .tab-indicator`).css("transition", "none");
        }
        $(`.panel.lessons .menu .tab-indicator`).css({
            left: $item[0].offsetLeft,
            width: $item[0].offsetWidth,
        });
        if (!animate) {
            setTimeout(() => {
                $(`.panel.lessons .menu .tab-indicator`).css("transition", "");
            }, 50);
        }
    }

    //-------------------------------------------

    const showLessonList = function (listName) {
        if (listName !== "") {
            $(".panel.lessons .menu .item").removeClass("active");
            $(`.panel.lessons .menu .item.${listName}`).addClass("active");
            $(`.panel.lessons .content .list`).removeClass("show");
            $(`.panel.lessons .content .list.${listName}`).addClass("show");
            moveTabIndicator(listName);
        }
    }

    //-------------------------------------------

    const initTabIndicator = function () {
        const $active = $(".panel.lessons .menu .item.active");
        if (!$active.length) return;
        const activeClass = ["past", "upcoming", "canceled"].find(c => $active.hasClass(c));
        if (activeClass) {
            moveTabIndicator(activeClass, false);
        }
    }

    const onLessonsPanelShown = function () {
        initTabIndicator();
    }

    const onLessonsPanelHidden = function () {
        closePastDialog();
    }

    return {
        setLessonClickEvents,
        initTabIndicator,
        onLessonsPanelShown,
        onLessonsPanelHidden,
    }
})();
