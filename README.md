# Microsoft "Need Help?" Remover Chrome Extension

A simple Chrome extension to remove the "Need help?" floating widget (specifically the element with ID `m365-support-central-container`) from web pages where the URL contains "microsoft".

**Chrome Web Store Link:** [Link to be added once published]

## Features

*   **Automatic Removal:** Hides the "Need help?" widget on pages under Microsoft domains.
*   **URL Targeting:** Only activates on URLs containing the keyword "microsoft".
*   **On/Off Toggle:** Easily enable or disable the extension's functionality via a popup accessed by clicking the extension icon.
*   **Dynamic Content Handling:** Uses a `MutationObserver` to remove the widget even if it's added to the page dynamically after the initial load.
*   **Lightweight:** Built with vanilla HTML5, CSS, and JavaScript. No external libraries.
*   **Privacy-Focused:** Does not log any data or track your activity.

## Installation

### Option 1: From the Chrome Web Store (Recommended)

1.  Go to the [Microsoft "Need Help?" Remover extension page on the Chrome Web Store]([Link to be added once published]).
2.  Click "Add to Chrome".

### Option 2: Manual Installation (For Development or if not on Web Store)

1.  **Download or Clone:**
    *   Download the ZIP of this repository and unzip it.
    *   Or, clone the repository: `git clone https://github.com/your-username/your-repository-name.git`
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** Ensure the "Developer mode" toggle (usually in the top-right corner) is switched on.
4.  **Load Unpacked:** Click the "Load unpacked" button.
5.  **Select Folder:** Navigate to the directory where you unzipped or cloned the extension files (the folder containing `manifest.json`) and select it.

The extension icon should now appear in your Chrome toolbar.

## Usage

1.  **Automatic Operation:** Once installed and enabled, the extension will automatically remove the "Need help?" widget on relevant Microsoft pages.
2.  **Toggle On/Off:**
    *   Click the extension icon in your Chrome toolbar.
    *   A small popup will appear with an on/off toggle switch.
    *   Use the switch to enable or disable the widget removal functionality. The change takes effect immediately (you may need to refresh the page if the widget was already removed or present).
    *   The extension remembers your preference.

## How It Works

The extension consists of:

*   **`manifest.json`**: Defines the extension's properties, permissions, and scripts.
*   **`content.js`**: This script is injected into web pages. It checks if the current URL contains "microsoft". If so, and if the extension is enabled, it looks for the HTML element with the ID `m365-support-central-container` and removes it. It also uses a `MutationObserver` to handle elements added dynamically.
*   **`popup.html` & `popup.js`**: Provide the user interface for the on/off toggle and manage its state using `chrome.storage.sync`.
*   **Icons**: Basic icons for the extension.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/your-username/your-repository-name/issues) if you want to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (you may want to add a simple MIT license file to your repository).

---
