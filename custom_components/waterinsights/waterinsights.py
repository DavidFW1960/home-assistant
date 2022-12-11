import logging
import time
import base64
from typing import Any
import requests

_APINSW_BASE_URL = "https://api.onegov.nsw.gov.au"

log = logging.getLogger(__name__)


class WaterInsightsClient:
    def __init__(
        self, api_key: str, api_secret: str, base_url: str = _APINSW_BASE_URL
    ) -> None:
        self._base_url = base_url
        self._api_key = api_key
        self._api_secret = api_secret
        self._access_token = None
        self._access_token_expires_at = None  # Epoch timestamp in milliseconds

    def get_latest_dam_resources(self, dam_id: str) -> Any:
        """For a dam identified by dam_id, returns the current month's accessible volume in megalitres,
        the accessible volume as a percentage of maximum accessible volume and the volume flowing into
        and released from the dam. A month in a date field is denoted by a date of the first day of the month."""

        self._check_auth_token()
        response = requests.get(
            f"{self._base_url}/waternsw-waterinsights/v1/dams/{dam_id}/resources/latest",
            headers={
                "accept": "application/json",
                "Authorization": f"Bearer {self._access_token}",
                "apikey": self._api_key,
                "User-Agent": "",
            },
        )
        json_response = response.json()

        if not response.ok:
            self._handle_error(response.status_code, json_response)

        return json_response["dams"][0]

    def _check_auth_token(self):
        """Check if access token has expired and retrieve a new one if so"""
        current_time_milliseconds = (
            time.time_ns() / 1000 / 1000
        )  # Nanoseconds to milliseconds
        if (
            not self._access_token_expires_at
            or current_time_milliseconds >= self._access_token_expires_at
            or self._access_token is None
        ):
            log.info(
                "Access token does not exist or has expired. Requesting a new one."
            )
            response = requests.get(
                f"{self._base_url}/oauth/client_credential/accesstoken",
                params={"grant_type": "client_credentials"},
                headers={
                    "accept": "application/json",
                    "Authorization": self._build_api_authorisation(
                        self._api_key, self._api_secret
                    ),
                },
            )
            json_response = response.json()

            if not response.ok:
                self._handle_error(response.status_code, json_response)

            self._access_token = json_response["access_token"]
            self._access_token_expires_at = int(json_response["issued_at"]) + (
                int(json_response["expires_in"]) * 1000
            )  # expires_in field is in seconds

    def _build_api_authorisation(self, api_key: str, api_secret: str) -> str:
        result = f"{api_key}:{api_secret}"
        result = base64.b64encode(result.encode("utf-8"))
        result = str(result, "utf-8")
        result = f"Basic {result}"
        return result

    def _handle_error(self, status_code: int, json_response: dict):
        raise Exception(
            f"Error retrieving data from WaterInsights - {status_code} {json_response['ErrorCode']}: {json_response['Error']}"
        )
