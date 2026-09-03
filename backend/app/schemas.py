from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


class GalleryBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    image_url: str = Field(..., min_length=1)
    is_published: bool = True
    sort_order: int = 0


class GalleryCreate(GalleryBase):
    pass


class GalleryUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_url: str | None = None
    is_published: bool | None = None
    sort_order: int | None = None


class GalleryOut(GalleryBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class BlogBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    slug: str | None = None
    excerpt: str | None = None
    content: str = Field(..., min_length=1)
    cover_image: str | None = None
    is_published: bool = True


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    excerpt: str | None = None
    content: str | None = None
    cover_image: str | None = None
    is_published: bool | None = None


class BlogOut(BlogBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class NavFlags(BaseModel):
    show_gallery: bool
    show_blogs: bool
    gallery_count: int
    blogs_count: int


class SettingsOut(BaseModel):
    id: int
    whatsapp_number: str
    contact_email: str
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class SettingsUpdate(BaseModel):
    whatsapp_number: str = Field(..., min_length=8, max_length=32)
    contact_email: EmailStr


class SettingsPublic(BaseModel):
    whatsapp_number: str
    contact_email: EmailStr


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    mobile: str = Field(..., min_length=7, max_length=40)
    email: str | None = None
    location: str | None = None
    property_type: str | None = None
    approx_size: str | None = None
    pest_problem: str | None = None
    preferred_date: str | None = None
    notes: str | None = None
    channel: str = Field(default="whatsapp", pattern="^(whatsapp|email)$")


class ContactOut(BaseModel):
    id: int
    name: str
    mobile: str
    email: str | None = None
    location: str | None = None
    property_type: str | None = None
    approx_size: str | None = None
    pest_problem: str | None = None
    preferred_date: str | None = None
    notes: str | None = None
    channel: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactReadUpdate(BaseModel):
    is_read: bool
