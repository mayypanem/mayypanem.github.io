console.log('App is alive');

let selectedChannel = channel1;

function switchChannel(channel) {
    console.log(channel.name);
    document.getElementById(selectedChannel.id).classList.remove("selected");
    document.getElementById(channel.id).classList.add("selected");
    selectedChannel = channel;
    showHeader();
}

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