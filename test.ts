const valueTracker = {
  val: null,
  get value() {
    return this.val
  },
  set value(currVal) {
    const prevVal = this.val
    this.val = currVal
    this.valueListener(prevVal, currVal)
  },
  valueListener: null,
  registerNewListener: function (externalListenerFunction) {
    this.valueListener = externalListenerFunction
  }
}

const logChanges = (prevVal, currVal) => console.log(`Prev: ${prevVal}, Curr: ${currVal}`)

valueTracker.registerNewListener(logChanges)

valueTracker.value = 1
valueTracker.value = 5
