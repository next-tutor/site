const hidePanels = function () {
    $(".main-panel .panel").removeClass("show");
}

//-------------------------------------------

const sectionOrder = ["tutees", "lessons", "tasks", "incomes", "website", "settings"];
const sectionSwitchIntervalMs = 5000;
let sectionSwitchTimer = null;
let isAutoSectionSwitchActive = false;

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
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % sectionOrder.length;
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

    if (panelName !== "") {
        $(`.main-panel .panel.${panelName}`).addClass("show");
        $(`.sidebar .item.${panelName}`).addClass("active");
        if (panelName === "tutees" && window.tutees) {
            tutees.onTuteesPanelShown();
        }
        if (panelName === "incomes" && window.incomes) {
            incomes.onIncomesPanelShown();
        }
        if (panelName === "lessons" && window.lessons) {
            lessons.onLessonsPanelShown();
        }
        if (panelName === "tasks" && window.tasks) {
            tasks.onTasksPanelShown();
        }
        if (panelName !== "tutees" && !options.fromAutoSwitch) {
            startSectionAutoSwitch(panelName);
        }
    }
}

//-------------------------------------------

const bindDeferredEvents = function () {
    dlg.setDlgEvents();
    lessons.setLessonClickEvents();
    tasks.setTasksClickEvents();
    if (window.incomes) incomes.setIncomesEvents();
};

const init = function () {
    htmlLoader.loadCritical()
        .then(() => {
            ensureSectionIndicators();
            sidebar.setSidebarClickEvents();
            tutees.setTuteesEvents();

            hidePanels();
            showPanel("tutees");

            document.addEventListener("tuteePopupOpened", () => {
                stopSectionAutoSwitch();
            });

            return htmlLoader.loadDeferred();
        })
        .then(() => {
            bindDeferredEvents();
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

