import asyncio
import websockets
import re

async def support_bot(websocket, path):
    greeting = "Привет! Я бот поддержки. Как я могу помочь вам сегодня?"
    await websocket.send(greeting)

    try:
        async for message in websocket:
            # Распознавание ключевых слов
            problem_keywords = ['login', 'авторизация', 'sign in', 'регистрация', 'создание записи']

            # Поиск ключевых слов в сообщении
            detected_keywords = [keyword for keyword in problem_keywords if re.search(keyword, message, re.IGNORECASE)]

            if detected_keywords:
                # Определение решения на основе обнаруженных ключевых слов
                solution = generate_solution(detected_keywords)
                await websocket.send(f"Вы обнаружили проблему в области: {', '.join(detected_keywords)}. {solution}")
            else:
                # Ответ по умолчанию, если ключевые слова не обнаружены
                await websocket.send("Не могу распознать ваш запрос. Пожалуйста, уточните вашу проблему.")

    except websockets.exceptions.ConnectionClosedOK:
        print("Соединение закрыто.")

def generate_solution(keywords):
    # Генерация фиктивного решения на основе ключевых слов
    solutions = {
        'login': 'Для решения проблем с авторизацией, попробуйте очистить кэш браузера и повторно войти.',
        'регистрация': 'Если у вас проблемы с регистрацией, убедитесь, что вы вводите корректные данные и попробуйте еще раз.'
        # Добавьте другие ключевые слова и соответствующие решения
    }

    solution = ""
    for keyword in keywords:
        solution += solutions.get(keyword, '') + ' '

    return solution.strip()

start_server = websockets.serve(support_bot, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
