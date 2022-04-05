var strs = ["String 1", "String 2", "String 3"];
var list = document.createElement("ul");
for (var i in strs) {
  var anchor = document.createElement("a");
  anchor.href = "#";
  anchor.innerText = strs[i];

  var elem = document.createElement("li");
  elem.appendChild(anchor);
  list.appendChild(elem);
}
