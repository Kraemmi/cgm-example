import random

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/random-numbers/{amount_of_numbers}")
def get_random_numbers(amount_of_numbers: int) -> list[int]:
    # we don't want more than 100 numbers that can be retrieved in one request
    if amount_of_numbers > 100:
        amount_of_numbers = 100
    return [random.randint(1, 100) for x in range(amount_of_numbers)]
