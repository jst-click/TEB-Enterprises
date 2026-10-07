"""Live Google Business Profile details via Places API (+ seed fallback)."""

from __future__ import annotations

import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from fastapi import APIRouter, HTTPException, Query, Response

from ..config import settings

router = APIRouter(prefix="/api/gmb", tags=["gmb"])

# Knowledge-graph / share link for this business
GMB_SHARE_URL = "https://share.google/eW8mqyNEjn8Ke8QPs"
GMB_KGMID = "/g/11v15h7zp7"

# Seed mirrors the live Google panel when Places API key is not configured yet.
# Replaced automatically once GOOGLE_MAPS_API_KEY (+ optional GOOGLE_PLACE_ID) works.
SEED_REVIEWS: list[dict[str, Any]] = [
    {
        "author": "Avijit Podder",
        "meta": "Local Guide · 2 reviews",
        "rating": 5,
        "date": "9 months ago",
        "text": (
            "One of the best enterprises in Bangalore. Transparent process, "
            "friendly staff, and reliable service."
        ),
        "likes": 1,
        "initial": "A",
        "color": "#1A73E8",
    },
    {
        "author": "sreehari.P",
        "meta": "2 reviews",
        "rating": 5,
        "date": "a year ago",
        "text": (
            "Team Experts Bangalore ENTERPRISES provided excellent service. "
            "They were professional, quick, and solved my issue perfectly. Highly recommended!"
        ),
        "likes": 0,
        "initial": "S",
        "color": "#00897B",
    },
    {
        "author": "Souvik Roy",
        "meta": "8 reviews",
        "rating": 5,
        "date": "a year ago",
        "text": (
            "The team is very well-trained and highly professional. They understand "
            "customer needs thoroughly and offer the best possible solutions which are "
            "both effective and efficient."
        ),
        "likes": 0,
        "initial": "S",
        "color": "#5C6BC0",
    },
    {
        "author": "John S",
        "meta": "1 review",
        "rating": 5,
        "date": "a year ago",
        "text": (
            "One of the best enterprises in Bangalore. Their hard work, commitment, "
            "and innovative approach make them stand out."
        ),
        "likes": 0,
        "initial": "J",
        "color": "#8E24AA",
    },
    {
        "author": "Sasti Sreenivasan",
        "meta": "2 reviews",
        "rating": 5,
        "date": "a year ago",
        "text": (
            "I have issue of cockroach small all my kitchen acquired like a warrior, "
            "night time my food and all other items covered with them, i take treatment "
            "from so many pest control agencies, but this for 2 or 3 days, finally I get "
            "teb number from my contact and their service worked for me."
        ),
        "likes": 0,
        "initial": "S",
        "color": "#F9A825",
    },
    {
        "author": "Avijit Podder",
        "meta": "1 review",
        "rating": 5,
        "date": "9 months ago",
        "text": (
            "Outstanding support and expertise. They truly care about customer "
            "satisfaction and provide the best solutions."
        ),
        "likes": 1,
        "initial": "A",
        "color": "#E91E63",
    },
    {
        "author": "Trishan Chakraborty",
        "meta": "1 review",
        "rating": 5,
        "date": "a year ago",
        "text": (
            "Great experience! The team was quick, efficient, and maintained top-quality "
            "standards. Highly recommended for everyone in Bangalore."
        ),
        "likes": 0,
        "initial": "T",
        "color": "#039BE5",
    },
    {
        "author": "Ranjitha H R",
        "meta": "1 review",
        "rating": 5,
        "date": "9 months ago",
        "text": (
            "Quality work and honest service. I'm fully satisfied with their "
            "professionalism and dedication."
        ),
        "likes": 0,
        "initial": "R",
        "color": "#7B1FA2",
    },
]

SEED_PROFILE: dict[str, Any] = {
    "source": "seed",
    "live": False,
    "name": "Team Experts Bangalore ENTERPRISES",
    "category": "Pest control service",
    "description": (
        "Experienced pest control service providing effective, professional "
        "solutions for homes and businesses."
    ),
    "address": "Varthur, Devasthanagalu, Bengaluru, Karnataka 560087",
    "address_short": "Varthur, Devasthanagalu, Bengaluru 560087",
    "phone": "079966 88885",
    "phone_href": "tel:+917996688885",
    "hours_text": "Open 24 hours",
    "open_now": True,
    "areas_served": "Bengaluru and nearby areas",
    "rating": 4.8,
    "review_count": 232,
    "lat": 12.9398,
    "lng": 77.7412,
    "map_embed_url": (
        "https://www.google.com/maps?q=Team+Experts+Bangalore+ENTERPRISES,"
        "+Varthur,+Devasthanagalu,+Bengaluru&ll=12.9398,77.7412&z=16&output=embed"
    ),
    "map_directions_url": (
        "https://www.google.com/maps/dir/?api=1&destination="
        "Varthur,+Devasthanagalu,+Bengaluru,+Karnataka+560087"
    ),
    "profile_url": GMB_SHARE_URL,
    "maps_url": GMB_SHARE_URL,
    "website": "https://tebpestcontrol.in",
    "website_label": "tebpestcontrol.in",
    "photo_url": "/gmb-office.png",
    "reviews": SEED_REVIEWS,
}

