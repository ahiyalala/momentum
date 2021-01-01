Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

Date.prototype.addMinutes = function (m) {
  this.setTime(this.getTime() + m * 60 * 1000);
  return this;
};

Date.prototype.addSeconds = function (s) {
  this.setTime(this.getTime() + s * 1000);
  return this;
};

Date.prototype.subtractHours = function (h) {
  this.setTime(this.getTime() - h * 60 * 60 * 1000);
  return this;
};

Date.prototype.subtractMinutes = function (m) {
  this.setTime(this.getTime() - m * 60 * 1000);
  return this;
};

Date.prototype.subtractSeconds = function (s) {
  this.setTime(this.getTime() - s * 1000);
  return this;
};
