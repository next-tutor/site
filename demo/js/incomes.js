const incomes = (function () {

    

    const setIncomesEvents = function () {
        $(".panel.incomes .menu .daily").click(() => showIncomeList("daily"));
        $(".panel.incomes .menu .weekly").click(() => showIncomeList("weekly"));
        $(".panel.incomes .menu .monthly").click(() => showIncomeList("monthly"));

        $(".dlg-wrap.income-dlg .dlg-close-btn, .dlg-wrap.income-dlg .popper").click(() => {
            closeIncomeDialog();
        });

        $(".panel.incomes .content .list .list-item").click(function () {
            openIncomeDialog(this);
        });
    }

    

    const openIncomeDialog = function (item) {
        const $item = $(item);
        const title = $item.data("title") || $item.find(".info .text").text().trim();
        const date = $item.data("date") || "";
        $(".dlg-wrap.income-dlg .income-dlg-title").text(title);
        $(".dlg-wrap.income-dlg .income-dlg-desc").text(date);
        $(".dlg-wrap.income-dlg").addClass("open");
    }

    

    const closeIncomeDialog = function () {
        const $wrap = $(".dlg-wrap.income-dlg");
        if (!$wrap.hasClass("open")) return;
        $wrap.removeClass("open").addClass("closing");
        setTimeout(() => $wrap.removeClass("closing"), 210);
    }

    

    const moveTabIndicator = function (listName, animate = true) {
        const $item = $(`.panel.incomes .menu .item.${listName}`);
        if (!$item.length) return;
        if (!animate) {
            $(`.panel.incomes .menu .tab-indicator`).css("transition", "none");
        }
        $(`.panel.incomes .menu .tab-indicator`).css({
            left: $item[0].offsetLeft,
            width: $item[0].offsetWidth,
        });
        if (!animate) {
            setTimeout(() => {
                $(`.panel.incomes .menu .tab-indicator`).css("transition", "");
            }, 50);
        }
    }

    //-------------------------------------------

    const showIncomeList = function (listName) {
        if (listName !== "") {
            $(".panel.incomes .menu .item").removeClass("active");
            $(`.panel.incomes .menu .item.${listName}`).addClass("active");
            $(`.panel.incomes .content .list`).removeClass("show");
            $(`.panel.incomes .content .list.${listName}`).addClass("show");
            moveTabIndicator(listName);
        }
    }

    

    const initTabIndicator = function () {
        const $active = $(".panel.incomes .menu .item.active");
        if (!$active.length) return;
        const activeClass = ["daily", "weekly", "monthly"].find(c => $active.hasClass(c));
        if (activeClass) {
            moveTabIndicator(activeClass, false);
        }
    }

    

    const onIncomesPanelShown = function () {
        initTabIndicator();
    }

    const onIncomesPanelHidden = function () {
        closeIncomeDialog();
    }

    

    return {
        setIncomesEvents,
        initTabIndicator,
        onIncomesPanelShown,
        onIncomesPanelHidden,
    }
})();
