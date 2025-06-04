const TARGET_ELEMENT_ID = 'm365-support-central-container';
const URL_KEYWORD = 'microsoft';

let extensionIsEnabled = true; // Default, will be updated from storage

function removeHelpElement() {
    if (extensionIsEnabled && window.location.href.toLowerCase().includes(URL_KEYWORD)) {
        const element = document.getElementById(TARGET_ELEMENT_ID);
        if (element) {
            element.remove();
            // console.log(`[Help Remover] Removed element: ${TARGET_ELEMENT_ID}`);
        }
    }
}

// Observer to watch for dynamic additions of the element
const observer = new MutationObserver((mutationsList, obs) => {
    if (extensionIsEnabled && window.location.href.toLowerCase().includes(URL_KEYWORD)) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if the target element or its potential parents were added
                if (document.getElementById(TARGET_ELEMENT_ID)) {
                    removeHelpElement(); // Attempt removal again
                } else { // Check added nodes more thoroughly
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.id === TARGET_ELEMENT_ID) {
                                removeHelpElement();
                            } else if (node.querySelector && node.querySelector(`#${TARGET_ELEMENT_ID}`)) {
                                removeHelpElement();
                            }
                        }
                    });
                }
            }
        }
    }
});

function startObserving() {
    if (window.location.href.toLowerCase().includes(URL_KEYWORD)) {
        removeHelpElement(); // Initial attempt on load
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        // console.log("[Help Remover] Observer started.");
    }
}

function stopObserving() {
    observer.disconnect();
    // console.log("[Help Remover] Observer stopped.");
}

// Load initial state from storage
chrome.storage.sync.get(['isEnabled'], (result) => {
    extensionIsEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
    if (extensionIsEnabled) {
        startObserving();
    }
});

// Listen for changes in storage (e.g., when the popup toggle is changed)
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.isEnabled) {
        const wasEnabled = extensionIsEnabled;
        extensionIsEnabled = changes.isEnabled.newValue;

        if (extensionIsEnabled && !wasEnabled) {
            startObserving(); // If it was just enabled, start observing and try to remove
        } else if (!extensionIsEnabled && wasEnabled) {
            stopObserving(); // If it was just disabled, stop observing
        } else if (extensionIsEnabled && wasEnabled) {
            // If it was already enabled and setting is re-applied (e.g. from another sync instance)
            // ensure observer is running and attempt removal just in case.
            stopObserving(); // Stop to avoid multiple observers
            startObserving();
        }
    }
});

// Fallback for scripts that run very early, ensure DOM is ready for initial check
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        if(extensionIsEnabled) startObserving();
    });
} else { // `DOMContentLoaded` already fired or `document_idle`
    if(extensionIsEnabled) startObserving();
}