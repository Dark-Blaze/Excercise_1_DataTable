function Pager(pageSize, length) {
  this.pageSize = pageSize;
  this.length = length;
}

Pager.prototype.isFirstPage = function(si) {
  return this.pageSize - si <= this.pageSize;
};

Pager.prototype.isFirstRow = function(si) {
  return si <= 0;
};

Pager.prototype.isLastPage = function(si, li) {
  return si >= li || li == (this.length) || si == (this.length - 1) ;
};

Pager.prototype.isLastRow = function(li) {
  return li >= this.length;
};

Pager.prototype.getLastPage = function() {
  return [this.length - this.pageSize, this.length];
};

Pager.prototype.getFirstPage = function() {
  return [0, this.length];
};

Pager.prototype.shiftWindowRight = function(si, li) {
  return [++si, ++li];
};
Pager.prototype.shiftWindowLeft = function(si, li) {
  return [--si, --li];
};

Pager.prototype.getStartIndex = () => {
  return this.startIndex;
};

Pager.prototype.getLastIndex = () => {
  return this.lastIndex;
};

Pager.prototype.getPageSize = () => {
  return this.pageSize;
};

Pager.prototype.getNextPage = function(si, li) {
  if (this.isLastPage(si, li)) {
    return [si, li];
  }
  si += this.pageSize;
  li += this.pageSize;
  return [si, li];
};

Pager.prototype.getNextRow = function(si, li) {
  if (this.isLastRow(li)) {
    return this.getLastPage();
  }
  return this.shiftWindowRight(si, li);
};

Pager.prototype.getPreviousRow = function(si, li) {
  if (this.isFirstRow(si)) {
    return this.getFirstPage();
  }
  return this.shiftWindowLeft(si, li);
};

Pager.prototype.getPreviousPage = function(si, li) {
  if (!this.isFirstRow(si)) {
    if (si - this.pageSize <= 0) {
      si = 0;
    } else {
      si -= this.pageSize;
    }
    li -= this.pageSize;
  }
  return [si, li];
};

Pager.prototype.setPageSize = function(size) {
  this.pageSize = parseInt(size);
};

Pager.prototype.getPageByStartRow = function(si, li, val) {
  si = parseInt(val);
  if (this.length - si < this.pageSize) {
    this.pageSize = this.length - si;
  }
  li = si + this.pageSize;
  return [si, li, this.pageSize];
};

module.exports = Pager;
