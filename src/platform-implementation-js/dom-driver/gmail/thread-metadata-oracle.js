var threadMetadataOracle = {
  getThreadIdForThreadRow: function(threadRow) {
    var threadid = threadRow.getAttribute('data-inboxsdk-threadid');
    if (!threadid) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('inboxSDKtellMeThisThreadId', true, false, null);
      threadRow.dispatchEvent(event);
      threadid = threadRow.getAttribute('data-inboxsdk-threadid');
    }
    return threadid;
  },

  getCurrentThreadID: function(threadContainerElement){
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('inboxSDKtellMeCurrentThreadId', true, false, null);
    threadContainerElement.dispatchEvent(event);
    return threadContainerElement.getAttribute('data-inboxsdk-currentthreadid');
  }
};

module.exports = threadMetadataOracle;
