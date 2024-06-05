class RetryManager {
  constructor() {
    this.maxAttempts_ = 1;
    this.delayFactor_ = 0.1;
    this.fuzzFactor_ = 0.1;
    this.initialDelay_ = 1000;
  }

  getMaxAttempts() {
    return this.maxAttempts_;
  }

  setMaxAttempts(maxAttempts) {
    this.maxAttempts_ = maxAttempts;
  }

  getDelayFactor() {
    return this.delayFactor_;
  }

  setDelayFactor(delayFactor) {
    this.delayFactor_ = delayFactor;
  }

  getFuzzFactor() {
    return this.fuzzFactor_;
  }

  setFuzzFactor(fuzzFactor) {
    this.fuzzFactor_ = fuzzFactor;
  }

  getInitialDelay() {
    return this.initialDelay_;
  }

  setInitialDelay(initialDelay) {
    this.initialDelay_ = initialDelay;
  }

  createRetry() {
    return new RetryManager({
      maxAttempts: this.maxAttempts_,
      delayFactor: this.delayFactor_,
      fuzzFactor: this.fuzzFactor_,
      initialDelay: this.initialDelay_,
    });
  }
}

class Retry {
  constructor(options) {
    this.maxAttempts_ = options.maxAttempts;
    this.delayFactor_ = options.delayFactor;
    this.fuzzFactor_ = options.fuzzFactor;
    this.currentDelay_ = options.initialDelay;

    this.currentAttempt_ = 1;
  }

  moveToNextAttempt() {
    this.currentAttempt_++;
    const delayDelta = this.currentDelay_ * this.delayFactor_;
    this.currentDelay_ = this.currentDelay_ + delayDelta;
  }

  shouldRetry() {
    return this.currentAttempt_ < this.maxAttempts_;
  }

  getCurrentDelay() {
    return this.currentDelay_;
  }

  /**
   * For example fuzzFactor is 0.1
   * This means ±10% deviation
   * So if we have delay as 1000
   * This function can generate any value from 900 to 1100
   * @private
   */
  getCurrentFuzzedDelay() {
    const lowValue = (1 - this.fuzzFactor_) * this.currentDelay_;
    const highValue = (1 + this.fuzzFactor_) * this.currentDelay_;

    return lowValue + Math.random() * (highValue - lowValue);
  }
}

module.exports = RetryManager;
