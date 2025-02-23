async function sayHello() {
  console.log("what");
  let [tab] = await chrome.tabs.query({ active: true });
  if (!tab) {
    console.error("No active tab found");
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hello from my extension!");
    },
  });
}
document.getElementById("myButton").addEventListener("click", sayHello);
