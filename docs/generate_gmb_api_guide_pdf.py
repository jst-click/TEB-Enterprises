"""Generate client PDF: how to get Google Places API key for live GMB details."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parent / "TEB-Google-Business-Profile-API-Key-Guide.pdf"


class GuidePDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(90, 90, 90)
        self.cell(0, 8, "TEB Enterprises - Google Business Profile API Key Guide", align="L")
        self.ln(10)

    def footer(self):
        self.set_y(-14)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 8, f"Page {self.page_no()}/{{nb}}", align="C")


def _reset_x(pdf: GuidePDF):
    pdf.set_x(pdf.l_margin)


def h2(pdf: GuidePDF, text: str):
    pdf.ln(2)
    _reset_x(pdf)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(255, 106, 0)
    pdf.multi_cell(0, 7, text)
    _reset_x(pdf)
    pdf.ln(1)


def body(pdf: GuidePDF, text: str):
    _reset_x(pdf)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(0, 6, text)
    _reset_x(pdf)
    pdf.ln(1)


def bullet(pdf: GuidePDF, text: str):
    _reset_x(pdf)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(0, 6, f"  - {text}")
    _reset_x(pdf)


def note_box(pdf: GuidePDF, text: str):
    pdf.ln(1)
    _reset_x(pdf)
    pdf.set_fill_color(243, 245, 242)
    pdf.set_draw_color(255, 106, 0)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 6, text, border=1, fill=True)
    _reset_x(pdf)
    pdf.ln(2)


def main():
    pdf = GuidePDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()
    pdf.set_margins(18, 16, 18)

    pdf.set_fill_color(10, 22, 38)
    pdf.rect(0, 0, 210, 42, "F")
    pdf.set_y(12)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 10, "Google Business Profile - API Key Guide", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(255, 200, 160)
    pdf.cell(
        0,
        7,
        "For live address, rating, photos and reviews on tebpestcontrol.com",
        align="C",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.set_y(50)

    h2(pdf, "Why this is needed")
    body(
        pdf,
        "To show your real Google Business Profile details on the website (business name, "
        "address, phone, hours, rating, photos, and customer reviews) and keep them updated "
        "automatically, we need a Google Cloud Places API key from your account.",
    )
    body(
        pdf,
        "Without this key, Google does not allow websites to pull live profile details and "
        "reviews automatically.",
    )

    note_box(
        pdf,
        "Your Google Business listing:\n"
        "https://share.google/eW8mqyNEjn8Ke8QPs\n\n"
        "Business: Team Experts Bangalore ENTERPRISES\n"
        "Location: Varthur, Devasthanagalu, Bengaluru",
    )

    h2(pdf, "What to send us when finished")
    bullet(pdf, "API key (from Google Cloud Credentials)")
    bullet(pdf, "Place ID (optional but recommended - starts with ChIJ...)")
    bullet(pdf, "Confirmation that the Business Profile link above is correct")
    body(pdf, "Please send the API key privately (email / secure chat). Do not post it publicly.")

    h2(pdf, "Step 1 - Open Google Cloud")
    bullet(pdf, "Go to: https://console.cloud.google.com/")
    bullet(
        pdf,
        "Sign in with the Google account that manages your Business Profile "
        "(or a company Google account).",
    )

    h2(pdf, "Step 2 - Create or select a project")
    bullet(pdf, "At the top, open the project dropdown.")
    bullet(pdf, "Click New Project.")
    bullet(pdf, "Name it: TEB Website (or TEB Pest Control).")
    bullet(pdf, "Click Create, then select that project.")

    h2(pdf, "Step 3 - Enable billing (required by Google)")
    bullet(pdf, "Left menu: Billing.")
    bullet(pdf, "Link a billing account (credit/debit card).")
    bullet(
        pdf,
        "Google provides monthly free credit. Normal use for one business profile is usually "
        "low cost, but billing must be ON for the API to work.",
    )

    h2(pdf, "Step 4 - Enable Places API")
    bullet(pdf, "Go to: APIs & Services -> Library.")
    bullet(pdf, "Search for Places API.")
    bullet(pdf, "Open Places API and click Enable.")
    bullet(pdf, "If available, also enable Places API (New).")
    bullet(pdf, "Optional: enable Maps Embed API for the map section.")

    h2(pdf, "Step 5 - Create the API key")
    bullet(pdf, "Go to: APIs & Services -> Credentials.")
    bullet(pdf, "Click + Create Credentials -> API key.")
    bullet(pdf, "Copy the key shown on screen.")

    h2(pdf, "Step 6 - Restrict the key (important for security)")
    bullet(pdf, "Open / edit the API key you created.")
    bullet(
        pdf,
        "Application restrictions: prefer IP addresses (server IP), or HTTP referrers if needed.",
    )
    bullet(pdf, "API restrictions: choose Restrict key.")
    bullet(
        pdf,
        "Allow only: Places API, Places API (New) if enabled, and Maps Embed API (optional).",
    )
    bullet(pdf, "Click Save.")

    h2(pdf, "Step 7 - Find your Place ID (recommended)")
    bullet(pdf, "Search Google for: Place ID finder")
    bullet(
        pdf,
        "Or open: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder",
    )
    bullet(pdf, "Search: Team Experts Bangalore ENTERPRISES (Varthur).")
    bullet(pdf, "Copy the Place ID (usually starts with ChIJ...).")

    h2(pdf, "Step 8 - Send details to the website team")
    body(pdf, "Share securely:")
    bullet(pdf, "API key")
    bullet(pdf, "Place ID (if found)")
    bullet(pdf, "Confirm GMB link: https://share.google/eW8mqyNEjn8Ke8QPs")

    h2(pdf, "What we will enable on the website after receiving the key")
    bullet(pdf, "Live business name")
    bullet(pdf, "Live address")
    bullet(pdf, "Live phone")
    bullet(pdf, "Live hours")
    bullet(pdf, "Live rating and review count")
    bullet(pdf, "Customer reviews from Google")
    bullet(pdf, "Profile photo / map from Google")

    h2(pdf, "Important notes")
    bullet(pdf, "Do not share the API key on Facebook, WhatsApp status, GitHub, or public pages.")
    bullet(pdf, "You can revoke or regenerate the key anytime in Google Cloud -> Credentials.")
    bullet(
        pdf,
        "If the Business Profile address or phone changes on Google, the website can refresh "
        "automatically once the key is connected.",
    )

    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(10, 22, 38)
    pdf.multi_cell(0, 6, "Thank you - TEB Enterprises website team")

    pdf.output(str(OUT))
    print(OUT)


if __name__ == "__main__":
    main()
