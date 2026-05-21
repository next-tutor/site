const hidePanels = function () {
    $(".main-panel .panel").removeClass("show");
}



const sectionOrder = ["tutees", "lessons", "tasks", "incomes", "website", "settings"];
const sectionSwitchIntervalMs = 5000;
let sectionSwitchTimer = null;
let isAutoSectionSwitchActive = false;
let isVideoMode = false;

const getVisiblePanelName = function () {
    for (const section of sectionOrder) {
        if ($(`.main-panel .panel.${section}`).hasClass("show")) {
            return section;
        }
    }
    return "";
}

const ensureSectionIndicators = function () {
    $(".sidebar .menu .item").each(function () {
        if ($(this).hasClass("tutees")) return;
        if (!$(this).find(".interval-indicator").length) {
            $(this).append(
                `<div class="interval-indicator"><span class="interval-progress"></span></div>`
            );
        }
    });
}

const clearSectionIndicators = function () {
    $(".sidebar .menu .item").removeClass("interval-active");
    $(".sidebar .menu .item .interval-progress").removeClass("running");
}

const playSectionIndicator = function (sectionName) {
    clearSectionIndicators();
    if (sectionName === "tutees") return;
    const sectionItem = $(`.sidebar .menu .item.${sectionName}`);
    if (!sectionItem.length) return;
    sectionItem.addClass("interval-active");
    const progress = sectionItem.find(".interval-progress");
    progress.removeClass("running");
    void progress[0].offsetWidth;
    progress.addClass("running");
}

const stopSectionAutoSwitch = function () {
    isAutoSectionSwitchActive = false;
    if (sectionSwitchTimer) {
        clearTimeout(sectionSwitchTimer);
        sectionSwitchTimer = null;
    }
    clearSectionIndicators();
}

const runSectionAutoSwitchStep = function (currentSection) {
    if (!isAutoSectionSwitchActive) return;

    playSectionIndicator(currentSection);

    sectionSwitchTimer = setTimeout(() => {
        if (!isAutoSectionSwitchActive) return;
        const currentIndex = sectionOrder.indexOf(currentSection);
        let nextIndex = currentIndex === -1 ? 1 : (currentIndex + 1) % sectionOrder.length;
        if (sectionOrder[nextIndex] === "tutees") nextIndex = (nextIndex + 1) % sectionOrder.length;
        const nextSection = sectionOrder[nextIndex];
        showPanel(nextSection, { fromAutoSwitch: true });
        runSectionAutoSwitchStep(nextSection);
    }, sectionSwitchIntervalMs);
}

const getFirstSectionWithIndicator = function (startSection) {
    if (startSection !== "tutees") return startSection;
    return "lessons";
}

const startSectionAutoSwitch = function (startSection) {
    ensureSectionIndicators();
    stopSectionAutoSwitch();
    isAutoSectionSwitchActive = true;
    const firstSection = getFirstSectionWithIndicator(startSection);
    if (firstSection !== startSection) {
        showPanel(firstSection, { fromAutoSwitch: true });
    }
    runSectionAutoSwitchStep(firstSection);
}

const showPanel = function (panelName, options = {}) {
    if (!options.fromAutoSwitch) {
        stopSectionAutoSwitch();
    }

    const previousPanel = getVisiblePanelName();

    $(".main-panel .panel").removeClass("show");
    $(`.sidebar .item`).removeClass("active");

    if (previousPanel === "tutees" && window.tutees) tutees.onTuteesPanelHidden();
    if (previousPanel === "incomes" && window.incomes) incomes.onIncomesPanelHidden();
    if (previousPanel === "lessons" && window.lessons) lessons.onLessonsPanelHidden();
    if (previousPanel === "tasks" && window.tasks) tasks.onTasksPanelHidden();
    if (previousPanel === "settings" && window.settings) settings.onSettingsPanelHidden();

    if (panelName !== "") {
        $(`.main-panel .panel.${panelName}`).addClass("show");
        $(`.sidebar .item.${panelName}`).addClass("active");

        if (panelName === "incomes" && window.incomes) {
            incomes.onIncomesPanelShown();
        }
        if (panelName === "lessons" && window.lessons) {
            lessons.onLessonsPanelShown();
        }
        if (panelName === "tasks" && window.tasks) {
            tasks.onTasksPanelShown();
        }
        if (panelName === "settings" && window.settings) {
            settings.onSettingsPanelShown();
        }
        if (panelName !== "tutees" && !options.fromAutoSwitch && isVideoMode) {
            startSectionAutoSwitch(panelName);
        }
    }
}



const bindDeferredEvents = function () {
    dlg.setDlgEvents();
    lessons.setLessonClickEvents();
    tasks.setTasksClickEvents();
    if (window.incomes) incomes.setIncomesEvents();
    if (window.settings) settings.setSettingsEvents();
};

const init = function () {
    htmlLoader.loadCritical()
        .then(() => {
            sidebar.setSidebarClickEvents();
            tutees.setTuteesEvents();

            hidePanels();
            showPanel("tutees");

            if (isVideoMode) {
                ensureSectionIndicators();
            }

            document.addEventListener("tuteePopupOpened", () => {
                stopSectionAutoSwitch();
            });

            return htmlLoader.loadDeferred();
        })
        .then(() => {
            bindDeferredEvents();
        });
}



$(document).ready(function () {
    document.body.classList.add('interactive-mode');
    init();
});

window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'setAutoSwitch') return;
    isVideoMode = event.data.enabled;
    document.body.classList.toggle('interactive-mode', !isVideoMode);
    if (window.tutees) tutees.setVideoMode(isVideoMode);
    if (isVideoMode) {
        ensureSectionIndicators();
        const current = getVisiblePanelName() || sectionOrder[0];
        startSectionAutoSwitch(current);
    } else {
        stopSectionAutoSwitch();
    }
});
