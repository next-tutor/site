const hidePanels = function () {
    $(".main-panel .panel").removeClass("show");
}

//-------------------------------------------

const sectionOrder = ["students", "lessons", "tasks", "website", "reports", "settings"];
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
        if ($(this).hasClass("students")) return;
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
    if (sectionName === "students") return;
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
    if (startSection !== "students") return startSection;
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

    $(".main-panel .panel").removeClass("show");
    $(`.sidebar .item`).removeClass("active");
    if (window.students) students.onStudentsPanelHidden();

    if (panelName !== "") {
        $(`.main-panel .panel.${panelName}`).addClass("show");
        $(`.sidebar .item.${panelName}`).addClass("active");
        if (panelName === "students" && window.students) {
            students.onStudentsPanelShown();
        }
        if (panelName !== "students" && !options.fromAutoSwitch) {
            startSectionAutoSwitch(panelName);
        }
    }
}

//-------------------------------------------

const init = function () {
    htmlLoader.load()
        .then(() => {
            ensureSectionIndicators();
            dlg.setDlgEvents();
            sidebar.setSidebarClickEvents();
            lessons.setLessonClickEvents();
            students.setStudentsEvents();

            hidePanels();
            showPanel("students");

            document.addEventListener("tuteePopupOpened", () => {
                stopSectionAutoSwitch();
            });
        });
}

//-------------------------------------------

$(document).ready(function () {
    init();
});

