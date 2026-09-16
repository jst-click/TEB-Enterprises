from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Admin(Base):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str] = mapped_column(String(500))
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Blog(Base):
    __tablename__ = "blogs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str] = mapped_column(String(280), unique=True, index=True)
    excerpt: Mapped[str | None] = mapped_column(Text, nullable=True)
    content: Mapped[str] = mapped_column(Text)
    cover_image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    whatsapp_number: Mapped[str] = mapped_column(String(32), default="917996688885")
    contact_email: Mapped[str] = mapped_column(String(255), default="sales@teamcleaningexperts.in")
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class ContactEnquiry(Base):
    __tablename__ = "contact_enquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    mobile: Mapped[str] = mapped_column(String(40))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    location: Mapped[str | None] = mapped_column(String(255), nullable=True)
    property_type: Mapped[str | None] = mapped_column(String(120), nullable=True)
    approx_size: Mapped[str | None] = mapped_column(String(120), nullable=True)
    pest_problem: Mapped[str | None] = mapped_column(String(120), nullable=True)
    preferred_date: Mapped[str | None] = mapped_column(String(40), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    channel: Mapped[str] = mapped_column(String(40), default="whatsapp")
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str] = mapped_column(String(280), unique=True, index=True)
    category: Mapped[str] = mapped_column(String(40), default="pest")
    # package_b2c | package_b2b | pest | residential | commercial | amc | location
    code: Mapped[str | None] = mapped_column(String(40), nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    content: Mapped[str | None] = mapped_column(Text, nullable=True)
    highlights: Mapped[str | None] = mapped_column(Text, nullable=True)  # one item per line
    keywords: Mapped[str | None] = mapped_column(Text, nullable=True)
    meta_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    meta_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    audience: Mapped[str] = mapped_column(String(20), default="both")  # b2c | b2b | both | none
    show_in_grid: Mapped[bool] = mapped_column(Boolean, default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    cover_image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    # Detail page sections (admin-managed)
    scope_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    about_eyebrow: Mapped[str | None] = mapped_column(String(120), nullable=True)
    about_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    about_image: Mapped[str | None] = mapped_column(String(500), nullable=True)
    why_eyebrow: Mapped[str | None] = mapped_column(String(120), nullable=True)
    why_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    why_items: Mapped[str | None] = mapped_column(Text, nullable=True)  # Title|Description per line
    process_eyebrow: Mapped[str | None] = mapped_column(String(120), nullable=True)
    process_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    process_items: Mapped[str | None] = mapped_column(Text, nullable=True)  # Title|Description per line
    gallery_images: Mapped[str | None] = mapped_column(Text, nullable=True)  # one URL per line
    related_eyebrow: Mapped[str | None] = mapped_column(String(120), nullable=True)
    related_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    faq_eyebrow: Mapped[str | None] = mapped_column(String(120), nullable=True)
    faq_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    faq_items: Mapped[str | None] = mapped_column(Text, nullable=True)  # Question|Answer per line
    cta_title: Mapped[str | None] = mapped_column(String(255), nullable=True)
    cta_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
