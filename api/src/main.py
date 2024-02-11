from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/audio")
async def receive_audio(websocket: WebSocket):
    await websocket.accept()
    
    while True:
        data = await websocket.receive_bytes()
        await websocket.send_text(f"Length of bytes was {len(data)}")

@app.websocket("/video")
async def receive_video(websocket: WebSocket):
    await websocket.accept()

    while True:
        data = await websocket.receive_bytes()
        await websocket.send_text(f"Length of bytes was {len(data)}")