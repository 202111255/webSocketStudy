let stompClient = null;


// WebSocket 연결 함수
function connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/chat');  // WebSocket 엔드포인트
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function(messageOutput) {
            showMessage(messageOutput.body);
        });
    });
}

// 메시지 전송 함수
function sendMessage() {
    const message = document.getElementById('messageInput').value;
    
    // REST API를 통해 메시지 전송
    fetch('http://localhost:8080/api/chat/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then(response => response.json())
      .then(data => console.log('Message sent:', data))
      .catch(error => console.error('Error:', error));

    document.getElementById('messageInput').value = '';
}

// 메시지 화면에 표시 함수
function showMessage(message) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
}

// WebSocket 연결 시작
connectWebSocket();
