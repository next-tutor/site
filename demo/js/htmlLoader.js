const htmlLoader = (function () {

    const criticalFiles = [
        { id: 'sidebar', file: './html/sidebar.html' },
        { id: 'tutees', file: './html/tutees.html' },
        { id: 'tutee-popup-dlg', file: './html/tutee-popup-dlg.html' },
    ];

    const deferredFiles = [
        { id: 'lessons', file: './html/lessons.html' },
        { id: 'tasks', file: './html/tasks.html' },
        { id: 'incomes', file: './html/incomes.html' },
        { id: 'income-dlg', file: './html/income-dlg.html' },
        { id: 'past-lesson-dlg', file: './html/past-lesson-dlg.html' },
        { id: 'task-popup-dlg', file: './html/task-popup-dlg.html' },
    ];

    let deferredPromise = null;

    //---------------------------------------------------

    const loadHtmlIntoElement = function (elementId, filePath) {
        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(html => {
                const el = document.getElementById(elementId);
                if (!el) {
                    console.warn(`htmlLoader: element #${elementId} not found`);
                    return html;
                }
                el.innerHTML = html;
                return html;
            });
    };

    const loadBatch = function (items) {
        return Promise.all(
            items.map(item => loadHtmlIntoElement(item.id, item.file))
        );
    };

    const scheduleDeferred = function () {
        if (deferredPromise) return deferredPromise;

        const run = () => loadBatch(deferredFiles);

        deferredPromise = new Promise(resolve => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => run().then(resolve), { timeout: 2000 });
            } else {
                setTimeout(() => run().then(resolve), 0);
            }
        });

        return deferredPromise;
    };

    //-----------------------------------------------------

    const loadCritical = function () {
        return loadBatch(criticalFiles);
    };

    const loadDeferred = function () {
        return scheduleDeferred();
    };

    const load = function () {
        return loadCritical().then(() => scheduleDeferred());
    };

    return {
        load,
        loadCritical,
        loadDeferred,
    };
})();
