
function postGroupsDataToSheet() {
    const sheetName = getProperty("sheetName")
    clearSheet(sheetName);
    const groups = getGroupsData();
    const table = createTable(groups);
    const range = createRange(sheetName, table);
}
/**
 * Updates the ADMINDATA sheet
 * with fresh data from G Suite
 * @returns undefined
 */
function updateSheetAdminData() {
    const sheetName = "ADMINDATA";
    clearSheet(sheetName);
    const admins = getAdminsData();
    const table = createTable(admins);
    const range = createRange(sheetName, table);
}
/**
 * Return the Spreadsheet
 */
function getSpreadsheet() {
    const sheetId = getProperty("sheetId")
    const ss = SpreadsheetApp.openById(sheetId);
    return ss;
}
/**
 * Clears all the data in a sheet
 * @param {string} sheetName - The name of the Sheet to clear
 * @returns undefined
 */
function clearSheet(sheetName) {
    const sheet = getSpreadsheet().getSheetByName(sheetName);
    // const sheet = ss.getSheetByName(sheetName);
    sheet.clear();
}
/**
 * Returns an array shaped like a table
 * by transforming an index of key/value pairs
 * @param {Object} object - indexed list of key/value pair
 * @returns {Array} - Header row of keys and rows of paired values 
 */
function createTable(object) {
    const data = Object.values(object);
    const header = Object.keys(data[0]);
    const rows = Object.keys(data).map(k => data[k]).map(v => Object.values(v));
    return [header, ...rows];
}
/**
 * Sets the range of a named sheet
 * using a table's data and shape
 * @param {string} sheetName - The name of the sheet
 * @param {Array} table - Header row of keys and rows of paired values
 * @returns undefined
 */
function createRange(sheetName, table) {
    const rowCount = (table.length);
    const colCount = table[0].length;
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    sheet.getRange(1, 1, rowCount, colCount).setValues(table);
}
/**
 * Returns an Range Object used to read/write all of a sheet's values
 * @param {string} sheetName - The name of the sheet
 * @returns {DataRange} - Returns a Range corresponding to the dimensions in which data is present.
 */
// function getRangeFromSheet(sheetName) {
//     const ss = getSpreadsheet();
//     const sheet = ss.getSheetByName(sheetName);
//     const dataRange = sheet.getDataRange();
//     return dataRange;
// }

