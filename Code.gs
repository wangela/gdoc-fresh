/**
 * github.com/wangela/gdoc-fresh
 * An AppScript for automatically populating Google Docs with the document's 
 * metadata for Created and Last Updated dates
 * 
 * How to use:
 *     1. Open the doc you want this script to run in
 *     2. Tools > Script editor menu
 *     3. Replace the contents of Code.gs with this code and Save
 *     4. In the left side menu, open Triggers
 *     5. Create a new trigger which will call function updateFreshness upon 
 *        event onOpen
 *     6. In your doc or template, insert "{datecreated}" and/or "{datemodified}" and/or "{dateupdated}"
 *        placeholders where you want the dates inserted
 *     7. Refresh the page to see the dates auto-populated
 *     8. On first run, accept permissions to allow the script to run
 */
const DATE_FORMAT = 'yyyy-MM-dd';
const BACKGROUND = '#DDDDDD';
const SOURCE_URL = 'https://github.com/wangela/gdoc-fresh';

/**
 * Inserts or updates the document freshness status.
 * First use: Place the strings "{datecreated}" or "{datemodified}" 
 *     wherever you want dates placed in the doc
 * Subsequent uses: Open or refresh the doc. As long as the Modified date is 
 *     followed by a 📅, the Modified date will be updated according to the 
 *     document's "Last Updated" date.
 * Example: 'Created: {datecreated}' becomes 'Created: 2020-10-02'
 * Example: 'Updated: {datemodified}' becomes "Updated: 2020-10-05 📅''
 */
function updateFreshness() {
  let document = DocumentApp.getActiveDocument();
  let file = DriveApp.getFileById(DocumentApp.getActiveDocument().getId());
  let body = document.getBody();
  let dateCreated = file.getDateCreated(), dateModified = file.getLastUpdated();
  let newDate = formatDate(dateModified) + ' 📅';

  body.replaceText('{datecreated}', formatDate(dateCreated));
  body.replaceText('{datemodified}', newDate);
  body.replaceText('{dateupdated}', newDate);
  body.replaceText('\\d{4}\\-\\d{2}\\-\\d{2}\\s?📅', newDate);

  // Highlight the modified date grey to discourage manual editing of the date
  let searchResult = body.findText(newDate);
  while (searchResult !== null) {
    let thisElement = searchResult.getElement();
    let thisElementText = thisElement.asText();

    thisElementText.setBackgroundColor(
      searchResult.getStartOffset(), 
      searchResult.getEndOffsetInclusive(),
      BACKGROUND
    );

    // search for next match
    searchResult = body.findText(newDate, searchResult);
  }

  // Link the calendar icon to this documentation
  let calIconSearchResult = body.findText('📅');
  let calIconText= calIconSearchResult.getElement().asText();
  calIconText.setLinkUrl(
    calIconSearchResult.getStartOffset(),
    calIconSearchResult.getEndOffsetInclusive(),
    SOURCE_URL
  );
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), DATE_FORMAT);
}