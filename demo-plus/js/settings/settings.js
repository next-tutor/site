const settings = (function () {


    const setSettingsClickEvents = function () {

        $(".panel.settings .inner.main .list-item.my-account").click(() => {
            showPage("my-account");
        });

        $(".panel.settings .inner.main .list-item.lessons-options").click(() => {
            showPage("lesson-options");
        });

        $(".panel.settings .inner.main  .list-item.availability").click(() => {
            showPage("availability");
        });

        $(".panel.settings .inner.main .list-item.providers").click(() => {
            showPage("providers");
        });

        $(".panel.settings .inner.my-account .list-item.personal-info").click(() => {
            showPage("personal-info");
        });

        $(".panel.settings .inner.my-account .list-item.business-info").click(() => {
            showPage("business-info");
        });

        $(".panel.settings .inner.my-account .list-item.plan").click(() => {
            showPage("plan");
        });

        $(".panel.settings .inner .title").click((e) => {
            showPage($(e.target).data('back'));
        });
    }

    //-------------------------------------------

    const showPage = function (pageName) {
        pageName = pageName || "main";

        $(".panel.settings .inner").removeClass("show");
        $(`.panel.settings .inner.${pageName}`).addClass("show");
    }

    return {
        setSettingsClickEvents
    }
})();