_cache: dict[str, Any] = {"at": 0.0, "data": None}
_CACHE_TTL = 60 * 60 * 6  # 6 hours


def _http_json(url: str) -> dict[str, Any]:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "TEB-Enterprises-GMB/1.0"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read().decode("utf-8", "ignore")
    import json

    return json.loads(raw)


def _format_hours(opening_hours: dict[str, Any] | None) -> tuple[str, bool | None]:
    if not opening_hours:
        return "See hours on Google", None
    open_now = opening_hours.get("open_now")
    weekday = opening_hours.get("weekday_text") or []
    # 24h profiles often expose periods covering full day
    periods = opening_hours.get("periods") or []
    if periods and all(
        isinstance(p, dict)
        and p.get("open", {}).get("time") == "0000"
        and not p.get("close")
        for p in periods
    ):
        return "Open 24 hours", True if open_now is None else bool(open_now)
    if weekday:
        # Collapse identical Mon–Sun lines
        times = {line.split(": ", 1)[-1] for line in weekday if ": " in line}
        if len(times) == 1:
            t = next(iter(times))
            if t.lower() in ("open 24 hours", "24 hours"):
                return "Open 24 hours", True if open_now is None else bool(open_now)
            return f"Mon–Sun, {t}", bool(open_now) if open_now is not None else None
        return "; ".join(weekday[:3]) + ("…" if len(weekday) > 3 else ""), (
            bool(open_now) if open_now is not None else None
        )
    if open_now is True:
        return "Open now", True
    if open_now is False:
        return "Closed now", False
    return "See hours on Google", None


def _normalize_place(place: dict[str, Any], place_id: str) -> dict[str, Any]:
    geo = (place.get("geometry") or {}).get("location") or {}
    lat = geo.get("lat")
    lng = geo.get("lng")
    phone = place.get("formatted_phone_number") or place.get("international_phone_number") or ""
    digits = "".join(ch for ch in phone if ch.isdigit())
    if digits.startswith("91") and len(digits) >= 12:
        phone_href = f"tel:+{digits}"
    elif digits:
        phone_href = f"tel:+91{digits[-10:]}"
    else:
        phone_href = "tel:+917996688885"

    hours_text, open_now = _format_hours(place.get("opening_hours"))
    address = place.get("formatted_address") or place.get("vicinity") or ""
    reviews_raw = place.get("reviews") or []
    reviews = []
    for r in reviews_raw:
        text = (r.get("text") or "").strip()
        if not text:
            continue
        reviews.append(
            {
                "author": r.get("author_name") or "Google Customer",
                "rating": int(r.get("rating") or 5),
                "date": r.get("relative_time_description") or "",
                "text": text,
                "profile_photo_url": r.get("profile_photo_url"),
            }
        )

    photos = place.get("photos") or []
    photo_url = None
    if photos:
        ref = photos[0].get("photo_reference")
        if ref:
            photo_url = f"/api/gmb/photo?ref={urllib.parse.quote(ref)}&maxwidth=1000"

    types = place.get("types") or []
    category = "Pest control service"
    for t in types:
        if "pest" in t:
            category = t.replace("_", " ").title()
            break

    editorial = place.get("editorial_summary") or {}
    description = editorial.get("overview") or SEED_PROFILE["description"]

    q = urllib.parse.quote(place.get("name") or "Team Experts Bangalore ENTERPRISES")
    if lat is not None and lng is not None:
        map_embed = (
            f"https://www.google.com/maps?q={q}&ll={lat},{lng}&z=16&output=embed"
        )
        directions = f"https://www.google.com/maps/dir/?api=1&destination={lat},{lng}"
    else:
        map_embed = (
            f"https://www.google.com/maps?q={q}+Varthur+Bengaluru&output=embed"
        )
        directions = (
            "https://www.google.com/maps/dir/?api=1&destination="
            + urllib.parse.quote(address or "Varthur, Bengaluru")
        )

    return {
        "source": "places_api",
        "live": True,
        "place_id": place_id,
        "name": place.get("name") or SEED_PROFILE["name"],
        "category": category,
        "description": description,
        "address": address,
        "address_short": address.split(",")[0].strip() if address else SEED_PROFILE["address_short"],
        "phone": phone or SEED_PROFILE["phone"],
        "phone_href": phone_href,
        "hours_text": hours_text,
        "open_now": open_now,
        "areas_served": SEED_PROFILE["areas_served"],
        "rating": float(place.get("rating") or SEED_PROFILE["rating"]),
        "review_count": int(place.get("user_ratings_total") or SEED_PROFILE["review_count"]),
        "lat": lat,
        "lng": lng,
        "map_embed_url": map_embed,
        "map_directions_url": directions,
        "profile_url": GMB_SHARE_URL,
        "maps_url": place.get("url") or GMB_SHARE_URL,
        "website": place.get("website") or SEED_PROFILE["website"],
        "website_label": SEED_PROFILE.get("website_label") or "tebpestcontrol.in",
        "photo_url": photo_url or SEED_PROFILE.get("photo_url"),
        "reviews": reviews or list(SEED_REVIEWS),
    }


