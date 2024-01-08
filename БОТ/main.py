import asyncio
import websockets
import re

async def support_bot(websocket):
    greeting = "Привет! Я бот поддержки. Как я могу помочь Вам?"
    await websocket.send(greeting)

    try:
        async for message in websocket:
            problem_keywords = ['помощь', 'регистрация']

            detected_keywords = [keyword for keyword in problem_keywords if re.search(keyword, message, re.IGNORECASE)]

            if detected_keywords:
                solution = generate_solution(detected_keywords)
                await websocket.send(f"Ваш запрос: {', '.join(detected_keywords)}. {solution}")
            else:
                await websocket.send("Не удается распознать запрос.")

    except websockets.exceptions.ConnectionClosedOK:
        print("Соединение закрыто.")

def generate_solution(keywords):
    solutions = {
        'помощь': 'Для более точного понимания обозначений, перейдите по вкладке "Помощь".',
        'регистрация': 'Вам не нужно нигде регистрироваться, сайт предоставляет информацию о погоде всем желающим.'
    }

    solution = ""
    for keyword in keywords:
        solution += solutions.get(keyword, '') + ' '

    return solution.strip()

start_server = websockets.serve(support_bot, "localhost", 1111)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
