#!/usr/bin/env python3
"""Extraire les couleurs dominantes des captures du portfolio.

Usage : python scripts/extract-palette.py
Dépendance : python -m pip install Pillow
Aucune modification des fichiers d'origine.
"""
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit("Installer Pillow : python -m pip install Pillow") from exc

ROOT = Path(__file__).resolve().parents[1] / "public" / "projects"
FILES = {
    "THE WORLD DEFENCE": "towerdefence-hub.webp",
    "AniVault": "anivault-home.webp",
    "Le Temple": "le-temple-home.webp",
    "Eco'Repare": "eco-repare-home.webp",
}

for title, filename in FILES.items():
    path = ROOT / filename
    if not path.is_file():
        print(f"{title}: fichier absent : {path}")
        continue
    with Image.open(path) as image:
        thumb = image.convert("RGB")
        thumb.thumbnail((240, 240))
        # Quantification stable pour supprimer les variations pixel par pixel.
        pixels = ((r // 16 * 16, g // 16 * 16, b // 16 * 16) for r, g, b in thumb.getdata())
        colors = Counter(pixels)
        dominant = colors.most_common(8)
        total = sum(colors.values())
        print(f"\n{title} — {filename}")
        for (r, g, b), count in dominant:
            print(f"  #{r:02x}{g:02x}{b:02x}  {count / total * 100:5.1f}%")
