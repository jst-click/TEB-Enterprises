from pathlib import Path

# Run from backend/:  uvicorn app.main:app --reload --port 8000
# Ensure DATABASE_URL in .env points to a reachable PostgreSQL database.

ROOT = Path(__file__).resolve().parent
print("Backend root:", ROOT)
print("Set DATABASE_URL in .env then: python -m uvicorn app.main:app --reload --app-dir . --port 8000")
