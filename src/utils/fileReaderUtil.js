/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  Drop event saves document
  FileReader reads file and puts result on reader.result
  Once FileReader finishes, reader.result is mapped
  newCards array: each item (card) is array with three items (front and back and id)
  Add newCards to current cards
  Put cards on Redux state with action creator
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export function fileReaderUtil(e) {
  e.preventDefault();

  var file = e.dataTransfer.files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  
  return reader.onload = () => {
    return reader.result.split('\r').map((card, index) => {
      return card.split(/,(.+)/).filter(side => side);
    }).filter(card => card.length === 2);
  }
}