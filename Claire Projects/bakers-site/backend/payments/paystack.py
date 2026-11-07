import hashlib
import hmac

import requests
from django.conf import settings

BASE = "https://api.paystack.co"
TIMEOUT = 30


def _headers():
    return {"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"}


def initialize(*, email, amount_kes, reference, callback_url) -> dict:
    resp = requests.post(
        f"{BASE}/transaction/initialize",
        json={
            "email": email,
            "amount": int(amount_kes) * 100,
            "currency": "KES",
            "reference": reference,
            "callback_url": callback_url,
        },
        headers=_headers(),
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json()["data"]


def verify(reference: str) -> dict:
    resp = requests.get(
        f"{BASE}/transaction/verify/{reference}", headers=_headers(), timeout=TIMEOUT
    )
    resp.raise_for_status()
    return resp.json()["data"]


def valid_signature(raw_body: bytes, signature: str) -> bool:
    expected = hmac.new(
        settings.PAYSTACK_SECRET_KEY.encode(), raw_body, hashlib.sha512
    ).hexdigest()
    return hmac.compare_digest(expected, signature or "")