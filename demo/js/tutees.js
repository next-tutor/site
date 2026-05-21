const tutees = (function () {
    let hasAutoOpenedPopup = false;
    let closeTimer = null;
    let autoAdvanceTimer = null;
    let videoMode = false;
    const popupAutoAdvanceMs = 2400;
    const isPopupAutoAdvanceEnabled = true;

    const clearAutoAdvanceTimer = function () {
        if (autoAdvanceTimer) {
            clearTimeout(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    const setTuteesEvents = function () {
        $(".tutees .pic").on("click", function () {
            const avatar = $(this).find("img").attr("src");
            const name = $(this).find(".name").text().trim();
            openTuteePopup(avatar, name);
        });

        $(document).on("click", ".tutee-popup-dlg .close-button, .tutee-popup-dlg .popper", function () {
            closeTuteePopup();
        });

        $(".tutees .pic.active .circle .path").on("animationend", function () {
            if (hasAutoOpenedPopup) return;
            const activeStudent = $(".tutees .pic.active");
            const avatar = activeStudent.find("img").attr("src");
            const name = activeStudent.find(".name").text().trim();
            openTuteePopup(avatar, name);
            hasAutoOpenedPopup = true;
        });
    }

    const openTuteePopup = function (avatar, name) {
        const popup = $(".tutee-popup-dlg");
        clearAutoAdvanceTimer();
        if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        popup.find(".avatar").attr("src", avatar);
        popup.find(".name").text(name);
        popup.removeClass("closing");
        popup.addClass("open");
        document.dispatchEvent(new CustomEvent("tuteePopupOpened"));
        stopCircle();

        if (isPopupAutoAdvanceEnabled && videoMode) {
            autoAdvanceTimer = setTimeout(function () {
                if (!popup.hasClass("open")) return;
                closeTuteePopup();
                if (typeof showPanel === "function") {
                    showPanel("lessons");
                }
            }, popupAutoAdvanceMs);
        }
    }

    const closeTuteePopup = function () {
        const popup = $(".tutee-popup-dlg");
        clearAutoAdvanceTimer();
        popup.removeClass("open");
        popup.addClass("closing");
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
            popup.removeClass("closing");
            document.dispatchEvent(new CustomEvent("tuteePopupClosed"));
            closeTimer = null;
        }, 240);
        stopCircle();
    }

    const stopCircle = function () {
        const circle = $(".tutees .pic.active .circle");
        circle.hide();
        circle.removeClass("is-running");
    }

    const startCircle = function () {
        const circle = $(".tutees .pic.active .circle");
        if (!circle.length) return;
        circle.show();
        circle.removeClass("is-running");
        void circle[0].offsetWidth;
        circle.addClass("is-running");
    }

    const onTuteesPanelShown = function () {
        hasAutoOpenedPopup = false;
        startCircle();
    }

    const onTuteesPanelHidden = function () {
        clearAutoAdvanceTimer();
        if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        $(".tutee-popup-dlg").removeClass("open closing");
        stopCircle();
        hasAutoOpenedPopup = false;
    }

    const setVideoMode = function (val) {
        videoMode = val;
    }

    return {
        setTuteesEvents,
        onTuteesPanelShown,
        onTuteesPanelHidden,
        setVideoMode
    }
})();
