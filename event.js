const { EventEmitter } = require("node:events");

function createNewsFeed() {
    const emitter = new EventEmitter();

    setInterval(() => {
        emitter.emit("newsEvent", "News: A thing happened in a place.");
    }, 1000);

    setInterval(() => {
        emitter.emit("breakingNews", "Breaking news! A BIG thing happened.");
    }, 4000);

    setTimeout(() => {
        emitter.emit("error", new Error("News feed connection error"));
    }, 5000);

    return emitter;
}

const newsFeed = createNewsFeed();


function handleNewsEvent(news) {
    console.log("Received news:", news);
}


function handleBreakingNews(news) {
    console.log("Received breaking news:", news);
}


function handleError(error) {
    console.error("An error occurred:", error.message);
}


newsFeed.on("newsEvent", handleNewsEvent);
newsFeed.on("breakingNews", handleBreakingNews);
newsFeed.on("error", handleError);

console.log("Listeners connected. Waiting for events...");


setTimeout(() => {
    console.log("Disconnecting listeners...");
    newsFeed.removeListener("newsEvent", handleNewsEvent);
    newsFeed.removeListener("breakingNews", handleBreakingNews);
    newsFeed.removeListener("error", handleError);
    console.log("Listeners disconnected.");
}, 10000);