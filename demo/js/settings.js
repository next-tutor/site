const settings = (function () {
    let originalDuration = 45;
    let selectedDuration = 45;

    const setSettingsEvents = function () {
        // Sub-sidebar navigation click handler
        $(document).on("click", ".settings-sidebar .menu .item", function () {
            const tabName = $(this).data("tab");
            if (!tabName) return;

            // Change active item in menu
            $(".settings-sidebar .menu .item").removeClass("active");
            $(this).addClass("active");

            // Switch active section on the right side
            $(".settings-page-wrapper .settings-section").removeClass("show");
            
            // Allow a small delay to trigger CSS transition nicely
            const $targetSection = $(`.settings-page-wrapper .settings-section.${tabName}`);
            $targetSection.addClass("show");
        });

        // Duration select radio buttons handler
        $(document).on("click", ".settings-section.duration .duration-item", function () {
            const val = parseInt($(this).data("val"), 10);
            if (isNaN(val)) return;

            selectedDuration = val;
            originalDuration = val;

            // Toggle active styling
            $(".settings-section.duration .duration-item").removeClass("selected");
            $(".settings-section.duration .duration-item .radio-button").removeClass("selected");
            
            $(this).addClass("selected");
            $(this).find(".radio-button").addClass("selected");

            // Update Lesson Pricing sub-page info dynamically to match immediately
            $(".settings-section.pricing .pricing-value .duration-text").text(`for ${originalDuration} minutes`);
        });

        // Expandable details chevron in Pro Plan
        $(document).on("click", ".settings-section.plan .chevron-wrapper", function () {
            const $box = $(".settings-section.plan .upgrade-box");
            const $chevron = $(this).find(".chevron");

            $box.toggleClass("open");
            $chevron.toggleClass("open");
        });

        // Close button click handler
        $(document).on("click", "#settings .close-button", function (e) {
            e.stopPropagation();
            if (typeof showPanel === "function") {
                showPanel("tutees");
            }
        });

        // Backdrop click handler
        $(document).on("click", "#settings", function (e) {
            if ($(e.target).closest(".settings-container").length === 0) {
                if (typeof showPanel === "function") {
                    showPanel("tutees");
                }
            }
        });
    };

    const resetSettings = function () {
        // Reset sub-sidebar menu and section to Personal Info
        $(".settings-sidebar .menu .item").removeClass("active");
        $(`.settings-sidebar .menu .item[data-tab="personal"]`).addClass("active");

        $(".settings-page-wrapper .settings-section").removeClass("show");
        $(".settings-page-wrapper .settings-section.personal").addClass("show");

        // Reset Duration page variables
        selectedDuration = originalDuration;
        $(".settings-section.duration .duration-item").removeClass("selected");
        $(".settings-section.duration .duration-item .radio-button").removeClass("selected");
        
        const $defaultItem = $(`.settings-section.duration .duration-item[data-val="${originalDuration}"]`);
        $defaultItem.addClass("selected");
        $defaultItem.find(".radio-button").addClass("selected");

        // Reset Plan page collapsible details and plan sub-views
        $(".settings-section.plan .upgrade-box").removeClass("open");
        $(".settings-section.plan .chevron").removeClass("open");
        $(".settings-section.plan .pro-plan").removeClass("show");
        $(".settings-section.plan .free-plan").addClass("show");
    };

    const onSettingsPanelShown = function () {
        resetSettings();
    };

    const onSettingsPanelHidden = function () {
        resetSettings();
    };

    return {
        setSettingsEvents,
        onSettingsPanelShown,
        onSettingsPanelHidden,
    };
})();
