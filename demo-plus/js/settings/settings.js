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

        $(".panel.settings .inner.lesson-options .list-item.duration").click(() => {
            showPage("duration");
        });

        $(".panel.settings .inner.lesson-options .list-item.pricing").click(() => {
            showPage("pricing");
        });

        $(".panel.settings .inner.lesson-options .list-item.cancellation").click(() => {
            showPage("cancellation");
        });

        $(".panel.settings .edit-password").click(() => {
            showEditPassword();
        });

        $(".panel.settings .close-edit-password").click(() => {
            closeEditPassword();
        });

        $(".panel.settings .inner .title").click((e) => {
            showPage($(e.target).closest(".title").data('back'));
        });
    }

    //-------------------------------------------

    const showPage = function (pageName) {
        pageName = pageName || "main";

        $(".panel.settings .inner").removeClass("show");
        $(`.panel.settings .inner.${pageName}`).addClass("show");
    }

    //-------------------------------------

    const showEditPassword = function () {

        $(".panel.settings .new-password").removeClass("hide");
        $(".panel.settings .current-password").removeClass("hide");
        $(".panel.settings .password").addClass("hide");
    }

    //-------------------------------------

    const closeEditPassword = function () {

        $(".panel.settings .new-password").addClass("hide");
        $(".panel.settings .current-password").addClass("hide");
        $(".panel.settings .password").removeClass("hide");
    }

    return {
        setSettingsClickEvents
    }
})();

