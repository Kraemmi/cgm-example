import random

from fastapi import FastAPI

app = FastAPI()


@app.get("/random-numbers/{amount_of_numbers}")
def get_random_numbers(amount_of_numbers: int = 5) -> list[int]:
    # we don't want more than 100 numbers that can be retrieved in one request
    if amount_of_numbers > 100:
        amount_of_numbers = 100
    return [random.randint(1, 100) for x in range(amount_of_numbers)]
