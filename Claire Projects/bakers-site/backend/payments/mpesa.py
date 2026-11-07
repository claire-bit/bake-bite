import base64
import re
from datetime import datetime

import requests
from django.conf import settings
from django.core.cache import cache

TIMEOUT = 30


def _base_url():
    if settings.MPESA_ENV == "production":
        return "https://api.safaricom.co.ke"
    return "https://sandbox.safaricom.co.ke"


def normalize_phone(raw: str) -> str:
    digits = re.sub(r"\D", "", raw or "")
    if digits.startswith("0") and len(digits) == 10:
        digits = "254" + digits[1:]
    elif len(digits) == 9 and digits[0] in "17":
        digits = "254" + digits
    if not re.fullmatch(r"254[17]\d{8}", digits):
        raise ValueError("Enter a valid Safaricom number, e.g. 0712345678")
    return digits


def _access_token() -> str:
    token = cache.get("mpesa_access_token")
    if token:
        return token
    resp = requests.get(
        f"{_base_url()}/oauth/v1/generate?grant_type=client_credentials",
        auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    token = resp.json()["access_token"]
    cache.set("mpesa_access_token", token, 3000)
    return token


def _password(timestamp: str) -> str:
    raw = f"{settings.MPESA_SHORTCODE}{settings.MPESA_PASSKEY}{timestamp}"
    return base64.b64encode(raw.encode()).decode()


def _headers():
    return {"Authorization": f"Bearer {_access_token()}"}


def stk_push(*, phone, amount, reference, description, callback_url) -> dict:
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": _password(timestamp),
        "Timestamp": timestamp,
        "TransactionType": settings.MPESA_TRANSACTION_TYPE,
        "Amount": int(amount),
        "PartyA": phone,
        "PartyB": settings.MPESA_PARTY_B,
        "PhoneNumber": phone,
        "CallBackURL": callback_url,
        "AccountReference": reference[:12],
        "TransactionDesc": description[:13],
    }
    resp = requests.post(
        f"{_base_url()}/mpesa/stkpush/v1/processrequest",
        json=payload,
        headers=_headers(),
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()


def query_status(checkout_request_id: str) -> dict:
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": _password(timestamp),
        "Timestamp": timestamp,
        "CheckoutRequestID": checkout_request_id,
    }
    resp = requests.post(
        f"{_base_url()}/mpesa/stkpushquery/v1/query",
        json=payload,
        headers=_headers(),
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()