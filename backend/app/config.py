from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    database_url: str = "postgresql://teb:tebpass@localhost:5432/teb_enterprises"
    secret_key: str = "teb-enterprises-change-me-in-production-2026"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24
    admin_email: str = "admin@tebpestcontrol.com"
    admin_password: str = "TEB@2026"
    cors_origins: str = "http://localhost:5173,http://localhost:5174"
    upload_dir: str = "uploads"
    # Google Places API — enables live GMB profile (address, rating, reviews, photos)
    google_maps_api_key: str = ""
    google_place_id: str = ""
    google_place_query: str = (
        "Team Experts Bangalore ENTERPRISES, Varthur, Devasthanagalu, Bengaluru"
    )

    model_config = SettingsConfigDict(
        env_file=str(ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def upload_path(self) -> Path:
        path = Path(self.upload_dir)
        if not path.is_absolute():
            path = ROOT / path
        path.mkdir(parents=True, exist_ok=True)
        return path


settings = Settings()
