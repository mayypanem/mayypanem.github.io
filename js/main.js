let channels = [];
let messages = [];
let selectedChannel;

function showHeader() {
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    document.getElementById('favoriteIcon').innerHTML = (selectedChannel.favorite ? "favorite" : "favorite_border");
}

function sendMessage() {
    let messageText = document.getElementById('message-input').value;
    console.log(messageText);
    let messageString = '<div class="message outgoing"><div class="message-wrapper"><div class="message-content"><div class="message-username">Hermione Granger</div>' + messageText + '</div><i class="material-icons">account_circle</i></div><span class="message-timestamp">11\:49</span></div > ';
    document.getElementById('chat-area').innerHTML = messageString;
    document.getElementById('message-input').value = "";
}

function init() {
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    //loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    //document
    //    .getElementById("emoticon-button")
    //    .addEventListener("click", toggleEmojiArea);
    //document
    //    .getElementById("close-emoticon-button")
    //    .addEventListener("click", toggleEmojiArea);
}

function getChannels() {
    channels = mockChannels;
}

function getMessages() {
    messages = mockMessages;
}

function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";

    channels.forEach((channel) => {
        const currentChannelHtmlString =
            `<li id="` +
            channel.id +
            `"onclick="switchChannel(this.id)">
                                                  <i class="material-icons">group</i>
                                                  <span class="channel-name">` +
            channel.name +
            `</span>
                                                  <span class="timestamp">` +
            channel.latestMessage +
            `</span>
                                                  </li>`;
        if (channel.favorite) {
            favoriteList.innerHTML += currentChannelHtmlString;
        } else {
            regularList.innerHTML += currentChannelHtmlString;
        }
    });
}

function loadMessagesIntoChannel() {
    channels.forEach((channel) => {
        messages.forEach((message) => {
            if (message.channel === channel.id) {
                channel.messages.push(message);
            }
        });
    });
}

function switchChannel(selectedChannelID) {
    console.log("ID of selected channel: " + selectedChannelID);
    console.log(!!selectedChannel);
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.remove("selected");
    }
    document.getElementById(selectedChannelID).classList.add("selected");
    channels.forEach((channel) => {
        if (channel.id === selectedChannelID) {
          selectedChannel = channel;
        }
      });
      showHeader();
      showMessages();
}

/**
 * @param {string} user - name of user
 * @param {boolean} own - is user me?
 * @param {string} text - message content
 * @param {string} channelID - where was message sent
 */
function Message(user, own, text, channelID) {
    this.createdBy = user;
    this.createdOn = new Date(Date.now());
    this.own = own;
    this.text = text;
    this.channelID = channelID;
}

function sendMessage() {
    const text = document.getElementById("message-input").value;
    if (!!text) {
      const myUserName = "Hermione Granger";
      const own = true;
      const channelID = selectedChannel.id;
      const message = new Message(myUserName, own, text, channelID);
      console.log("New message: ", message);
      selectedChannel.messages.push(message);
      selectedChannel.latestMessage = "" + message.createdOn.toLocaleTimeString("de-DE", {hour: "numeric", minute: "numeric"});
      document.getElementById("message-input").value = "";
      showMessages();
      displayChannels();
    } else {
      return;
    }
  }

  function showMessages() {
    const messageList = document.getElementById('chat-area');
    messageList.innerHTML = "";
    selectedChannel.messages.forEach((message) => {
        const messageTime = message.createdOn.toLocaleTimeString("de-DE", {
            hour: "numeric",
            minute: "numeric"
        });
        const currentMessageHtmlString = (message.own) ? (
            `<div class="message outgoing">
                <div class="message-wrapper">
                    <div class="message-content">
                        <div class="message-username">`
                            + message.createdBy + 
                        `</div>`
                        + message.text + 
                    `</div>
                    <i class="material-icons">account_circle</i>
                </div>
                <span class="message-timestamp">` + messageTime +`</span>
            </div>`
        ) : (
            `<div class="message incoming">
                <div class="message-wrapper">
                    <i class="material-icons">account_circle</i>
                    <div class="message-content">
                        <div class="message-username">`
                            + message.createdBy + 
                        `</div>`
                        + message.text + 
                    `</div>
                </div>
                <span class="message-timestamp">` + messageTime +`</span>
            </div>`
        );
        messageList.innerHTML += currentMessageHtmlString;
    });
  }