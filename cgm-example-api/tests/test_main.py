import unittest

import httpx
from fastapi.testclient import TestClient

from main import app
from utilities.status_codes import StatusCodes

client = TestClient(app)


class TestMainMethods(unittest.TestCase):

    def test_get_random_numbers(self):
        amount_of_numbers: int = 25
        response: httpx.Response = client.get("/random-numbers/" + str(amount_of_numbers))
        assert response.status_code == StatusCodes.STATUS_OK.value
        random_numbers: any = response.json()
        assert isinstance(random_numbers, list)
        for number in random_numbers:
            assert isinstance(number, int)
        self.assertEqual(len(random_numbers), amount_of_numbers)

    def test_get_random_numbers_wrong_path_param_type(self):
        wrong_type_parameter: str = "This is not a number :)"
        response: httpx.Response = client.get("/random-numbers/" + wrong_type_parameter)
        assert response.status_code == StatusCodes.STATUS_UNPROCESSABLE_ENTITY.value
