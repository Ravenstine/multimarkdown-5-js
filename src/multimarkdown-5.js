// libMultiMarkdown gets prepended here

var MultiMarkdown    = {
  render: function(string){
    return Module.cwrap('markdown_to_string', 'string', ['string', 'number', 'number'])(string, 0, 1);
  },
  mmd_version: Module.cwrap('mmd_version', 'string', [])
};

if (typeof module != 'undefined' && module.exports) {
  module.exports       = MultiMarkdown;
} else {
  window.MultiMarkdown = MultiMarkdown;
}
