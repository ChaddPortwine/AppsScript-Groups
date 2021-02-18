function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu('Jahnel Group')
        .addItem('Refresh Groups', 'updateSheet')
        .addToUi();
  }
  