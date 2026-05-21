const tasks = (function () {

    

    const setTasksClickEvents = function () {

        $(".panel.tasks .menu .requests").click(() => showTaskList("requests"));
        $(".panel.tasks .menu .in-progress").click(() => showTaskList("in-progress"));
        $(".panel.tasks .menu .completed").click(() => showTaskList("completed"));

        $(".panel.tasks .content .list .list-item").click(function () {
            openTaskDlg($(this));
        });

        $("#task-popup-dlg .dlg-close-btn, #task-popup-dlg .popper").click(() => {
            closeTaskDlg();
        });

        $("#task-popup-dlg .nav-btn.prev").click(() => {
            const isRequest = $("#task-popup-dlg .dlg").hasClass("is-request-type");
            if (isRequest) return;
            if (currentTaskPanel > 0) {
                currentTaskPanel--;
                updateTaskSlider();
            }
        });

        $("#task-popup-dlg .nav-btn.next").click(() => {
            const isRequest = $("#task-popup-dlg .dlg").hasClass("is-request-type");
            if (isRequest) return;
            if (currentTaskPanel < 1) {
                currentTaskPanel++;
                updateTaskSlider();
            }
        });
    }

    

    let currentTaskPanel = 0;

    const openTaskDlg = function ($item) {
        currentTaskPanel = 0;
        
        
        const studentName = $item.find(".info .text").text().trim();
        const taskTitle = $item.find(".info .desc .time").text().trim();
        
        
        $("#task-popup-dlg .name").text(studentName);
        $("#task-popup-dlg .title-text").text(taskTitle);

        const isRequest = $item.closest(".list").hasClass("requests");
        if (isRequest) {
            $("#task-popup-dlg .dlg").addClass("is-request-type");
        } else {
            $("#task-popup-dlg .dlg").removeClass("is-request-type");
        }

        updateTaskSlider();
        $("#task-popup-dlg").addClass("open");
    }

    const closeTaskDlg = function () {
        const $wrap = $("#task-popup-dlg");
        if (!$wrap.hasClass("open")) return;
        $wrap.removeClass("open").addClass("closing");
        setTimeout(() => {
            $wrap.removeClass("closing");
            $wrap.find(".dlg").removeClass("is-request-type");
        }, 300);
    }

    const updateTaskSlider = function () {
        const $dlg = $("#task-popup-dlg");
        const isRequest = $dlg.find(".dlg").hasClass("is-request-type");
        
        $dlg.find(".slider-panel").removeClass("active");
        if (currentTaskPanel === 0) {
            $dlg.find(".slider-panel.request-message").addClass("active");
            $dlg.find(".nav-btn.prev").addClass("disabled");
            if (isRequest) {
                $dlg.find(".nav-btn.next").addClass("disabled");
            } else {
                $dlg.find(".nav-btn.next").removeClass("disabled");
            }
        } else {
            $dlg.find(".slider-panel.updates").addClass("active");
            $dlg.find(".nav-btn.prev").removeClass("disabled");
            $dlg.find(".nav-btn.next").addClass("disabled");
        }
        
        $dlg.find(".s-dot").removeClass("active");
        $dlg.find(`.s-dot:eq(${currentTaskPanel})`).addClass("active");
    }

    

    const moveTabIndicator = function (listName, animate = true) {
        const $item = $(`.panel.tasks .menu .item.${listName}`);
        if (!$item.length) return;
        if (!animate) {
            $(`.panel.tasks .menu .tab-indicator`).css("transition", "none");
        }
        $(`.panel.tasks .menu .tab-indicator`).css({
            left: $item[0].offsetLeft,
            width: $item[0].offsetWidth,
        });
        if (!animate) {
            setTimeout(() => {
                $(`.panel.tasks .menu .tab-indicator`).css("transition", "");
            }, 50);
        }
    }

    //-------------------------------------------

    const showTaskList = function (listName) {
        if (listName !== "") {
            $(".panel.tasks .menu .item").removeClass("active");
            $(`.panel.tasks .menu .item.${listName}`).addClass("active");
            $(`.panel.tasks .content .list`).removeClass("show");
            $(`.panel.tasks .content .list.${listName}`).addClass("show");
            moveTabIndicator(listName);
        }
    }

    

    const initTabIndicator = function () {
        const $active = $(".panel.tasks .menu .item.active");
        if (!$active.length) return;
        const activeClass = ["requests", "in-progress", "completed"].find(c => $active.hasClass(c));
        if (activeClass) {
            moveTabIndicator(activeClass, false);
        }
    }

    const onTasksPanelShown = function () {
        initTabIndicator();
    }

    const onTasksPanelHidden = function () {
        closeTaskDlg();
    }

    return {
        setTasksClickEvents,
        initTabIndicator,
        onTasksPanelShown,
        onTasksPanelHidden,
    }
})();