def _find_place_id(api_key: str) -> str | None:
    if settings.google_place_id:
        return settings.google_place_id
    query = settings.google_place_query
    params = urllib.parse.urlencode(
        {
            "input": query,
            "inputtype": "textquery",
            "fields": "place_id,name,formatted_address",
            "key": api_key,
        }
    )
    url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?{params}"
    data = _http_json(url)
    if data.get("status") not in ("OK", "ZERO_RESULTS"):
        return None
    cands = data.get("candidates") or []
    if not cands:
        return None
    return cands[0].get("place_id")


def _fetch_place_details(api_key: str, place_id: str) -> dict[str, Any]:
    fields = ",".join(
        [
            "place_id",
            "name",
            "formatted_address",
            "formatted_phone_number",
            "international_phone_number",
            "geometry",
            "rating",
            "user_ratings_total",
            "reviews",
            "opening_hours",
            "editorial_summary",
            "photos",
            "types",
            "url",
            "website",
            "vicinity",
        ]
    )
    params = urllib.parse.urlencode(
        {"place_id": place_id, "fields": fields, "key": api_key}
    )
    url = f"https://maps.googleapis.com/maps/api/place/details/json?{params}"
    data = _http_json(url)
    if data.get("status") != "OK":
        raise RuntimeError(data.get("error_message") or data.get("status") or "Places error")
    return _normalize_place(data.get("result") or {}, place_id)


def get_gmb_profile(*, force: bool = False) -> dict[str, Any]:
    now = time.time()
    if (
        not force
        and _cache["data"] is not None
        and now - float(_cache["at"]) < _CACHE_TTL
    ):
        return _cache["data"]

    api_key = (settings.google_maps_api_key or "").strip()
    profile = dict(SEED_PROFILE)

    if api_key:
        try:
            place_id = _find_place_id(api_key)
            if place_id:
                profile = _fetch_place_details(api_key, place_id)
        except Exception as exc:  # noqa: BLE001 — fall back to seed
            profile = dict(SEED_PROFILE)
            profile["error"] = str(exc)

    _cache["at"] = now
    _cache["data"] = profile
    return profile


@router.get("/profile")
def gmb_profile(refresh: bool = Query(False)):
    """Public live (or seeded) Google Business Profile payload for the website."""
    return get_gmb_profile(force=refresh)


@router.get("/photo")
def gmb_photo(ref: str = Query(...), maxwidth: int = Query(800, ge=100, le=1600)):
    """Proxy a Places photo so the API key stays server-side."""
    api_key = (settings.google_maps_api_key or "").strip()
    if not api_key:
        raise HTTPException(status_code=404, detail="Photo proxy requires GOOGLE_MAPS_API_KEY")
    params = urllib.parse.urlencode(
        {"maxwidth": maxwidth, "photo_reference": ref, "key": api_key}
    )
    url = f"https://maps.googleapis.com/maps/api/place/photo?{params}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "TEB-Enterprises-GMB/1.0"})
        with urllib.request.urlopen(req, timeout=25) as resp:
            content = resp.read()
            ctype = resp.headers.get("Content-Type") or "image/jpeg"
    except urllib.error.HTTPError as exc:
        raise HTTPException(status_code=exc.code, detail="Photo fetch failed") from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    return Response(content=content, media_type=ctype, headers={"Cache-Control": "public, max-age=86400"})
