import { ScheduleManager } from './modules/data.js'; 
import { UIController } from './main.js';

const initApp = async () => {
    try {
        const scheduleManager = new ScheduleManager();
        await new Promise(resolve => setTimeout(resolve, 300));
        const ui = new UIController(scheduleManager);
        console.log('Application initialized successfully!');
        return { scheduleManager, ui };
    } catch (error) {
        console.error('Error initializing application:', error);
        throw error;
    }
};

initApp()
    .then(app => {
        window.app = app;
    })
    .catch(error => {
        console.error('Failed to initialize application:', error);
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 100px;">
                <h1>Error Loading Application</h1>
                <p>Please try refreshing the page.</p>
            </div>
        `;
    });
    const checkBrowserCompatibility = () => {
    if (!window.localStorage) {
        console.error('LocalStorage is not supported in this browser');
        return false;
    }
    try {
        const testArrow = () => `ES6 is supported`;
        class TestClass {}
        new Promise(resolve => resolve(true));
        return true;
    } catch (error) {
        console.error('ES6+ features are not supported in this browser', error);
        return false;
    }
};

if (!checkBrowserCompatibility()) {
    document.body.innerHTML = `
        <div style="text-align: center; margin-top: 100px;">
            <h1>Browser Not Supported</h1>
            <p>Please use a modern browser to access this application.</p>
        </div>
    `;
}