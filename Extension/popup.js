document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('enableToggle');

    // Load saved state
    // Default to true (enabled) if no state is found
    chrome.storage.sync.get(['isEnabled'], (result) => {
        toggleSwitch.checked = result.isEnabled !== undefined ? result.isEnabled : true;
    });

    // Save state on change
    toggleSwitch.addEventListener('change', () => {
        chrome.storage.sync.set({ isEnabled: toggleSwitch.checked });
        // Content script will react to this change via chrome.storage.onChanged
    });
});