class BusinessError extends Error {
  /**
   * API 상에서 발생한 에러
   * @param {Object} info
   * @param {Number} info.status Http status code
   * @param {String} info.code Error code
   * @param {String} info.message Error message
   * @param {Array} reasons Specific reasons that clients can read
   */
  constructor({ status, code, message }, reasons) {
    super(message);
    this.status = status;
    this.code = code;
    if (reasons && Array.isArray(reasons)) {
      this.reasons = reasons;
    }
  }
}

module.exports = BusinessError;
