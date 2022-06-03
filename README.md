# gdoc-fresh
AppScript to auto-populate Google Docs with Created and Last Updated dates

## How to install:
1. Open the Google Doc where you want this script to run
1. Select **Extensions > Apps Script** menu
1. Replace the contents of `Code.gs` with this code and click **Save**
1. In the left side menu, open **Triggers**
1. Create a new trigger which will call function updateFreshness upon event `onOpen`

## How to use:
1. In your doc or template, insert `{datecreated}` and/or `{datemodified}` placeholders where you want the dates inserted.
1. Refresh the page to see the dates auto-populated.
1. On first run, accept permissions to allow the script to run.
1. Future edits to the page will update the "Last Updated" metadata of the document so that subsequent views of the page will see the revised modified date.
1. The modified date will be in the format `YYYY-MM-DD 📅` and will be highlighted grey to discourage editing. Manually changing the date format or removing the calendar icon will stop automatic updates. The calendar icon links to this repo to provide curious readers with context.

## Contributing
[Pull requests](https://github.com/wangela/gdoc-fresh/pulls) welcome!
