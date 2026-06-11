/**
 * DO NOT DELETE THIS FILE
 * Google Apps Script to handle feedback submissions.
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste this code into the editor.
 * 4. Save the project.
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type: "Web app".
 * 7. Description: "Feedback Widget API".
 * 8. Execute as: "Me" (your email).
 * 9. Who has access: "Anyone" (IMPORTANT).
 * 10. Click "Deploy" and copy the "Web app URL".
 */


function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getSheetByName('Feedback') || doc.insertSheet('Feedback');

        // Add headers if they don't exist
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Timestamp', 'Page URL', 'Vote', 'Comment', 'User Agent']);
        }

        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const nextRow = sheet.getLastRow() + 1;

        // Parse the request body
        const data = JSON.parse(e.postData.contents);

        // Prefix values starting with formula characters to prevent formula injection
        function sanitize(value) {
            const str = String(value || '');
            return /^[=+\-@\t\r]/.test(str) ? "'" + str : str;
        }

        const newRow = [
            new Date(),
            sanitize(data.url || 'Unknown'),
            sanitize(data.vote || 'Unknown'),
            sanitize(data.comment || ''),
            sanitize(data.userAgent || '')
        ];

        sheet.appendRow(newRow);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

// Handle CORS preflight requests
function doOptions(e) {
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.JSON)
        .appendHeader("Access-Control-Allow-Origin", "*")
        .appendHeader("Access-Control-Allow-Methods", "POST")
        .appendHeader("Access-Control-Allow-Headers", "Content-Type");
}
