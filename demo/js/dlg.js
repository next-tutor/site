const dlg = (function () {

    const setDlgEvents = function () {

        $(".popper").click(() => {
            $(".dlg-wrap").removeClass("open");
        })
    }

    return {
        setDlgEvents
    }
})();

