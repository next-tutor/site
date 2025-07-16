const dlg = (function () {

    const setDlgEvents = function () {

        $(".popper").click((e) => {
            $(e.target).closest(".dlg-wrap").removeClass("open");
        })
    }

    return {
        setDlgEvents
    }
})();

