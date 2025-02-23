async function sayHello() {
  console.log("what");
  // Notice: We should not use this!
  // let [tab] = await chrome.tabs.query({ active: true });
  // Instead, we should use this below!
  let currentWindow = await chrome.windows.getCurrent();
  let [tab] = await chrome.tabs.query({ active: true, windowId: currentWindow.id });
  if (!tab) {
    console.error("No active tab found");
    return;
  }
  console.log(tab.id);
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hello from My Extension!");
      console.log("Hello from My Extension!");
      return document.title;
    },
  });
  console.log(results[0].result);
}
document.getElementById("myButton").addEventListener("click", sayHello);